import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Button from "../components/Button";
import PlanCard from "../components/PlanCard";
import ServiceCard from "../components/ServiceCard";
import AboutUsCard from "../components/AboutUsCard";
import AnimatedCard from "../components/animation/AnimatedCard"
import FAQs from "../components/FAQs";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { services } from "../data/servicesData";
import { aboutUs } from "../data/aboutUsData";

export default function Home() {
  const introRef = useRef(null);
  const bannerRef = useRef(null);
  const aboutUsHeadRef = useRef(null);
  const planesRef = useRef([]);
  const individualesRef = useRef([]);
  const aboutRef = useRef([]);

  const contactUrl = `https://wa.me/50683649226?text=Hola%2C%20me%20gustaría%20saber%20más%20información`;

  planesRef.current = [];
  individualesRef.current = [];
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
    },0.2)
    .from(bannerRef.current, {
      y: 50,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=2.5");

    // Scroll Cards 
    const cards = [
      ...planesRef.current,
      ...individualesRef.current,
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
      <div className="p-6 w-full flex flex-col items-center bg-neutral-100">
          {/* INTRO */}
          <section ref={introRef} className="w-[90%] xl:w-[70%] mt-16 md:mt-32 flex flex-col ">
              <div className="w-full md:w-3/4">
                <h1 className="text-3xl md:text-6xl font-bold">
                  Impulsamos tu negocio con estrategias digitales diseñadas para generar resultados medibles.
                </h1>
                <h2 className="mt-4 text-l md:text-2xl text-gray-600">Analizamos tu negocio, diseñamos una estrategia a tu medida y la ejecutamos contigo, con campañas, contenido y seguimiento basado en resultados reales con metricas claras.</h2>
              </div>
              <div ref={bannerRef} className="w-full flex md:justify-center">
                <AnimatedCard/>
              </div>
          </section>

          <section id="nuestros-servicios" className="w-[90%] xl:w-[70%] mt-20 md:mt-32 flex flex-col">
              <div className="flex justify-between mb-5 flex-col md:flex-row">
                <div className="heading-anim">
                  <h3 className="text-gray-600">Lo que nos diferencia</h3>
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-4 md:mb-8"
                  >
                    Nuestros Servicios
                  </h2>
                </div>
                <p className="text-anim w-full md:w-[50%]">
                Impulsamos marcas a través del estrategias de marketing digital enfocadas en crecimiento, orden y performance. Nuestro enfoque combina contenido, pauta publicitaria y análisis de resultados.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {services.planes.map((plan, i) => (
                  <PlanCard
                    key={plan.id}
                    ref={el => (planesRef.current[i] = el)}
                    subtitle={plan.subtitle}
                    title={plan.title}
                    description={plan.description}
                    items={plan.items}
                  />
                ))}
              </div>

              <div className="flex justify-between mb-5 mt-20 flex-col md:flex-row">
                <div className="heading-anim">
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-4 md:mb-8"
                  >
                    Servicios individuales
                  </h2>
                </div>
                <p className="text-anim w-full md:w-[50%]">
                Soluciones específicas diseñadas para cubrir necesidades puntuales de tu marca. Podés contratar servicios individuales o combinarlos para potenciar tus resultados digitales.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {services.individuales.map((service, i) => (
                  <ServiceCard
                    key={i}
                    ref={el => (individualesRef.current[i] = el)}
                    title={service.title}
                    description={service.description}
                    items={service.items}
                  />
                ))}
              </div>
          </section>
          
          {/* <section ref={addToRefs}></section> */}
          <section id="sobre-nosotros" className="w-[90%] xl:w-[70%] mt-24 md:mt-32 mx-auto">
            <div className="flex flex-col justify-between mb-12 gap-6">
              <div ref={aboutUsHeadRef} className="w-full flex items-center flex-col">
                <h3 className="tracking-wide text-gray-600">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              <Button variant="secondary" href={contactUrl} target="_blank" aria-label="Contactar por whatsApp">
                Contáctenos
              </Button>
            </div>
          </section>

          <section id="preguntas-frecuentes" className="w-[90%] xl:w-[70%] mt-20 md:mt-32 flex flex-col">
              <div className="flex justify-between mb-5 flex-col md:flex-row">
                <div className="heading-anim">
                  <h3 className="text-gray-600">Preguntas frecuentes</h3>
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-4 md:mb-8"
                  >
                    Todo lo que necesitás saber <br/>para empezar
                  </h2>
                </div>
                <p className="text-anim w-full md:w-[50%]">
                Conocé nuestro proceso, metodología y alcance de los servicios para entender cómo podemos ayudarte a alcanzar tus objetivos digitales.
                </p>
              </div>

              <div className="mb-12">
                <FAQs />
              </div>
          </section>
      </div>
      <Footer />
    </>
  );
}
