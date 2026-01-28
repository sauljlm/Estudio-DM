import { forwardRef } from "react";
import Button from "./Button";

const ServiceCard = forwardRef(({ subtitle, title, description, items }, ref) => {
  const contactUrl = `https://wa.me/50683649226?text=Hola%2C%20me%20gustaría%20saber%20más%20información%20del%20${title}`
  return (
    <article
      ref={ref}
      className="rounded-2xl bg-white shadow-lg p-6 md:p-8 flex flex-col"
    >
      <h4>{subtitle}</h4>
      <h3 className="text-3xl pb-4">{title}</h3>
      <p className="pb-5">{description}</p>

      <ul className="pb-5 list-disc list-inside">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <Button variant="secondary" className="mt-auto" ariaLabel="Más información del plan">
        <a href={contactUrl} target="_blank">Más información</a>
      </Button>
    </article>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
