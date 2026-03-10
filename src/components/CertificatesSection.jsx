"use client";
import Image from "next/image";
import batch1 from "../../public/assets/img/batch1.webp";
import batch2 from "../../public/assets/img/batch2.webp";
import batch3 from "../../public/assets/img/batch3.webp";

export default function CertificatesSection() {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8 text-center">
          <div className="text-center">
            <div className="flex items-center justify-center mx-auto">
              <Image src={batch1} alt="11+ years of experience" />
            </div>
            <h4 className="mt-3">11+ Years Experience</h4>
            <p className="mt-2 subtext subtextcolor px-4">
              Delivering exceptional IT solutions since 2014 to drive business
              growth through reliable development, innovation, and expert support.
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mx-auto">
              <Image src={batch2} alt="ISO 9001 and 27001 Certified" />
            </div>
            <h4 className="mt-3">ISO 9001 and 27001 Certified</h4>
            <p className="mt-2 subtext subtextcolor px-4">
              Quality and information security certified, ensuring secure and
              consistent delivery.
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mx-auto">
              <Image src={batch3} alt="DesignRush recognition" />
            </div>
            <h4 className="mt-3">Industry Recognition</h4>
            <p className="mt-2 subtext subtextcolor px-4">
              Proudly recognized by DesignRush as one of the Top Web Development
              Companies (2025).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
