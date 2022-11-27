import Head from "next/head";
import SHBET from "../components/shbet";
import NEW88 from "../components/new88";

import { site } from "../helpers/config";

export default function Home() {
  return (
    <div>
      <Head>
        <title>DỰ ĐOÁN TỈ SỐ WORLD CUP 2022</title>
        <meta name="description" content="DỰ ĐOÁN TỈ SỐ WORLD CUP 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {console.log(site)}
      {site.name === "shbet" ? (
        <SHBET />
      ) : site.name === "new88" ? (
        <NEW88 />
      ) : (
        ""
      )}
    </div>
  );
}
