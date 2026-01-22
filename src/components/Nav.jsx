import { useState } from "react";
import Button from "./Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navigation = [
    { title: "Portafolio", path: "/#portfolio" },
    { title: "Sobre Nosotros", path: "/about-us" },
    { title: "Nuestros Servicios", path: "/our-services" },
    { title: "Q&A", path: "/q-y-a" },
    { title: "Contacto", path: "/contact" }
  ];

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-neutral-100 z-50 flex justify-center">
      <div className="w-full max-w md:px-0 px-6 md:max-w-7xl flex items-center justify-between relative">
        <div className="absolute"><img className="w-[40px]" src="/img/estudio-dm-icon.png" alt=""/></div>
        <button
            className="ml-auto md:hidden flex flex-col gap-1"
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
            absolute md:static top-16 left-0 w-full
            bg-neutral-100 md:bg-transparent
            md:px-0 px-6 h-screen
            flex-col md:flex-row
            flex justify-between items-center
            transition-all
            ${open ? "left-[0%] pointer-events-auto" : "left-[100%] pointer-events-none md:left-[0%] md:pointer-events-auto"}
            `}
        >
            <ul className="w-full flex ml-auto mr-auto flex-col items-center py-10 h-1/2 justify-between md:flex-row md:justify-between md:w-6/12 md:py-0 ">
                {navigation.map((item, idx) => (
                    <li>
                        <a
                            key={idx}
                            href={item.path}
                            className="border-b-4 border-transparent hover:border-black transition text-xl md:text-base"
                            onClick={() => setOpen(false)}
                        >
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
            <Button variant="primary" className="right-0 md:absolute">Contáctenos</Button>
        </nav>
      </div>

    </header>
  );
}
