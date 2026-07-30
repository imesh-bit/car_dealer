import path from "path";

const STORAGE_ROOT =
  process.env.UPLOAD_STORAGE_PATH ||
  process.env.UPLOADS_PATH ||
  process.env.STORAGE_PATH ||
  path.join(process.cwd(), "storage");

export const DATA_FILE = path.join(STORAGE_ROOT, "uploaded-listings.json");
export const UPLOAD_DIR = path.join(STORAGE_ROOT, "uploads", "listings");
export const UPLOAD_URL_PREFIX = "/api/uploads";
export const UPLOAD_URL_BASE = `${UPLOAD_URL_PREFIX}/listings`;

export const getUploadPublicUrl = (filename) =>
  `${UPLOAD_URL_BASE}/${encodeURIComponent(filename)}`;

export const getStorageRoot = () => STORAGE_ROOT;
