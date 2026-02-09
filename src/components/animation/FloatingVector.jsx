import { forwardRef } from "react";

const FloatingVector = forwardRef(
  ({ className, transform, size = 224 }, ref) => {
    return (
      <div className={className}>
        <div style={{ display: "inline-block" }}>
          <div ref={ref} className="w-full h-full" style={{ transform }}>
            <img
              src="/icons/figure2.svg"
              className="w-full h-full"
              width={size}
              height={size}
              loading="lazy"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
);

export default FloatingVector;