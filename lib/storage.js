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

export async function getStorageRoot() {
  const envPath = getEnvStoragePath();
  if (envPath) {
    return envPath;
  }

  const configPath = await readConfigFile(STORAGE_CONFIG_FILE);
  if (configPath) {
    return configPath;
  }

  return path.join(process.cwd(), "storage");
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
