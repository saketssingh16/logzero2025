"use client";
import { useEffect, useRef, useState } from "react";


function CounterValue({ value, duration = 1200 }) {
  const s = String(value).trim();

  // If it's a ratio like "4.9/5" or "24/7", just show it as-is.
  if (s.includes("/")) return <>{s}</>;

  const m = s.match(
    /^([+\-₹$€£]*)\s*([0-9]*\.?[0-9]+)\s*([KMB]?)\s*(\+)?\s*([%xX]?)$/
  );

  // If it doesn't match supported formats, show raw value.
  if (!m) return <>{s}</>;

  const [, prefix = "", num = "0", abbr = "", plus = "", tail = ""] = m;
  const decimals = (num.split(".")[1] || "").length;
  const target = parseFloat(num || "0");

  const [display, setDisplay] = useState(0);
  const rafRef = useRef();

  useEffect(() => {
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(target * p);
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  const formatted =
    (prefix || "") +
    (decimals ? display.toFixed(decimals) : Math.round(display).toString()) +
    (abbr || "") +
    (plus ? "+" : "") +
    (tail || "");

  return <>{formatted}</>;
}

const CTB = ({ stats }) => {
  return (
    <section className="bg-[#042C21] px-6 py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 text-center flex flex-col items-center justify-center m-0 transition-colors duration-300 ease-in-out transition-transform hover:scale-105"
          >
            <span className="text-[#1E8767] font-bold text-[32px] pt-6">
              <CounterValue value={item.value} />
            </span>
            <p className="subtextcolor text-center pt-4 subtext">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CTB;
