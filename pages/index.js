import Head from "next/head";

import SHBET from "../components/shbet";

export default function Home() {
  return (
    <div>
      <Head>
        <title>DỰ ĐOÁN TỈ SỐ WORLD CUP 2022</title>
        <meta name="description" content="DỰ ĐOÁN TỈ SỐ WORLD CUP 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SHBET />
    </div>
  );
}
