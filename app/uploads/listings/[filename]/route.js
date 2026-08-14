import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getR2Config, getUploadDir, isR2Enabled } from "@/lib/storage";

const MIME_TYPES = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  avif: "image/avif",
  ico: "image/x-icon",
};

export async function GET(request, { params }) {
  const { filename } = params || {};
  if (!filename) {
    return NextResponse.json({ message: "Filename required" }, { status: 400 });
  }

  if (isR2Enabled()) {
    const { publicUrl } = getR2Config();
    if (publicUrl) {
      const objectKey = `listings/${path.basename(filename)}`;
      return NextResponse.redirect(`${publicUrl.replace(/\/+$/, "")}/${encodeURIComponent(objectKey)}`);
    }
  }

  const safeFilename = path.basename(filename);
  const uploadDir = await getUploadDir();
  const filePath = path.join(uploadDir, safeFilename);

  try {
    const file = await fs.readFile(filePath);
    const extension = path.extname(safeFilename).substring(1).toLowerCase();
    const contentType = MIME_TYPES[extension] || "application/octet-stream";
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Upload file not found", error);
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }
}
