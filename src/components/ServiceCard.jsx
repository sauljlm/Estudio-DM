import { forwardRef } from "react";
import Button from "./Button";

const ServiceCard = forwardRef(({ title, description, items }, ref) => {
  return (
    <article
      ref={ref}
      className="rounded-2xl bg-white shadow-lg p-6 md:p-8 flex flex-col"
    >
      <h3 className="text-2xl pb-4">{title}</h3>
      <p className="pb-5">{description}</p>

      <ul className="pb-5 list-disc list-inside">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <Button variant="secondary" className="mt-auto">
        Contáctenos
      </Button>
    </article>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
