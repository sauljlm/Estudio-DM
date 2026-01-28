import { useEffect, useRef } from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ServiceCard from "../components/ServiceCard";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { services } from "../data/servicesData";

export default function Home() {
  const introRef = useRef(null);
  const titleRef = useRef(null);

  const headingRef = useRef(null);
  const textRef = useRef(null);

  const cardsRef = useRef([]);
  cardsRef.current = [];

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
    const cards = cardsRef.current.filter(Boolean);

    gsap.from(headingRef.current, {
      x: -50,
      autoAlpha: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 85%",
      },
    });
  
    gsap.from(textRef.current, {
      x: 50,
      autoAlpha: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 85%",
      },
    });

    gsap.set(cards, {
      autoAlpha: 0,
      y: 50,
    });

    ScrollTrigger.batch(cards, {
      start: "top 85%",
      onEnter: batch =>
        gsap.to(batch, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
        }),
      once: true,
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
  
  const addToRefs = el => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <>
      <Nav />

        <div className="p-6 w-full flex flex-col items-center flex bg-neutral-100">
            {/* INTRO */}
            <section ref={introRef} className="w-[90%] md:w-[70%] mt-24 md:mt-32 flex flex-col-reverse md:flex-row ">
                <div className="w-full md:w-1/2">
                  <h1 className="text-5xl font-bold">
                      Nos sentamos a entender tu caso y armamos un plan que tenga sentido para tu negocio.
                  </h1>
                  <h2 className="mt-2 text-2xl text-gray-600">Después lo ejecutamos con vos: campañas, contenido y seguimiento, con métricas claras.</h2>
                </div>
                <div className="w-full md:w-1/2 flex md:justify-center">
                  <img className="w-2/3 h-fit" src="/img/hero.png" alt=""/>
                </div>
            </section>

            <section className="w-[90%] md:w-[70%] mt-20 md:mt-32 flex flex-col">
                <div className="flex justify-between mb-5 flex-col md:flex-row">
                  <div ref={headingRef}>
                    <h3>Lo que nos diferencia</h3>
                    <h2
                      className="text-4xl font-bold mb-4 md:mb-8"
                    >
                      Nuestros Servicios
                    </h2>
                  </div>
                  <p ref={textRef} className="w-full md:w-[50%]">
                  Impulsamos marcas a través del estrategias de marketing digital enfocadas en crecimiento, orden y performance. Nuestro enfoque combina contenido, pauta publicitaria y análisis de resultados.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {services.map((service, i) => (
                    <ServiceCard
                      key={service.id}
                      ref={el => (cardsRef.current[i] = el)}
                      subtitle={service.subtitle}
                      title={service.title}
                      description={service.description}
                      items={service.items}
                    />
                  ))}
                </div>
            </section>
            
            {/* <section ref={addToRefs}></section> */}
            {/* <section>
              <div className="flex justify-between mb-5 flex-col md:flex-row">
                <div ref={headingRef}>
                  <h3 className="">Lo que nos diferencia</h3>
                  <h2
                    className="text-4xl font-bold mb-4 md:mb-8"
                  >
                    Nuestros Servicios
                  </h2>
                </div>
                <p ref={textRef} className="w-full md:w-[50%]">
                Impulsamos marcas a través del estrategias de marketing digital enfocadas en crecimiento, orden y performance. Nuestro enfoque combina contenido, pauta publicitaria y análisis de resultados.
                </p>
              </div>
            </section> */}

            {/* CARDS */}
            <section className="w-[90%] md:w-[70%] mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((_, i) => (
                <div
                key={i}
                //ref={el => (cardsRef.current[i] = el)}
                >
                <Card />
                </div>
            ))}
            </section>
        </div>
        <Footer />
    </>
  );
}
