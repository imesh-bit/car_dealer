import Home_1 from "../home-1/page";

export const metadata = {
  title: "RAIKO GROUP - General",
  description: "RAIKO GROUP - General.",
};

const HomeSpecies = async () => {
  return <Home_1 searchParams={{ category: "species" }} />;
};

export default HomeSpecies;
