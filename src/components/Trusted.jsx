
"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { ChevronLeft, ChevronRight } from "lucide-react";

const trustedLogos = [
  { id: "stay-1", src: "/assets/img/logo-staylearning.png", alt: "Stay Learning" },
  { id: "emax-1", src: "/assets/img/logo-emax.png", alt: "E-Max" },
  { id: "sol-1",  src: "/assets/img/logo-solutions.png", alt: "Solutions" },
  { id: "res-1",  src: "/assets/img/logo-resource.png", alt: "Resource Centre" },
  { id: "pra-1",  src: "/assets/img/logo-prakash.png", alt: "Prakash" },
  { id: "stay-2", src: "/assets/img/logo-staylearning.png", alt: "Stay Learning" },
  { id: "emax-2", src: "/assets/img/logo-emax.png", alt: "E-Max" },
  { id: "sol-2",  src: "/assets/img/logo-solutions.png", alt: "Solutions" },
  { id: "res-2",  src: "/assets/img/logo-resource.png", alt: "Resource Centre" },
  { id: "pra-3",  src: "/assets/img/logo-prakash.png", alt: "Prakash" },
 { id: "stay-3", src: "/assets/img/logo-staylearning.png", alt: "Stay Learning" },
  { id: "emax-3", src: "/assets/img/logo-emax.png", alt: "E-Max" },
  { id: "sol-3",  src: "/assets/img/logo-solutions.png", alt: "Solutions" },
  { id: "res-3",  src: "/assets/img/logo-resource.png", alt: "Resource Centre" },
];

export default function TrustedSection({
  titlecolor,
  subtitlecolor,
  bgcolorchange,
  logobgchange,
  title = "Our Clients",
  subtitle = "Empowering Your Success, Every Step of the Way.",
}) {
  return (
    <section className={`${bgcolorchange || ""} py-16 px-6`}>
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className={`${titlecolor || ""} mb-4`}>{title}</h2>
          <p className={`${subtitlecolor || ""}`}>{subtitle}</p>
        </div>

        {/* Carousel with oval/coverflow look */}
        <div
          className={`relative ${logobgchange ? logobgchange : ""} px-6 md:px-10`}
        >
          {/* Prev/Next buttons (optional; enable navigation prop below) */}
          {/* <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white">
            <ChevronLeft size={18} />
          </button>
          <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white">
            <ChevronRight size={18} />
          </button> */}

          {/* edge fades so sides look tucked in */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-14 " />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-14 " />

          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            centeredSlides
            slidesPerView={"auto"}
            loop
            loopAdditionalSlides={4}
            // turn on to use the buttons above:
            navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
            autoplay={{
              delay: 2000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            speed={900}
            coverflowEffect={{
              rotate: 0,          // no rotation
              stretch: 0,         // no horizontal stretch
              depth: 120,         // how far the center pops forward
              modifier: 1.1,      // intensity
              slideShadows: false // keep logos crisp
            }}
            className="!overflow-hidden" 
          >
            {trustedLogos.map((logo) => (
              <SwiperSlide
                key={logo.id}
                className="!w-[220px] sm:!w-[240px] md:!w-[260px] lg:!w-[280px]"
              >
                <div className="mx-auto flex h-[120px] w-full items-center justify-center rounded-xl  ">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={220}
                    height={120}
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
