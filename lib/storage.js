import fs from "fs/promises";
import path from "path";

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

export async function getStorageRoot() {
  const envPath = resolveStoragePath(getEnvStoragePath());
  if (envPath && (await pathExists(envPath))) {
    return envPath;
  }

  const configPath = resolveStoragePath(await readConfigFile(STORAGE_CONFIG_FILE));
  if (configPath && (await pathExists(configPath))) {
    return configPath;
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

export const UPLOAD_URL_PREFIX = "/api/uploads";
export const UPLOAD_URL_BASE = `${UPLOAD_URL_PREFIX}/listings`;

export const getUploadPublicUrl = (filename) =>
  `${UPLOAD_URL_BASE}/${encodeURIComponent(filename)}`;
