import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import { getDataFile } from "@/lib/storage";
import { getSupabaseListings, isSupabaseEnabled } from "@/lib/supabase";

const readUploadedListings = async () => {
  if (isSupabaseEnabled()) {
    return getSupabaseListings();
  }

  try {
    const DATA_FILE = await getDataFile();
    const content = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const ListingSingleV1 = async () => {
  const uploadedListings = await readUploadedListings();
  const firstListingId = uploadedListings[0]?.id ?? 1;

  redirect(`/listing-single-v1/${firstListingId}`);
};

export default ListingSingleV1;
