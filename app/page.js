import Home_1 from "./(home)/home-1/page";
import HomeAutoPart from "./(home)/home-auto-part/page";
import HomeSpecies from "./(home)/home-species/page";
import Wrapper from "./layout/wrapper";

export const metadata = {
  title: "Home-1 || Voiture - Automotive & Car Dealer NextJS Template",
  description: `Voiture - Automotive & Car Dealer NextJS Template. `,
};

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
