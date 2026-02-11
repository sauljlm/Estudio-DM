import { useRef, useEffect } from "react";
import gsap from "gsap";
import FloatingVector from "./FloatingVector";

export default function AnimatedCard() {
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  // ===============================
  // Configuración elementos
  // ===============================

  const elements = [
    { ref: useRef(null), radius: 180, strength: 0.3, floatAmp: 35, speed: 0.6 },
    { ref: useRef(null), radius: 160, strength: 0.26, floatAmp: 30, speed: 0.8 },
    { ref: useRef(null), radius: 140, strength: 0.24, floatAmp: 28, speed: 1 },

    // Cubos fondo
    { ref: useRef(null), radius: 260, strength: 0.12, floatAmp: 40, speed: 0.4 },
    { ref: useRef(null), radius: 260, strength: 0.12, floatAmp: 38, speed: 0.5 },
  ];

  // Offsets magnéticos individuales
  const magneticOffsets = elements.map(() => ({ x: 0, y: 0 }));

  // ===============================
  // Mouse
  // ===============================

  const handleMouseMove = (e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  };

  // ===============================
  // Helper
  // ===============================

  const getData = (el) => {
    if (!el) return null;
    const rect = el.getBoundingClientRect();

    return {
      rect,
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
    };
  };

  // ===============================
  // GSAP ticker
  // ===============================

  useEffect(() => {
    const easeFunc = gsap.parseEase("power3.out");

    let time = 0;

    const update = () => {
      time += 0.01;

      // suavizar mouse
      smoothMouse.current.x +=
        (mouse.current.x - smoothMouse.current.x) * 0.08;

      smoothMouse.current.y +=
        (mouse.current.y - smoothMouse.current.y) * 0.08;

      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;

      elements.forEach((item, index) => {
        const el = item.ref.current;
        const data = getData(el);
        if (!data) return;

        const dx = mx - data.cx;
        const dy = my - data.cy;

        const distance = Math.hypot(dx, dy);

        // =====================
        // IDLE FLOATING
        // =====================
        const idleX =
          Math.sin(time * item.speed + index) * item.floatAmp;

        const idleY =
          Math.cos(time * item.speed + index) * item.floatAmp;

        // =====================
        // MAGNETIC
        // =====================
        let magX = 0;
        let magY = 0;

        if (distance < item.radius) {
          const proximity = 1 - distance / item.radius;

          const eased = easeFunc(proximity);
          const boost = Math.pow(eased, 1.6);

          magX = dx * item.strength * boost;
          magY = dy * item.strength * boost;
        }

        // Guardar offset magnético
        magneticOffsets[index].x += (magX - magneticOffsets[index].x) * 0.15;
        magneticOffsets[index].y += (magY - magneticOffsets[index].y) * 0.15;

        // =====================
        // COMBINAR MOVIMIENTO
        // =====================
        gsap.set(el, {
          x: idleX + magneticOffsets[index].x,
          y: idleY + magneticOffsets[index].y,
        });
      });
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-[450px] md:h-[360px] rounded-2xl overflow-hidden bg-[#b8e7c8] mt-6 md:mt-14"
    >
      <FloatingVector
        ref={elements[0].ref}
        className="absolute -top-10 right-10 md:-right-20 w-48 md:w-96 h-48 md:h-96 z-20"
        size={256}
      />

      <FloatingVector
        ref={elements[1].ref}
        className="absolute bottom-10 md:-bottom-32 -left-10 md:left-1/4 w-40 md:w-72 h-40 md:h-72 z-20"
      />

      <FloatingVector
        ref={elements[2].ref}
        className="absolute top-10 right-96 w-24 md:w-40 h-24 md:h-40 z-20"
      />

      {/* Cubos fondo */}
      <div className="absolute top-0 -left-16 md:w-96 md:h-96 w-48 h-48 z-10">
        <div ref={elements[3].ref} className="w-full h-full">
          <div className="bg-[#8dd9a7] w-full h-full rounded-2xl" />
        </div>
      </div>

      <div className="absolute -bottom-20 -right-10 md:-bottom-40 md:right-40 md:w-96 md:h-96 w-48 h-48 z-10">
        <div ref={elements[4].ref} className="w-full h-full">
          <div className="bg-[#8dd9a7] w-full h-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}