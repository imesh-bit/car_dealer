import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const createSupabaseClient = (url, key) => {
  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export const isSupabaseEnabled = () => Boolean(supabaseUrl && supabaseServiceRoleKey);

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceRoleKey);

export const normalizeListingRecord = (row = {}) => {
  const gallery = Array.isArray(row.gallery) ? row.gallery : [];
  const description = Array.isArray(row.description)
    ? row.description
    : typeof row.description === "string" && row.description.trim()
      ? [row.description]
      : [];

  const normalizedRow = {
    ...row,
    id: Number(row.id),
    price: Number(row.price || 0),
    year: Number(row.year || 0),
    doors: Number(row.doors || 0),
    cylinders: Number(row.cylinders || 0),
    featured: Boolean(row.featured),
    views: Number(row.views || 0),
    fuelType: row.fuelType || row.fuel_type || "Petrol",
    auctionGrade: row.auctionGrade || row.auction_grade || "",
    transmission: row.transmission || "Automatic",
    condition: row.condition || "Used",
    mileage: row.mileage || "",
    bodyType: row.body_type || row.bodyType || "Cars",
    category: row.category || "automobile",
    gallery: gallery.map((item) =>
      typeof item === "string" ? { imageSrc: item, videoId: null } : item,
    ),
    description,
    features: Array.isArray(row.features) ? row.features : [],
    tags: Array.isArray(row.tags) ? row.tags : [row.category || "automobile"],
    image: row.image || row.imageSrc || gallery[0]?.imageSrc || "/images/listing/1.jpg",
  };

  return normalizedRow;
};

export const getSupabaseListings = async () => {
  if (!isSupabaseEnabled() || !supabaseAdmin) {
    return [];
  }

  const { data, error } = await supabaseAdmin
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase listing fetch failed", error);
    return [];
  }

  return (data || []).map(normalizeListingRecord);
};

export const getSupabaseListingById = async (id) => {
  if (!isSupabaseEnabled() || !supabaseAdmin) {
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("listings")
    .select("*")
    .eq("id", Number(id))
    .maybeSingle();

  if (error) {
    console.error("Supabase listing lookup failed", error);
    return null;
  }

  return data ? normalizeListingRecord(data) : null;
};

export const insertSupabaseListing = async (payload) => {
  if (!isSupabaseEnabled() || !supabaseAdmin) {
    return { data: null, error: new Error("Supabase is not configured") };
  }

  return supabaseAdmin.from("listings").insert([payload]).select().single();
};

export const incrementSupabaseListingViews = async (id) => {
  if (!id || !isSupabaseEnabled() || !supabaseAdmin) {
    return null;
  }

  const parsedId = Number(id);

  const { data: existing, error: fetchError } = await supabaseAdmin
    .from("listings")
    .select("id, views")
    .eq("id", parsedId)
    .maybeSingle();

  if (fetchError) {
    console.error("Failed to fetch listing for view increment", fetchError);
    return null;
  }

  if (!existing) {
    return null;
  }

  const nextViews = Number(existing.views || 0) + 1;

  const { data, error } = await supabaseAdmin
    .from("listings")
    .update({ views: nextViews })
    .eq("id", parsedId)
    .select()
    .single();

  if (error) {
    console.error("Failed to update listing views", error);
    return null;
  }

  return normalizeListingRecord(data);
};
