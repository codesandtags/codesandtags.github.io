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
            <title>
               Codes and Tags | Curiosidad intensa por la programación
            </title>
            <link rel="icon" href="/favicon.ico" />
            <MetaTags />
         </Head>

         <div className="container flex items-center justify-center flex-col gap-8 mt-20 mb-20">
            <div className="w-full flex items-center justify-center flex-col">
               <Image
                  src="/images/logo.png"
                  width={150}
                  height={150}
                  alt={"logo"}
               />
               <Typewriter
                  options={{
                     strings: [
                        "Bienvenido a Codes and Tags",
                        "Curiosidad intensa por la programación",
                        " :D ",
                     ],
                     autoStart: true,
                     loop: false,
                     deleteSpeed: 10,
                  }}
               />
            </div>
         </div>
         <Footer />
      </div>
   );
}
