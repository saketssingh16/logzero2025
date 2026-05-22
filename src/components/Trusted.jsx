"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const trustedLogos = [
  {
    id: "stay-1",
    src: "/assets/img/logo-staylearning.webp",
    alt: "Stay Learning",
  },
  { id: "emax-1", src: "/assets/img/logo-emax.webp", alt: "E-Max" },
  { id: "sol-1", src: "/assets/img/logo-solutions.webp", alt: "Solutions" },
  { id: "res-1", src: "/assets/img/logo-resource.webp", alt: "Resource Centre" },
  { id: "pra-1", src: "/assets/img/logo-prakash.webp", alt: "Prakash" },
  {
    id: "stay-2",
    src: "/assets/img/logo-staylearning.webp",
    alt: "Stay Learning",
  },
  { id: "emax-2", src: "/assets/img/logo-emax.webp", alt: "E-Max" },
  { id: "sol-2", src: "/assets/img/logo-solutions.webp", alt: "Solutions" },
  { id: "res-2", src: "/assets/img/logo-resource.webp", alt: "Resource Centre" },
  { id: "pra-3", src: "/assets/img/logo-prakash.webp", alt: "Prakash" },
  {
    id: "stay-3",
    src: "/assets/img/logo-staylearning.webp",
    alt: "Stay Learning",
  },
  { id: "emax-3", src: "/assets/img/logo-emax.webp", alt: "E-Max" },
  { id: "sol-3", src: "/assets/img/logo-solutions.webp", alt: "Solutions" },
  { id: "res-3", src: "/assets/img/logo-resource.webp", alt: "Resource Centre" },
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

        {/* Carousel */}
        <div className={`relative ${logobgchange ? logobgchange : ""}`}>
          {/* Edge fades */}
          {/* <div className="pointer-events-none absolute left-0 top-0 h-full w-14 z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-14 z-10" /> */}

          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            centeredSlides
            slidesPerView={"auto"}
            loop
            loopAdditionalSlides={4}
            autoplay={{
              delay: 2000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            speed={900}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            className=" py-10 "
          >
            {trustedLogos.map((logo) => (
              <SwiperSlide
                key={logo.id}
                className="!w-[220px] sm:!w-[240px] md:!w-[260px] lg:!w-[280px] [&.swiper-slide-active_.logo-wrapper]:scale-125"
              >
                <div className="logo-wrapper mx-auto flex h-[120px] w-full items-center justify-center rounded-xl transition-transform duration-500 ease-out origin-center">
                  <div className="bg-white rounded-[10px] py-2 px-[35px] flex items-center justify-center">
                    <div className="w-[150px] h-[120px] flex items-center justify-center">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={160}
                        height={80}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
