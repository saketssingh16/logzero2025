"use client";
import { useEffect, useRef, useState } from "react";

function CounterValue({ value, duration = 1200 }) {
  const parse = (raw) => {
    const s = String(raw).trim();
    const m =
      s.match(
        /^([+\-₹$€£]*)\s*([0-9]*\.?[0-9]+)\s*([KMB]?)\s*(\+)?\s*([%xX]?)$/
      ) || [];
    const [, prefix = "", num = "0", abbr = "", plus = "", tail = ""] = m;
    const decimals = (num.split(".")[1] || "").length;
    return {
      prefix,
      target: parseFloat(num || "0"),
      abbr,
      showPlus: !!plus,
      tail,
      decimals,
    };
  };

  const { prefix, target, abbr, showPlus, tail, decimals } = parse(value);
  const [display, setDisplay] = useState(0);
  const rafRef = useRef();

  useEffect(() => {
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = 1 - Math.pow(1 - t, 3); 
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
    (showPlus ? "+" : "") +
    (tail || "");

  return <>{formatted}</>;
}

export default function WhyChooseUs({ heading, subheading, stats, features }) {
  return (
    <>
      {/* Heading */}
      <div className="text-center mb-12">
        <h2>{heading}</h2>
        <p className="mt-4 text-center py-3 max-w-[75%] mx-auto ">
          {subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Stats */}
        <div className="bg-[#042C21] text-white rounded-lg p-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-full lg:max-w-[570px] h-auto md:h-[432px]">
          {stats?.map((stat, index) => {
            const skipCounter = String(stat.value).includes("/"); // e.g., "24/7"
            return (
              <div
                key={index}
                className="bg-[#FFFFFF]/10 m-auto w-full max-w-full lg:max-w-[252px] h-[105px] gap-2 flex flex-col items-start justify-center
                border border-solid [border-image-source:linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.09)_100%)] [border-image-slice:1] rounded-md text-left px-4 py-3 hover:bg-[#1f4d40] transition-colors"
              >
                <span className="text-2xl md:text-3xl font-bold">
                  {skipCounter ? (
                    stat.value
                  ) : (
                    <CounterValue value={stat.value} />
                  )}
                </span>
                <p className="text- Sumana">{stat.label}</p>
              </div>
            );
          })}

          {/* Award block */}
          <div className="sm:col-span-2 mt-4 text-center">
            <h2 className="subheading-4 !text-white ">
              Award-Winning Excellence
            </h2>
            <p className="mt-3 !text-[16px] opacity-90">
              Recognized by industry leaders for innovation and quality.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-8">
          {features?.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex items-start gap-4">
              
                {Icon ? (
                  <div
                   className={`
                      flex-shrink-0 w-14 h-14 rounded-full 
                      flex items-center justify-center 
                      text-white 
                      ${item.iconBgColor || 'bg-gray-400'}
                    `}
                  >
                   
                    <Icon className="w-7 h-7" />
                  </div>
                ) : (
                 
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gray-100" />
                )}

                <div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="mt-1 text-gray-700">{item.description}</p>
                  <p className="mt-1 italic textbluenew py-1">
                    {item.highlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}