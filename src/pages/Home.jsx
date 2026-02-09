import { useEffect, useRef } from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ServiceCard from "../components/ServiceCard";
import AboutUsCard from "../components/AboutUsCard";
import AnimatedCard from "../components/animation/AnimatedCard"

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { services } from "../data/servicesData";
import { aboutUs } from "../data/aboutUsData";

export default function Home() {
  const introRef = useRef(null);
  const aboutUsHeadRef = useRef(null);
  const servicesRef = useRef([]);
  const aboutRef = useRef([]);

  servicesRef.current = [];
  aboutRef.current = [];

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

    // Scroll Cards 
    const cards = [
      ...servicesRef.current,
      ...aboutRef.current
    ].filter(Boolean);

    gsap.utils.toArray(".heading-anim").forEach(el => {
      gsap.from(el, {
        x: -50,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });
  
    gsap.utils.toArray(".text-anim").forEach(el => {
      gsap.from(el, {
        x: 50,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
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

    gsap.from(aboutUsHeadRef.current, {
      y: 50,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: aboutUsHeadRef.current,
        start: "top 85%",
      }
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
          <section ref={introRef} className="w-[90%] md:w-[70%] mt-24 md:mt-32 flex flex-col ">
              <div className="w-full md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Nos sentamos a entender tu caso y armamos un plan que tenga sentido para tu negocio.
                </h1>
                <h2 className="mt-2 text-xl md:text-2xl text-gray-600">Después lo ejecutamos con vos: campañas, contenido y seguimiento, con métricas claras.</h2>
              </div>
              <div className="w-full flex md:justify-center">
                <AnimatedCard/>
              </div>
          </section>

          <section className="w-[90%] md:w-[70%] mt-20 md:mt-32 flex flex-col">
              <div className="flex justify-between mb-5 flex-col md:flex-row">
                <div className="heading-anim">
                  <h3>Lo que nos diferencia</h3>
                  <h2
                    className="text-2xl md:text-xl font-bold mb-4 md:mb-8"
                  >
                    Nuestros Servicios
                  </h2>
                </div>
                <p className="text-anim w-full md:w-[50%]">
                Impulsamos marcas a través del estrategias de marketing digital enfocadas en crecimiento, orden y performance. Nuestro enfoque combina contenido, pauta publicitaria y análisis de resultados.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {services.map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    ref={el => (servicesRef.current[i] = el)}
                    subtitle={service.subtitle}
                    title={service.title}
                    description={service.description}
                    items={service.items}
                  />
                ))}
              </div>
          </section>
          
          {/* <section ref={addToRefs}></section> */}
          <section id="about-us" className="w-[90%] md:w-[70%] mt-24 md:mt-32 mx-auto">
            <div className="flex flex-col justify-between mb-12 gap-6">
              <div ref={aboutUsHeadRef} className="w-full flex items-center flex-col">
                <h3 className="tracking-wide text-gray-500">
                  Sobre nosotros
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 text-center">
                  Estrategia, creatividad y performance
                </h2>
                <p className="md:w-[70%] text-gray-600 text-center leading-relaxed mt-4">
                Somos una empresa costarricense con presencia en Costa Rica, República Dominicana y España, enfocada en construir marcas con orden, criterio y resultados.
                Creemos en un trabajo limpio y estratégico, que eleve la estética de cada proyecto sin perder efectividad.
                Más allá del diseño, fortalecemos continuamente nuestras capacidades para ofrecer un acompañamiento integral.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aboutUs.map((item, i) => (
                <AboutUsCard
                  key={item.id}
                  ref={el => (aboutRef.current[i] = el)}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              ))}
            </div>

            <div className="flex justify-center mt-14">
              <Button variant="secondary">
                Contáctenos
              </Button>
            </div>
          </section>

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
