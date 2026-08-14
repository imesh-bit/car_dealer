import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { deleteUploadedFile, getDataFile, getUploadDir } from "@/lib/storage";
import { getSupabaseListingById, isSupabaseEnabled, supabaseAdmin } from "@/lib/supabase";

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
  const urls = new Set();
  if (listing?.image) urls.add(listing.image);
  if (Array.isArray(listing?.gallery)) {
    listing.gallery.forEach((galleryItem) => {
      if (galleryItem?.imageSrc) urls.add(galleryItem.imageSrc);
    });
  }

  await Promise.all(
    Array.from(urls).map(async (url) => {
      if (!url) return;
      await deleteUploadedFile(url);
    }),
  );
};

export async function GET(request, { params }) {
  const { id } = await params;

  if (isSupabaseEnabled()) {
    const listing = await getSupabaseListingById(id);
    if (!listing) {
      return NextResponse.json({ message: "Listing not found" }, { status: 404 });
    }
    return NextResponse.json(listing);
  }

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
    if (isSupabaseEnabled()) {
      const { data: existing, error: fetchError } = await supabaseAdmin
        .from("listings")
        .select("*")
        .eq("id", Number(id))
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      if (!existing) {
        return NextResponse.json({ message: "Listing not found" }, { status: 404 });
      }

      const { error: deleteError } = await supabaseAdmin.from("listings").delete().eq("id", Number(id));
      if (deleteError) {
        throw deleteError;
      }

      await deleteListingImages(existing);
      return NextResponse.json({ message: "Listing deleted", id: Number(id) }, { status: 200 });
    }

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
