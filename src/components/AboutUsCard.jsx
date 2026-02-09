import { forwardRef } from "react";

import StrategyIcon from "./icons/StrategyIcon";
import CreativityIcon from "./icons/CreativityIcon";
import PerformanceIcon from "./icons/PerformanceIcon";

const iconMap = {
  strategy: StrategyIcon,
  creativity: CreativityIcon,
  performance: PerformanceIcon,
};

const AboutUsCard = forwardRef(({ title, description, icon }, ref) => {
  const IconComponent = iconMap[icon];

  return (
    <article ref={ref} className="h-full">
        <div className="rounded-2xl h-full bg-white shadow-lg p-6 md:p-8 flex flex-col items-center transition-all will-change-transform duration-300 hover:-translate-y-3 hover:shadow-xl">
            <div className="w-[60px] h-[60px]">
                {IconComponent && (
                <IconComponent className="w-full h-full text-[#FE792A] hover:text-[#FF6434] active:text-[#FF6434] transition" />
                )}
            </div>
            <h4 className="text-xl font-semibold mb-3">{title}</h4>
            <p className="text-gray-600 text-center">{description}</p>
        </div>

    </article>
  );
});

export default AboutUsCard;