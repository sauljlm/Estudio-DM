import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import Button from "./Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const contactUrl = `https://wa.me/50683649226?text=Hola%2C%20me%20gustaría%20saber%20más%20información`;

  const navigation = [
    { title: "Portafolio", path: "/#portafolio" },
    { title: "Nuestros Servicios", path: "/#nuestros-servicios" },
    { title: "Sobre Nosotros", path: "/#sobre-nosotros" },
    { title: "Preguntas frecuentes", path: "/#preguntas-frecuentes" },
    { title: "Contacto", path: "/contactanos" }
  ];

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-neutral-100 z-50 flex justify-center">
      <div className="w-full max-w lg:px-0 px-6 md:max-w-5xl xl:max-w-7xl flex items-center justify-between relative">
        <div className="absolute"><a href="/"><img className="w-[40px]" src="/img/estudio-dm-icon.png" alt=""/></a></div>
        <button
            className="ml-auto lg:hidden flex flex-col gap-1"
            onClick={() => setOpen(!open)}
        >
            <span
                className={`
                block h-0.5 w-6 bg-black 
                transition-all duration-300 ease-in-out
                ${open ? "rotate-45 translate-y-1.5" : ""}
                `}
            />
            
            <span
                className={`
                block h-0.5 w-6 bg-black 
                transition-all duration-300 ease-in-out
                ${open ? "opacity-0" : ""}
                `}
            />
            
            <span
                className={`
                block h-0.5 w-6 bg-black 
                transition-all duration-300 ease-in-out
                ${open ? "-rotate-45 -translate-y-1.5" : ""}
                `}
            />
        </button>

        <nav
            className={`
            absolute lg:static top-16 left-0 w-full
            bg-neutral-100 lg:bg-transparent
            lg:px-0 px-6 h-screen lg:h-16
            flex-col lg:flex-row
            flex justify-between items-center
            transition-all
            ${open ? "left-[0%] pointer-events-auto" : "left-[100%] pointer-events-none lg:left-[0%] lg:pointer-events-auto"}
            `}
        >
            <ul className="w-full flex ml-auto mr-auto flex-col items-center py-10 h-1/2 justify-between lg:flex-row lg:justify-between lg:w-8/12 xl:w-6/12 lg:py-0">
            {navigation.map((item, idx) => (
                <li key={idx}>
                <HashLink
                to={item.path}
                    scroll={(el) => {
                        const yOffset = -90;
                        const y =
                        el.getBoundingClientRect().top + window.pageYOffset + yOffset;

                        window.scrollTo({ top: y, behavior: "smooth" });
                    }}
                    onClick={() => setOpen(false)}
                    className="border-b-4 border-transparent hover:border-black transition text-xl md:text-base"
                    >
                    {item.title}
                </HashLink>
                </li>
            ))}
            </ul>
            <Button variant="primary" className="right-0 md:absolute" href={contactUrl} target="_blank" aria-label="Contactar por whatsApp">Contáctenos</Button>
        </nav>
      </div>

    </header>
  );
}
