import { forwardRef } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import Button from "./Button";

const ServiceCard = forwardRef(({ subtitle, title, description, items }, ref) => {
  const { lang } = useLanguage();
  const message =
  lang === "en"
    ? `Hi, I would like to get more information about ${title}`
    : `Hola, me gustaría saber más información sobre ${title}`;

  const contactUrl = `https://wa.me/50683649226?text=${encodeURIComponent(message)}`;

  return (
    <article ref={ref} className="group h-full" >
      <div className="rounded-2xl bg-white h-full shadow-lg p-6 md:p-8 flex flex-col transition-all will-change-transform duration-300 hover:-translate-y-3 hover:shadow-xl">
        <h3 className="text-2xl pb-4">{title}</h3>
        <p className="pb-5">{description}</p>

        <ul className="pb-5">
          {items.map((item, index) => (
            <li key={index}>
              <div className="flex items-center gap-2 py-1"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="min-h-5 min-w-5 max-h-5 max-w-5 items-center justify-center text-[#B9E8C8]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path></svg><span className="text-sm md:text-[15px] text-[#000000]/60 font-medium ">{item}</span></div>
            </li>
          ))}
        </ul>

        <Button
          variant="secondary"
          className="
            mt-auto
            md:hidden
            md:translate-y-2
            pointer-events-none
            transition-all
            duration-300
            group-hover:block
            group-hover:translate-y-0
            group-hover:pointer-events-auto
          "
        >
          <a href={contactUrl} target="_blank" aria-label={lang === "en" ? "More information about the plan" : "Más información del plan"}>{lang === "en" ? "More information" : "Más información"}</a>
        </Button>
      </div>
    </article>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
