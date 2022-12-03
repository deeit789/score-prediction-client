import Head from "next/head";
import SHBET from "../components/shbet";
import NEW88 from "../components/new88";
import BET789 from "../components/789bet";
import Jun88 from "../components/jun88";
import Hi88 from "../components/hi88";

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
      ) : site.name === "789bet" ? (
        <BET789 />
      ) : site.name === "jun88" ? (
        <Jun88 />
      ) : site.name === "hi88" ? (
        <Hi88 />
      ) : (
        ""
      )}
    </div>
  );
}
