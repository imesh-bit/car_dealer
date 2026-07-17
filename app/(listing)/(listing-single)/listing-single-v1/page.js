import { redirect } from "next/navigation";
import listingsData from "@/data/listingCar";

const ListingSingleV1 = () => {
  const firstListingId = listingsData[0]?.id ?? 1;

  redirect(`/listing-single-v1/${firstListingId}`);
};

export default ListingSingleV1;
