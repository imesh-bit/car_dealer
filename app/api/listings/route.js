import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getDataFile, saveUploadedFile } from "@/lib/storage";
import { insertSupabaseListing, isSupabaseEnabled, normalizeListingRecord, getSupabaseListings } from "@/lib/supabase";

// Short server-side cache so concurrent visitors share one Supabase query
// instead of each request hitting the DB live. New/edited listings still
// show up within this window, and the client force-refreshes immediately
// after a save (see "voiture:listings-updated" in useMergedListings.js).
export const revalidate = 20;

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

const ensureDir = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const saveImageBuffer = async (file, imageName, index) => {
  return saveUploadedFile(file, imageName, index);
};

export async function GET() {
  if (isSupabaseEnabled()) {
    const listings = await getSupabaseListings();
    return NextResponse.json(listings);
  }

  const listings = await readStoredListings();
  return NextResponse.json(listings);
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let body = {};
    let imageFiles = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      imageFiles = formData.getAll("images").filter((value) => value instanceof File);

      body = {
        category: formData.get("category")?.toString() || "automobile",
        bodyType: formData.get("bodyType")?.toString() || "Cars",
        title: formData.get("title")?.toString() || "New Listing",
        price: Number(formData.get("price")?.toString() || 0),
        mileage: formData.get("mileage")?.toString() || "",
        fuelType: formData.get("fuelType")?.toString() || "Petrol",
        transmission: formData.get("transmission")?.toString() || "Automatic",
        condition: formData.get("condition")?.toString() || "Used",
        auctionGrade: formData.get("auctionGrade")?.toString() || "",
        make: formData.get("make")?.toString() || "",
        model: formData.get("model")?.toString() || "",
        year: Number(formData.get("year")?.toString() || 0),
        color: formData.get("color")?.toString() || "",
        driveType: formData.get("driveType")?.toString() || "",
        interiorColor: formData.get("interiorColor")?.toString() || "",
        engineSize: formData.get("engineSize")?.toString() || "",
        doors: formData.get("doors")?.toString() || "",
        cylinders: formData.get("cylinders")?.toString() || "",
        vin: formData.get("vin")?.toString() || "",
        location: formData.get("location")?.toString() || "",
        latitude: formData.get("latitude")?.toString() || "",
        longitude: formData.get("longitude")?.toString() || "",
        description: formData.get("description")?.toString() || "",
        videoLink: formData.get("videoLink")?.toString() || "",
        imageUrl: formData.get("imageUrl")?.toString() || "",
        partCategory: formData.get("partCategory")?.toString() || "",
        brand: formData.get("brand")?.toString() || "",
        productCategory: formData.get("productCategory")?.toString() || "",
        packagingType: formData.get("packagingType")?.toString() || "",
        orderScale: formData.get("orderScale")?.toString() || "",
        minimumOrderQuantity: formData.get("minimumOrderQuantity")?.toString() || "",
        featured: formData.get("featured")?.toString() || "0",
      };
    } else {
      const rawBody = await request.text();
      if (rawBody) {
        try {
          body = JSON.parse(rawBody);
        } catch (error) {
          console.error("Invalid listing JSON payload", rawBody);
          body = {};
        }
      }
      imageFiles = Array.isArray(body.images) ? body.images : [];
    }

    const savedImages = [];
    if (body.imageUrl) {
      savedImages.push(body.imageUrl);
    }

    for (const [index, image] of imageFiles.entries()) {
      const imageUrl = await saveImageBuffer(image, image?.name || "listing", index);
      if (imageUrl) {
        savedImages.push(imageUrl);
      }
    }

    const listing = {
      id: Date.now(),
      featured: body.featured === true || body.featured === "1" || body.featured === "true",
      category: body.category || "automobile",
      image: savedImages[0] || body.image || "/images/listing/1.jpg",
      gallery: savedImages.map((imageUrl) => ({ imageSrc: imageUrl, videoId: null })),
      photosCount: savedImages.length || 0,
      videosCount: body.videoLink ? 1 : 0,
      title: body.title || "New Listing",
      price: Number(body.price) || 0,
      originalPrice: Number(body.price) || 0,
      rating: 0,
      reviewsCount: 0,
      mileage: body.mileage || "",
      fuelType: body.fuelType || "Petrol",
      transmission: body.transmission || "Automatic",
      tags: [body.category || "automobile", (body.condition || "Used").toLowerCase() === "new" ? "new" : "used"],
      make: body.make || "",
      model: body.model || "",
      year: Number(body.year) || 0,
      color: body.color || "",
      drivetrain: body.driveType || "",
      condition: body.condition || "Used",
      engineSize: body.engineSize || "",
      doors: Number(String(body.doors || "").replace(/[^0-9]/g, "")) || 0,
      cylinders: Number(body.cylinders) || 0,
      vin: body.vin || "",
      bodyType: body.bodyType || "Cars",
      interiorColor: body.interiorColor || "",
      tagline: body.title || "New Listing",
      postedAgo: "Just now",
      views: 0,
      description: Array.isArray(body.description) ? body.description : [body.description || ""],
      features: Array.isArray(body.features) ? body.features : [],
      location: body.location || "",
      latitude: body.latitude || "",
      longitude: body.longitude || "",
      videoLink: body.videoLink || "",
      partCategory: body.partCategory || "",
      brand: body.brand || "",
      productCategory: body.productCategory || "",
      packagingType: body.packagingType || "",
      orderScale: body.orderScale || "",
      minimumOrderQuantity: body.minimumOrderQuantity || "",
      auctionGrade: body.auctionGrade || "",
    };

    if (isSupabaseEnabled()) {
      const payload = {
        category: listing.category,
        body_type: listing.bodyType,
        title: listing.title,
        price: listing.price,
        mileage: listing.mileage,
        fuel_type: listing.fuelType,
        transmission: listing.transmission,
        condition: listing.condition,
        auction_grade: listing.auctionGrade,
        make: listing.make,
        model: listing.model,
        year: listing.year,
        color: listing.color,
        drive_type: listing.drivetrain,
        interior_color: listing.interiorColor,
        engine_size: listing.engineSize,
        doors: listing.doors,
        cylinders: listing.cylinders,
        vin: listing.vin,
        location: listing.location,
        latitude: listing.latitude,
        longitude: listing.longitude,
        description: Array.isArray(listing.description) ? listing.description.join("\n\n") : String(listing.description || ""),
        video_link: listing.videoLink,
        image: listing.image,
        gallery: listing.gallery,
        part_category: listing.partCategory,
        brand: listing.brand,
        product_category: listing.productCategory,
        packaging_type: listing.packagingType,
        order_scale: listing.orderScale,
        minimum_order_quantity: listing.minimumOrderQuantity,
        featured: listing.featured,
        tags: listing.tags,
        views: listing.views,
        features: listing.features,
      };

      const { data, error } = await insertSupabaseListing(payload);
      if (error) {
        throw error;
      }

      return NextResponse.json(normalizeListingRecord(data), { status: 201 });
    }

    const listings = await readStoredListings();
    listings.unshift(listing);
    await writeStoredListings(listings);

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error("Failed to save listing", error);
    return NextResponse.json({ message: "Failed to save listing" }, { status: 500 });
  }
}