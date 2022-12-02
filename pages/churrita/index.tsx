import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Home.module.css";

export default function Home() {
   const [seeLyrics, setSeeLyrics] = useState(false);
   const [song, setSong] = useState<HTMLAudioElement | null>(null);

   const onPlaySong = () => {
      if (song === null) {
         setSong(new Audio("/sounds/al-infinito-y-mas-alla.m4a"));
      }

      setSeeLyrics(true);
   };

   if (song != null && song.currentTime === 0) {
      song.play();
   }

   return (
      <div className={styles.container}>
         <Head>
            <title>Codes and Tags | Churrita</title>
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

            {seeLyrics ? (
               <div>
                  <p className="my-4">🎶 🎤 ...</p>
                  <p className="my-4">
                     <br />
                     ...BUENO no sé cómo empezar esto
                     <br />
                     Es la primera vez que lo hago
                     <br />Y más que desearte tan solo un FELIZ CUMPLEAÑOS 🎂
                     <br />
                     QUISIERA recordarte en estás sinceras palabras
                     <br />
                     Algunas cuantas cosas que lleguen a tu alma.
                  </p>

                  <p className="my-4">
                     <br />
                     HOY sigue acumulando un montón de primaveras,
                     <br />
                     memorables aventuras e infinitas experiencias,
                     <br />
                     FINALMENTE llegó el día que tanto esperabas,
                     <br />
                     Aquel 2 de 🎄 Diciembre que tanto se alargaba.
                  </p>

                  <p className="my-4">
                     <br />
                     EMPIEZO por darle gracias 🙏 al cielo que hoy existes,
                     <br />
                     por los años que vienen, y el día en que me conociste,
                     <br />
                     por cada instante,
                     <br />
                     por cada abrazo, 🫂
                     <br />
                     por cada beso, 💋
                     <br />y los recuerdos felices, 😁
                     <br />
                     por los retos superados, y por cada enseñanza, 👩‍🏫
                     <br />
                     por cada paso a tu lado y los 💌 mensajes que aún existen,
                     <br />
                     por cada ☕️ café que nos tomamos en la capital,
                     <br />
                     por las profundas conversaciones llenas de sinceridad,
                     <br />
                     por cada tarde contemplando el atardecer,
                     <br />
                     por aquellos buenos días juntos al amanecer...
                  </p>

                  <p className="my-4">
                     <br />
                     PARA continuar la historia te regalo estás palabras,
                     <br />
                     Y disculpame Churrita si salen algunas lagrimas 😢,
                     <br />
                     lo único que quiero es VERTE VOLAR 🚀,
                     <br />
                     que cumplas todos tus sueños y lo digo de verdad,
                     <br />
                     NUNCA TE detengas, tu solo sigue adelante 🏃‍♀️,
                     <br /> Que DIOS bendiga tu vida en en cada instante.
                  </p>

                  <p className="my-4">
                     <br />
                     LA VIDA continúa y si algún día miras atrás,
                     <br />
                     ojalá tomes impulso y sólo vuelve a recordar,
                     <br />
                     que cada día que vives cuenta y los segundos suman,
                     <br />
                     que las tristezas te enseñan, y la experiencia ayuda,
                     <br />
                     que cada cosa que aprendas es una oportunidad,
                     <br />
                     que aunque no somos perfectos si podemos perdonar.
                  </p>

                  <p className="my-4">
                     <br />
                     HOY también te agradezco por cada sonrisa,
                     <br />
                     Por tu sinceridad absoluta y darle vida a mi vida,
                     <br />
                     Por reír, soñar, cantar y cuidar a NALA 🐈‍⬛ 
                     <br />
                     Por cada emoción única que tienes,
                     <br />
                     y la manera en que me hablas,
                     <br />
                     Por comer, rezar, amar y viajar mi lado,
                     <br />
                     Por cada escrito que me haces y las fotos que tomamos,
                     <br />
                     Por todas esas cosas que hoy en día te definen,
                     <br />
                     Un brindis por este día Churrita y el día en que naciste.
                  </p>

                  <p className="my-4">
                     <br />
                     QUIERO que cada sueño que tengas se te cumpla,
                     <br />
                     Que tengas sabiduría y se vayan tus dudas,
                     <br />
                     Cree en cada paso que des y en tus capacidades,
                     <br />
                     porque tienes muchos talentos, y tu muy bien lo sabes.
                     <br />
                     y cuando estés triste sólo levanta tu mirada,
                     <br />
                     agradece por la vida y las personas que te aman,
                  </p>

                  <p className="my-4">
                     <br />
                     En un día como estos como me gustaría estar a tu lado,
                     <br />
                     festejar este momento y cantarte el FELIZ CUMPLEAÑOS 🎂,
                     <br />
                     Sin embargo vienen días donde nos vamos a encontrar,
                     <br />
                     Nos daremos un fuerte abrazo y nos iremos a viajar ✈️,
                     <br />
                     ya sea por 🇨🇦 Toronto, Montreal, 🇨🇴 Colombia, o el 🌎 mundo entero,
                     <br />
                     No importa donde sea el destino, se que vamos a llegar a
                     tiempo.
                  </p>

                  <p className="my-4">
                     <br />
                     Así que espero ❤️ Churrita que hoy estemos felices,
                     <br />
                     Porque hoy 🥂 brindo por este día y el día en que naciste....
                  </p>
               </div>
            ) : null}
         </div>
      </div>
   );
}
