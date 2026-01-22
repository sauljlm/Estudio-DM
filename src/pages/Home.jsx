import { useEffect, useRef } from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Button from "../components/Button";

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
                  <div>
                    <h3 className="">Lo que nos diferencia</h3>
                    <h2
                      className="text-4xl font-bold mb-4 md:mb-8"
                    >
                      Nuestros Servicios
                    </h2>
                  </div>
                  <p className="w-full md:w-[50%]">
                  Impulsamos marcas a través del estrategias de marketing digital enfocadas en crecimiento, orden y performance. Nuestro enfoque combina contenido, pauta publicitaria y análisis de resultados.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <article className="relative rounded-2xl bg-white shadow-lg p-6 md:p-8 flex flex-col">
                    <h3 className="text-2xl pb-4">Presencia y Orden</h3>
                    <p className="pb-5">Ideal para marcas que buscan una base sólida y una comunicación coherente.</p>
                    <ul className="pb-5 list-disc list-inside">
                      <li>Producción mensual de contenido para redes sociales</li>
                      <li>Diseño de piezas publicitarias y anuncios básicos</li>
                      <li>Gestión de campañas publicitarias en una plataforma</li>
                      <li>Segmentación inicial de audiencias</li>
                      <li>Reporte mensual con métricas clave y recomendaciones</li>
                    </ul>
                    <Button variant="secondary" className="mt-auto">Contáctenos</Button>
                  </article>
                  <article className="rounded-2xl bg-white shadow-lg p-6 md:p-8 flex flex-col">
                    <h3 className="text-2xl pb-4">Crecimiento y Consistencia</h3>
                    <p className="pb-5">Pensado para negocios que necesitan escalar resultados de forma sostenida.</p>
                    <ul className="pb-5 list-disc list-inside">
                      <li>Calendario estratégico de contenido y anuncios</li>
                      <li>Creatividad visual y video para múltiples formatos</li>
                      <li>Gestión de campañas en una o más plataformas</li>
                      <li>Segmentación avanzada y audiencias similares</li>
                      <li>Análisis de ROI y métricas con seguimiento mensual</li>
                      <li>Landing page enfocada en conversión</li>
                    </ul>
                    <Button variant="secondary" className="mt-auto">Contáctenos</Button>
                  </article>
                  <article className="rounded-2xl bg-white shadow-lg p-6 md:p-8 flex flex-col">
                    <h3 className="text-2xl pb-4">Dominio y Performance</h3>
                    <p className="pb-5">Para marcas que buscan maximizar resultados y optimizar cada punto del embudo</p>
                    <ul className="pb-5 list-disc list-inside">
                      <li>Estrategia integral de contenido y performance</li>
                      <li>Creatividades optimizadas con testing A/B</li>
                      <li>Gestión avanzada de campañas y remarketing</li>
                      <li>Segmentación estructurada y análisis continuo</li>
                      <li>Dashboard de métricas en tiempo real</li>
                      <li>Desarrollo web enfocado en conversión</li>
                    </ul>
                    <Button variant="secondary" className="mt-auto">Contáctenos</Button>
                  </article>
                </div>
            </section>

            {/* CARDS */}
            <section className="w-[90%] md:w-[70%] mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((_, i) => (
                <div
                key={i}
                ref={el => (cardsRef.current[i] = el)}
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
