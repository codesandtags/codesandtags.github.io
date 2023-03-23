import Head from "next/head";
import Image from "next/image";
import sayHello from "../src/utils/console";

import MetaTags from "../src/components/MetaTags";
import Infinite from "../src/components/infinite/Infinite";
import Typewriter from "typewriter-effect";
import Footer from "../src/components/Footer";

sayHello();

export default function Home() {
   return (
      <div className="container mx-auto">
         <Head>
            <title>
               Codes and Tags | Curiosidad intensa por la programación
            </title>
            <link rel="icon" href="/favicon.ico" />
            <MetaTags />
         </Head>

         <div className="container flex items-center justify-center flex-col gap-8">
            <div className="w-full flex items-center justify-center h-36 text-2xl">
               <Typewriter
                  options={{
                     strings: [
                        "Mientras la vida pase",
                        "Estaré programando...",
                        "Mientras esté programando",
                        "Seguiré viviendo 👽",
                     ],
                     autoStart: true,
                     loop: false,
                     deleteSpeed: 10,
                  }}
               />
            </div>
            <Infinite />
            <div className="w-full flex items-center justify-center h-36 text-3xl">
               <Image
                  src="/images/logo.png"
                  width={150}
                  height={150}
                  alt={"logo"}
               />
            </div>
         </div>
         <Footer />
      </div>
   );
}
