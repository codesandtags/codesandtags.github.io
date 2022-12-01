import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Home.module.css";

export default function Home() {

  const [seeLyrics, setSeeLyrics] = useState(false);

   const onPlaySong = () => {
      const churritaSong = new Audio("/sounds/al-infinito-y-mas-alla.m4a");
      churritaSong.play();

      setSeeLyrics(true);
   };

   return (
      <div className={styles.container}>
         <Head>
            <title>codesandtags | curiosidad intensa por la programación</title>
            <meta
               name="description"
               content="Tutoriales de programación, experimentos de código y curiosidades del mundo del software"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <div className="w-full md:w-1/2 flex flex-col justify-center items-center	content-center mx-auto py-8">
            <h1 className="text-3xl mb-5">👋 Hi Churrita</h1>
            <h2 className="text-xl mb-5">🎂 Today is December 2nd, 2022</h2>

            <Image
               src="/images/al-infinito-y-mas-alla.png"
               width={300}
               height={300}
               alt="Al infinito y mas alla"
            />

            <button
               className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
               onClick={onPlaySong}
            >
               🎁 Open Gift
            </button>

            {seeLyrics ? 
                <div>
                <p className="my-4">
                   BUENO no sé cómo empezar esto Es la primera vez que lo hago Y
                   más que desearte tan solo un FELIZ cumpleaños QUISIERA
                   recordarte en estás sinceras palabras Algunas cuantas cosas
                   que lleguen a tu alma
                </p>
 
                <p className="my-4">
                   HOY sigues acumulando un montón de primaveras, memorables
                   aventuras e infinitas experiencias, FINALMENTE llegó el día
                   que tanto esperabas, Aquel 2 de Diciembre que tanto se
                   alargaba.
                </p>
 
                <p className="my-4">
                   EMPIEZO por darle gracias al cielo que hoy existes , por los
                   años que vienen, y el día en que me conociste, por cada
                   instante, por cada abrazo, por cada beso, y los recuerdos
                   felices, por los retos superados, y por cada enseñanza, por
                   cada paso a tu lado y los mensajes que aún existen, por cada
                   café que nos tomamos en la capital, por las profundas
                   conversaciones llenas de sinceridad, por cada tarde
                   contemplando el atardecer, por aquellos buenos días juntos al
                   amanecer...
                </p>
 
                <p className="my-4">
                   PARA continuar la historia te regalo estás palabras, Y
                   disculpame Churrita si salen algunas lagrimas, lo único que
                   quiero es VERTE VOLAR, que cumplas todos tus sueños y lo digo
                   de verdad, NUNCA TE detengas, tu solo sigue adelante, Que DIOS
                   bendiga tu vida en en cada instante,
                </p>
 
                <p className="my-4">
                   LA VIDA continúa y si algún día miras atrás, ojalá tomes
                   impulso y sólo vuelve a recordar, que cada día que vives
                   cuenta y los segundos suman, que las tristezas te enseñan, y
                   la experiencia ayuda, que cada cosa que aprendas es una
                   oportunidad, que aunque no somos perfectos si podemos
                   perdonar,
                </p>
 
                <p className="my-4">
                   HOY también te agradezco por cada sonrisa, por tu sinceridad
                   absoluta y darle vida a mi vida, Por reír, soñar, cantar y
                   cuidar a NALA Por cada emoción única que tienes, y la manera
                   en que me hablas, Por comer, rezar, amar y viajar mi lado,
                   Por cada escrito que me haces y las fotos que tomamos. Por
                   todas esas cosas que hoy en día te definen, Un brindis por
                   este día Churrita y el día en que naciste.
                </p>
 
                <p className="my-4">
                   QUIERO que cada sueño que tengas se te cumpla, Que tengas
                   sabiduría y se vayan tus dudas, Cree en cada paso que des y en
                   tus capacidades, porque tienes muchos talentos, y tu muy bien
                   lo sabes. y cuando estés triste sólo levanta tu mirada,
                   agradece por la vida y las personas que te aman,
                </p>
 
                <p className="my-4">
                   En un día como estos como me gustaría estar a tu lado,
                   festejar este momento y cantarte el feliz cumpleaños, Sin
                   embargo vienen días donde nos vamos a encontrar, Nos daremos
                   un fuerte abrazo y nos iremos a viajar, ya sea por Toronto,
                   Montreal, Colombia, o el mundo entero, No importa donde sea el
                   destino, se que vamos a llegar a tiempo.
                </p>
 
                <p className="my-4">
                   Así que espero Churrita que hoy estemos felices, Porque hoy
                   brindo por este día y el día en que naciste....
                </p>
             </div>
             : null
            }
         </div>
      </div>
   );
}
