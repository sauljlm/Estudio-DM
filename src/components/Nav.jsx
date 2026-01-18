import { useState } from "react";

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
    <header className="fixed top-0 left-0 w-full h-16 bg-slate-100 z-50 flex justify-center">
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
            bg-slate-100 md:bg-transparent
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
            <button className={`relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm cursor-pointer overflow-hidden disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [background:_linear-gradient(var(--liquid-button-color)_0_0)_no-repeat_calc(200%-var(--liquid-button-fill,0%))_100%/200%_var(--liquid-button-fill,0.2em)] hover:[--liquid-button-fill:100%] hover:[--liquid-button-delay:0.3s] [transition:_background_0.3s_var(--liquid-button-delay,0s),_color_0.3s_var(--liquid-button-delay,0s),_background-position_0.3s_calc(0.3s_-_var(--liquid-button-delay,0s))] focus:outline-none hover:text-white [--liquid-button-color:#656DFC] h-10 has-[&gt;svg]:px-3 !bg-black text-white px-7 py-2 rounded-md font-medium mb-24 w-1/2 text-xl md:text-base md:w-auto md:mb-0 md:absolute md:right-0`} aria-label="Contactar" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_0_" data-state="closed" tabIndex="0" style={{ transform: "none" }}>Contáctenos</button>
        </nav>
      </div>

    </header>
  );
}
