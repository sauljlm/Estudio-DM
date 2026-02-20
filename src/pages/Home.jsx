import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLanguage } from "../i18n/LanguageContext";

import Footer from "../components/Footer";
import Button from "../components/Button";
import PlanCard from "../components/PlanCard";
import ServiceCard from "../components/ServiceCard";
import AboutUsCard from "../components/AboutUsCard";
import AnimatedCard from "../components/animation/AnimatedCard"
import FAQs from "../components/FAQs";

export default function Home() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleSplitRef = useRef(null);
  const subtitleSplitRef = useRef(null);  
  const bannerRef = useRef(null);
  const aboutUsHeadRef = useRef(null);
  const planesRef = useRef([]);
  const individualesRef = useRef([]);
  const aboutRef = useRef([]);

  const { lang, translation } = useLanguage();

  const contactUrl = `https://wa.me/50683649226?text=Hola,%20me%20gustaría%20saber%20más%20información`;

  planesRef.current = [];
  individualesRef.current = [];
  aboutRef.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    
    if (!titleRef.current || !subtitleRef.current) return;
    
    titleSplitRef.current?.revert();
    subtitleSplitRef.current?.revert();
 
    titleSplitRef.current = new SplitText(titleRef.current, {
      type: "words"
    });
    subtitleSplitRef.current = new SplitText(subtitleRef.current, {
      type: "words"
    });
  
    const tl = gsap.timeline({ ease: "power2.out" });
  
    tl.from(titleSplitRef.current.words, {
      duration: 0.3,
      y: 35,
      stagger: 0.1
    })
    .from(titleSplitRef.current.words, {
      duration: 0.3,
      autoAlpha: 0,
      stagger: 0.1,
      filter: "blur(3px)"
    }, 0.2)
    .from(subtitleSplitRef.current.words, {
      duration: 0.3,
      y: 20,
      autoAlpha: 0,
      stagger: 0.05
    }, "-=0.2")
    .from(bannerRef.current, {
      y: 50,
      autoAlpha: 0,
      duration: 0.8
    }, "-=1");

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
      titleSplitRef.current?.revert();
      subtitleSplitRef.current?.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [lang]);

  return (
    <>
      <div className="p-6 w-full flex flex-col items-center bg-neutral-100">
          <section className="w-[90%] xl:w-[70%] mt-16 md:mt-32 flex flex-col ">
              <div className="w-full md:w-3/4">
                <h1 key={lang} ref={titleRef} className="text-3xl md:text-6xl font-bold">
                  {translation.banner.title}
                </h1>
                <h2 key={lang + "-subtitle"} ref={subtitleRef} className="mt-4 text-l md:text-2xl text-gray-600">{translation.banner.subtitle}</h2>
              </div>
              <div ref={bannerRef} className="w-full flex md:justify-center">
                <AnimatedCard/>
              </div>
          </section>

          <section id="nuestros-servicios" className="w-[90%] xl:w-[70%] mt-20 md:mt-32 flex flex-col">
              <div className="flex justify-between mb-5 flex-col md:flex-row">
                <div className="heading-anim">
                  <h3 className="text-gray-600">{lang === "en" ? "What makes us stand out" : "Lo que nos diferencia"}</h3>
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-4 md:mb-8"
                  >
                    {lang === "en" ? "Our services" : "Nuestros servicios"}
                  </h2>
                </div>
                <p className="text-anim w-full md:w-[50%]">{translation.ourServices.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {translation.ourServices.plans.map((plan, i) => (
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
                    {lang === "en" ? "Individual services" : "Servicios individuales"}
                  </h2>
                </div>
                <p className="text-anim w-full md:w-[50%]">
                {translation.ourServices.descriptionIndividual}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {translation.ourServices.individualServices.map((service, i) => (
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
                {lang === "en" ? "About us" : "Sobre nosotros"}
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 text-center">
                {lang === "en" ? "Strategy, creativity and performance" : "Estrategia, creatividad y performance"}
                </h2>
                <p className="md:w-[70%] text-gray-600 text-center leading-relaxed mt-4">
                {translation.aboutUs.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {translation.aboutUs.items.map((item, i) => (
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
              <Button variant="secondary" href={translation.navbar.whatsappMsg} target="_blank" aria-label={lang === "en" ? "Contact us via WhatsApp" : "Contactar por WhatsApp"}>
              {lang === "en" ? "Contact us" : "Contáctanos"}
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
