import { useEffect, useRef } from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default function Home() {
  const introRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Intro
    const introSplit = new SplitText(introRef.current, {
        type: "words"
    });

    const tl = gsap.timeline({
        ease: "power2.out"
    });

    tl.from(introSplit.words, {
        duration: 0.3,
        y: 35,
        stagger: 0.1,
        ease: "power2.out"
    })
    .from(introSplit.words,{
        duration: 0.3,
        autoAlpha: 0,
        stagger: 0.1,
        filter: "blur(3px)",
        ease: "power2.out"
    },
    0.2);

    // Scroll titles
    const split = new SplitText(titleRef.current, {
      type: "words"
    });

    gsap.from(split.words, {
      y: 35,
      autoAlpha: 0,
      filter: "blur(4px)",
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true
      }
    });

    // Scroll Cards 
    cardsRef.current.forEach(card => {
      gsap.from(card, {
        y: 50,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      <Nav />

        <section className="p-6 w-full flex flex-col items-center flex">
            {/* INTRO */}
            <div ref={introRef} className="w-[90%] md:w-[70%] mt-24 md:mt-32 flex flex-col-reverse md:flex-row ">
                <div className="w-full md:w-1/2">
                  <h1 className="text-5xl font-bold">
                      Nos sentamos a entender tu caso y armamos un plan que tenga sentido para tu negocio.
                  </h1>
                  <h2 className="mt-2 text-3xl text-gray-600">Después lo ejecutamos con vos: campañas, contenido y seguimiento, con métricas claras.</h2>
                </div>
                <div className="w-full md:w-1/2 flex md:justify-center">
                  <img className="w-2/3 h-fit" src="/img/hero.png" alt=""/>
                </div>
            </div>

            {/* CARDS */}
            <div className="w-[90%] md:w-[70%] mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((_, i) => (
                <div
                key={i}
                ref={el => (cardsRef.current[i] = el)}
                >
                <Card />
                </div>
            ))}
            </div>

            {/* TÍTULO CON SPLITTEXT */}
            <div className="w-[70%] mt-32">
            <h2
                ref={titleRef}
                className="text-6xl font-bold"
            >
                Transformamos Ideas en Experiencias Digitales
            </h2>
            <p className="mt-2 text-gray-600">Hello World!</p>
            </div>
        </section>
        <Footer />
    </>
  );
}
