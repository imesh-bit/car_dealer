import fs from "fs/promises";
import path from "path";

const STORAGE_CONFIG_FILE = path.join(process.cwd(), "config", "storage.json");

const getEnvStoragePath = () =>
  process.env.UPLOAD_STORAGE_PATH ||
  process.env.UPLOADS_PATH ||
  process.env.STORAGE_PATH;

export async function getStorageRoot() {
  const envPath = getEnvStoragePath();
  if (envPath) {
    return envPath;
  }

  try {
    const raw = await fs.readFile(STORAGE_CONFIG_FILE, "utf8");
    const config = JSON.parse(raw);
    if (config && typeof config.uploadStoragePath === "string" && config.uploadStoragePath.trim()) {
      return config.uploadStoragePath.trim();
    }
  } catch (error) {
    // missing config file is fine, fallback to default storage path
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

export const UPLOAD_URL_PREFIX = "/uploads";
export const UPLOAD_URL_BASE = `${UPLOAD_URL_PREFIX}/listings`;

export const getUploadPublicUrl = (filename) =>
  `${UPLOAD_URL_BASE}/${encodeURIComponent(filename)}`;
