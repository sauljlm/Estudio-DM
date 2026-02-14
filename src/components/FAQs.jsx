import { useState } from "react";
import { FAQsData } from "../data/FAQsData";

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion max-w-3xl mx-auto">
      {FAQsData.map((item, index) => (
        <div key={index} className="accordion-item border-b border-gray-200">
          
          <button
            aria-expanded={activeIndex === index}
            onClick={() => toggleAccordion(index)}
            className="relative w-full text-left py-4 text-gray-600 hover:text-[#8dd9a7] transition"
          >
            <span className="accordion-title pr-8 block">
              {item.title}
            </span>

            <span className="absolute right-0 top-5 w-5 h-5 border border-current rounded-full">
              <span className="absolute top-[8px] left-[4px] w-3 h-[2px] bg-current"></span>

              {activeIndex !== index && (
                <span className="absolute top-[3px] left-[8.6px] w-[2px] h-3 bg-current"></span>
              )}
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ${
              activeIndex === index
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="py-4 text-gray-500">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}