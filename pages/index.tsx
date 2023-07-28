import Head from "next/head";
import Image from "next/image";
import sayHello from "../src/utils/console";

import MetaTags from "../src/components/MetaTags";
import Typewriter from "typewriter-effect";
import Footer from "../src/components/Footer";

sayHello();

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Codesand Tags | Curiosidad intensa por la programación</title>
        <link rel="icon" href="/favicon.ico" />
        <MetaTags />
      </Head>

      <div className="container flex items-center justify-center flex-col gap-8 mt-20 mb-20">
        <div className="w-full flex items-center justify-center flex-col">
          <Image src="/images/logo.png" width={300} height={300} alt={"logo"} />
          <h1 className="text-2xl">Codes and Tags</h1>
          <h3 className="font-roboto mt-4">
            Curiosidad intensa por la programación
          </h3>
        </div>
        <Footer />
      </div>
    </div>
  );
}
