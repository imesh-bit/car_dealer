import dynamic from "next/dynamic";
import Wrapper from "./layout/wrapper";
import { createPageMetadata } from "@/lib/metadata";

const Home_1 = dynamic(() => import("./(home)/home-1/page"), {
  loading: () => <div className="wrapper ovh" aria-hidden="true" />,
});
const HomeAutoPart = dynamic(() => import("./(home)/home-auto-part/page"), {
  loading: () => <div className="wrapper ovh" aria-hidden="true" />,
});
const HomeSpecies = dynamic(() => import("./(home)/home-species/page"), {
  loading: () => <div className="wrapper ovh" aria-hidden="true" />,
});

export const metadata = createPageMetadata({
  title: "Find Your Next Vehicle",
  description:
    "Browse featured cars, compare listings, and find the right vehicle at the best price with RAICO GROUP.",
  path: "/",
});

export default async function MainRoot({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.category;

  const HomePage = {
    "auto-part": HomeAutoPart,
    species: HomeSpecies,
  }[category] || Home_1;

  return (
    <Wrapper>
      <HomePage />
    </Wrapper>
  );
}
