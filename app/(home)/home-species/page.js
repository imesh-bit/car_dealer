import Home_1 from "../home-1/page";

export const metadata = {
  title: "RAICO GROUP - General",
  description: "RAICO GROUP - General.",
};

const HomeSpecies = async () => {
  return <Home_1 searchParams={{ category: "species" }} />;
};

export default HomeSpecies;
