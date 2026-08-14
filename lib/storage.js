import fs from "fs/promises";
import path from "path";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const STORAGE_CONFIG_FILE = path.join(process.cwd(), "config", "storage.json");

const getEnvStoragePath = () =>
  process.env.UPLOAD_STORAGE_PATH ||
  process.env.UPLOADS_PATH ||
  process.env.STORAGE_PATH;

const readConfigFile = async (configPath) => {
  try {
    const raw = await fs.readFile(configPath, "utf8");
    const config = JSON.parse(raw);
    if (config && typeof config.uploadStoragePath === "string" && config.uploadStoragePath.trim()) {
      return config.uploadStoragePath.trim();
    }
  } catch (error) {
    return null;
  }
  return null;
};

const isLinuxServerAbsolutePath = (storagePath) => {
  if (process.platform !== "win32") {
    return false;
  }

  return /^\/(var|srv|opt|home)\//.test(storagePath.trim());
};

const resolveStoragePath = (storagePath) => {
  if (!storagePath || typeof storagePath !== "string") {
    return null;
  }

  const trimmed = storagePath.trim();
  if (!trimmed) {
    return null;
  }

  if (isLinuxServerAbsolutePath(trimmed)) {
    return null;
  }

  return path.isAbsolute(trimmed) ? trimmed : path.resolve(process.cwd(), trimmed);
};

const pathExists = async (targetPath) => {
  try {
    const stat = await fs.stat(targetPath);
    return stat.isDirectory();
  } catch (error) {
    return false;
  }
};

const getEnvValue = (...names) => names.find((name) => Boolean(process.env[name] && process.env[name].trim()));

export const isServerlessEnvironment = () =>
  Boolean(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.NETLIFY ||
    process.env.CF_PAGES ||
    process.env.NOW_REGION ||
    process.cwd().startsWith("/var/task") ||
    process.cwd().startsWith("/tmp"),
  );

export const getR2Config = () => ({
  endpoint: getEnvValue("R2_ENDPOINT", "CLOUDFLARE_R2_ENDPOINT"),
  accessKeyId: getEnvValue("R2_ACCESS_KEY_ID", "CLOUDFLARE_R2_ACCESS_KEY_ID"),
  secretAccessKey: getEnvValue("R2_SECRET_ACCESS_KEY", "CLOUDFLARE_R2_SECRET_ACCESS_KEY"),
  bucket: getEnvValue("R2_BUCKET", "CLOUDFLARE_R2_BUCKET"),
  publicUrl: getEnvValue("R2_PUBLIC_URL", "CLOUDFLARE_R2_PUBLIC_URL"),
});

export const isR2Enabled = () => {
  const { endpoint, accessKeyId, secretAccessKey, bucket } = getR2Config();
  return Boolean(endpoint && accessKeyId && secretAccessKey && bucket);
};

const getR2Client = () => {
  if (!isR2Enabled()) {
    return null;
  }

  const { endpoint, accessKeyId, secretAccessKey } = getR2Config();
  return new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true,
    signatureVersion: "v4",
  });
};

const normalizeR2ObjectKey = (objectPath) => objectPath.replace(/^\/+/, "");

const getPublicR2Url = (objectKey) => {
  const { publicUrl } = getR2Config();
  if (!publicUrl) {
    return null;
  }
  return `${publicUrl.replace(/\/+$/, "")}/${encodeURIComponent(normalizeR2ObjectKey(objectKey))}`;
};

export async function getStorageRoot() {
  const envPath = resolveStoragePath(getEnvStoragePath());
  if (envPath && (await pathExists(envPath))) {
    return envPath;
  }

  const configPath = resolveStoragePath(await readConfigFile(STORAGE_CONFIG_FILE));
  if (configPath && (await pathExists(configPath))) {
    return configPath;
  }

  if (isServerlessEnvironment()) {
    return "/tmp/voiture-data";
  }

  return path.join(process.cwd(), "data");
}

export async function getDataFile() {
  const storageRoot = await getStorageRoot();
  return path.join(storageRoot, "uploaded-listings.json");
}

export async function getUploadDir() {
  const storageRoot = await getStorageRoot();
  return path.join(storageRoot, "uploads", "listings");
}

export async function saveUploadedFile(file, imageName, index) {
  if (!file || typeof file.arrayBuffer !== "function") {
    return null;
  }

  if (!isR2Enabled()) {
    if (isServerlessEnvironment()) {
      throw new Error(
        "Cloudflare R2 is not configured for this deployment. Set R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, and R2_PUBLIC_URL in the Vercel environment variables.",
      );
    }
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name || "") || ".png";
  const extension = ext.replace(/^\./, "").toLowerCase();
  const rawName = imageName || file.name || "listing";
  let normalizedName = path.basename(rawName, path.extname(rawName));

  if (normalizedName.toLowerCase().endsWith(`.${extension}`)) {
    normalizedName = normalizedName.slice(0, -extension.length - 1);
  }

  const safeBaseName = `${Date.now()}-${index}-${(normalizedName || "listing")
    .replace(/[^a-z0-9.-]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()}`;
  const filename = `${safeBaseName}.${extension}`;
  const objectKey = `listings/${filename}`;

  if (isR2Enabled()) {
    const client = getR2Client();
    const { bucket } = getR2Config();

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: objectKey,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    return getPublicR2Url(objectKey);
  }

  const uploadDir = await getUploadDir();
  const filePath = path.join(uploadDir, filename);
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(filePath, buffer);
  return getUploadPublicUrl(filename);
}

export async function deleteUploadedFile(fileUrl) {
  if (!fileUrl) {
    return;
  }

  if (isR2Enabled()) {
    const { bucket, publicUrl } = getR2Config();
    if (!bucket) {
      return;
    }

    const urlBase = publicUrl ? publicUrl.replace(/\/+$/, "") : null;
    let objectKey = null;

    if (urlBase && fileUrl.startsWith(`${urlBase}/`)) {
      objectKey = decodeURIComponent(fileUrl.slice(urlBase.length + 1));
    } else if (fileUrl.includes("/listings/")) {
      objectKey = decodeURIComponent(fileUrl.split("/listings/").slice(1).join("/listings/"));
    }

    if (objectKey) {
      const client = getR2Client();
      await client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: normalizeR2ObjectKey(objectKey),
        }),
      );
    }
    return;
  }

  const localPrefix = "/api/uploads/listings/";
  if (!fileUrl.startsWith(localPrefix)) {
    return;
  }

  const filename = path.basename(decodeURIComponent(fileUrl.slice(localPrefix.length)));
  const filePath = path.join(await getUploadDir(), filename);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error?.code !== "ENOENT") {
      console.error("Failed to delete local listing image", filePath, error);
    }
  }
}

export const UPLOAD_URL_PREFIX = "/api/uploads";
export const UPLOAD_URL_BASE = `${UPLOAD_URL_PREFIX}/listings`;

export const getUploadPublicUrl = (filename) =>
  `${UPLOAD_URL_BASE}/${encodeURIComponent(filename)}`;
