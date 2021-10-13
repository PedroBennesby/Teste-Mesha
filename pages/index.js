import Head from "next/head";
import FamousPlaces from "../components/FamousPlaces";
import SearchBox from "../components/SearchBox";

export default function Home() {
  return (
    <>
      <Head>
        <title>Entre no clima</title>
      </Head>

      <div className="home">
        <div className="container">
          <SearchBox placeholder="Procure por uma cidade..." />
          <FamousPlaces />
        </div>
      </div>
    </>
  );
}
