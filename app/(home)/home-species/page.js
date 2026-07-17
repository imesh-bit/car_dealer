import Home_1 from "../home-1/page";

export const metadata = {
  title: "RAICO GROUP - General Merchandise",
  description: "RAICO GROUP - General Merchandise.",
};

const HomeSpecies = async () => {
  return <Home_1 searchParams={{ category: "species" }} />;
};

export default HomeSpecies;
