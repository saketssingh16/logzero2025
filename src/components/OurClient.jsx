import Image from "next/image";

const defaultLogos = [
  { id: 1, src: "/assets/img/logo-staylearning.png", alt: "Stay Learning" },
  { id: 2, src: "/assets/img/logo-emax.png", alt: "Company 2" },
  { id: 3, src: "/assets/img/logo-solutions.png", alt: "Solutions" },
  { id: 4, src: "/assets/img/logo-prakash.png", alt: "Prakash" },
  { id: 5, src: "/assets/img/logo-resource.png", alt: "Resource Centre" },
];

export function Trusted({ logos = defaultLogos }) {
  return (
    <section className="bg-[#FFFFFF] py-10">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-8 text-black">
          <h4 className="text-[24px] md:text-[28px] font-normal leading-[1.4] text-center text-black mb-2">
            Our Client
          </h4>
          <p className="text-base opacity-85">
            Empowering Your Success, Every Step of the Way.
          </p>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3
        justify-items-center"
        >
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="bg-white rounded-[10px] flex items-center justify-center h-36 w-full max-w-[230px] p-4 shadow-sm"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={100}
                className="max-w-[85%] max-h-[75%] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Process() {
  return (
    <section className="w-full bg-white flex justify-center py-10">
         <div className="w-full max-w-[1200px] px-4">
     <Image
        src="/assets/img/Group 125.svg"
        alt="Development Process"
        width={1200.14}
        height={680}
        className="opacity-100"
        priority
      />
      </div>
    </section>
  );
}
