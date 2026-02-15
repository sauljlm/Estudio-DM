import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useLanguage } from "../i18n/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  const { lang, translation } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const basePath = lang === "en" ? "/en" : "/";

  const contactUrl = translation.navbar.whatsappMsg;

  const navigation =
    lang === "en"
      ? [
          { title: "Portfolio", path: "/en/#portafolio" },
          { title: "Our Services", path: "/en/#nuestros-servicios" },
          { title: "About Us", path: "/en/#sobre-nosotros" },
          { title: "FAQ", path: "/en/#preguntas-frecuentes" },
          { title: "Contact", path: "/en/contact" }
        ]
      : [
          { title: "Portafolio", path: "/#portafolio" },
          { title: "Nuestros Servicios", path: "/#nuestros-servicios" },
          { title: "Sobre Nosotros", path: "/#sobre-nosotros" },
          { title: "Preguntas frecuentes", path: "/#preguntas-frecuentes" },
          { title: "Contacto", path: "/contact" }
        ];

  const toggleLang = () => {
    const newPath = lang === "en"
      ? location.pathname.replace("/en", "")
      : "/en" + location.pathname;
  
    navigate(newPath);
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-neutral-100 z-50 flex justify-center">
      <div className="w-full max-w lg:px-0 px-6 md:max-w-5xl xl:max-w-7xl flex items-center justify-between relative">
        <div className="absolute"><HashLink to={basePath}><img className="w-[40px]" src="/img/estudio-dm-icon.png" alt=""/></HashLink></div>
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
            <div className="right-0 md:absolute flex gap-2">
              <button 
                onClick={toggleLang}
                class="flex items-center gap-2 text-black/50 font-medium hover:bg-[#E3E3E3] px-3 py-2 rounded-md transition-all duration-500 ease-in-out" 
                aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe w-5 h-5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                <span class="text-lg">{lang === "es" ? "EN" : "ES"}</span>
              </button>
              <Button variant="primary">
                <a href={contactUrl} target="_blank" aria-label="Contactar por whatsApp">{lang === "en" ? "Contact us" : "Contáctanos"}</a>
              </Button>
            </div>
        </nav>
      </div>
    </header>
  );
}
