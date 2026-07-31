import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getDataFile, getUploadDir } from "@/lib/storage";

const readStoredListings = async () => {
  const DATA_FILE = await getDataFile();
  try {
    const content = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error?.code === "ENOENT") {
      return [];
    }
    throw error;
  }
};

const writeStoredListings = async (listings) => {
  const DATA_FILE = await getDataFile();
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(listings, null, 2));
};

const deleteListingImages = async (listing) => {
  const uploadDir = await getUploadDir();
  const prefix = "/api/uploads/listings/";

  const urls = new Set();
  if (listing?.image) urls.add(listing.image);
  if (Array.isArray(listing?.gallery)) {
    listing.gallery.forEach((galleryItem) => {
      if (galleryItem?.imageSrc) urls.add(galleryItem.imageSrc);
    });
  }

  await Promise.all(
    Array.from(urls).map(async (url) => {
      if (!url.startsWith(prefix)) return;

      const filename = path.basename(decodeURIComponent(url.slice(prefix.length)));
      const filePath = path.join(uploadDir, filename);

      try {
        await fs.unlink(filePath);
      } catch (error) {
        if (error?.code !== "ENOENT") {
          console.error("Failed to delete listing image", filePath, error);
        }
      }
    })
  );
};

export async function GET(request, { params }) {
  const { id } = await params;
  const listings = await readStoredListings();
  const targetId = Number.isNaN(Number(id)) ? id : Number(id);
  const listing = listings.find((item) => item.id === targetId);

  if (!listing) {
    return NextResponse.json({ message: "Listing not found" }, { status: 404 });
  }

  return NextResponse.json(listing);
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Listing id required" }, { status: 400 });
  }

  try {
    const listings = await readStoredListings();
    const targetId = Number.isNaN(Number(id)) ? id : Number(id);
    const index = listings.findIndex((listing) => listing.id === targetId);

    if (index === -1) {
      return NextResponse.json({ message: "Listing not found" }, { status: 404 });
    }

    const [removed] = listings.splice(index, 1);
    await writeStoredListings(listings);
    await deleteListingImages(removed);

    return NextResponse.json({ message: "Listing deleted", id: targetId }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete listing", error);
    return NextResponse.json({ message: "Failed to delete listing" }, { status: 500 });
  }
}
