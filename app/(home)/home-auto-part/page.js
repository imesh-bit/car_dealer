import Home_1 from "../home-1/page";

export const metadata = {
  title: "RAIKO GROUP - Auto Parts",
  description: "RAIKO GROUP - Auto Parts.",
};

const HomeAutoPart = async () => {
  return <Home_1 searchParams={{ category: "auto-part" }} />;
};

export default HomeAutoPart;
