import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const DATA_FILE = path.join(process.cwd(), "data", "uploaded-listings.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "listings");

const ensureDir = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const readStoredListings = async () => {
  try {
    const content = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(content);
  } catch (error) {
    if (error?.code === "ENOENT") {
      return [];
    }
    throw error;
  }
};

const writeStoredListings = async (listings) => {
  await ensureDir(path.dirname(DATA_FILE));
  await fs.writeFile(DATA_FILE, JSON.stringify(listings, null, 2));
};

const saveImageBuffer = async (file, imageName, index) => {
  if (!file || typeof file.arrayBuffer !== "function") {
    return null;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = (file.name.split(".").pop() || "png").toLowerCase();
  const safeName = `${Date.now()}-${index}-${(imageName || "listing").replace(/[^a-z0-9.-]+/gi, "-").toLowerCase()}`;
  const filename = `${safeName}.${extension}`;
  const filePath = path.join(UPLOAD_DIR, filename);

  await ensureDir(UPLOAD_DIR);
  await fs.writeFile(filePath, buffer);
  return `/uploads/listings/${filename}`;
};

export async function GET() {
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
      const imageName = image?.name || "listing";
      const imageUrl = await saveImageBuffer(image, imageName, index);
      if (imageUrl) {
        savedImages.push(imageUrl);
      }
    }

    const listing = {
      id: Date.now(),
      featured: false,
      category: body.category || "automobile",
      image: savedImages[0] || body.image || "/images/listing/1.jpg",
      gallery: savedImages.map((imageUrl) => ({ imageSrc: imageUrl, videoId: null })),
      photosCount: savedImages.length || 0,
      videosCount: body.videoLink ? 1 : 0,
      title: body.title || "New Listing",
      price: Number(body.price) || 0,
      originalPrice: Number(body.price) || 0,
      rating: 0,
      auctionGrade: body.auctionGrade || "",
      reviewsCount: 0,
      mileage: body.mileage || "",
      fuelType: body.fuelType || "Petrol",
      transmission: body.transmission || "Automatic",
      tags: [(body.condition || "Used").toLowerCase() === "new" ? "new" : "used"],
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
      description: [body.description || ""],
      features: Array.isArray(body.features) ? body.features : [],
      location: body.location || "",
      latitude: body.latitude || "",
      longitude: body.longitude || "",
      videoLink: body.videoLink || "",
    };

    const storedListings = await readStoredListings();
    storedListings.unshift(listing);
    await writeStoredListings(storedListings);

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error("Failed to save listing", error);
    return NextResponse.json({ message: "Failed to save listing" }, { status: 500 });
  }
}
