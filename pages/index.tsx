import Head from "next/head";
import Image from "next/image";
import sayHello from "../src/utils/console";

import MetaTags from "../src/components/MetaTags";
import Footer from "../src/components/Footer";

sayHello();

export default function Home() {
  return (
    <>
      <div className="container-image"></div>
      <div className="container mx-auto h-screen backdrop-blur-sm">
        <Head>
          <title>Codes and Tags | Curiosidad intensa por la programación</title>
          <link rel="icon" href="/favicon.ico" />
          <MetaTags />
        </Head>

        <div className="py-20 flex items-center justify-center flex-col gap-8">
          <div className="w-full flex items-center justify-center flex-col">
            <Image
              src="/images/logo.png"
              width={300}
              height={300}
              alt={"logo"}
            />
            <h1 className="text-3xl text-black">Codes and Tags</h1>
            <h3 className="font-roboto mt-4 text-black">
              Curiosidad intensa por la programación
            </h3>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
