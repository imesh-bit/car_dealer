import Home_1 from "../home-1/page";

export const metadata = {
  title: "RAICO GROUP - Species",
  description: "RAICO GROUP - Species.",
};

const HomeSpecies = async () => {
  return <Home_1 searchParams={{ category: "species" }} />;
};

export default HomeSpecies;
