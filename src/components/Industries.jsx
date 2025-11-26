"use client";
import Image from "next/image";

const industries = [
  {
    icon: "/assets/icons/healthcareIcon.png",
    title: "Healthcare",
    desc: "HIPAA-compliant solutions for hospitals, clinics, and healthcare providers",
  },
  {
    icon: "/assets/icons/financeIcon.png",
    title: "Finance & Banking",
    desc: "Secure fintech solutions with advanced encryption and compliance",
  },
  {
    icon: "/assets/icons/ecommerceIcon.png",
    title: "E-commerce & Retail",
    desc: "Scalable online stores and inventory management systems",
  },
  {
    icon: "/assets/icons/educationIcon.png",
    title: "Education & E-learning",
    desc: "Interactive learning platforms and educational management systems",
  },
  {
    icon: "/assets/icons/travelIcon.png",
    title: "Travel & Hospitality",
    desc: "Booking systems, property management, and customer experience platforms",
  },
  {
    icon: "/assets/icons/manufacturingIcon.png",
    title: "Manufacturing & Supply Chain",
    desc: "ERP systems, IoT integration, and supply chain optimization",
  },
  {
    icon: "/assets/icons/realestateIcon.png",
    title: "Real Estate & Property",
    desc: "Property management systems and real estate marketplaces",
  },
  {
    icon: "/assets/icons/automotiveIcon.png",
    title: "Automotive",
    desc: "Connected car solutions and automotive management systems",
  },
  {
    icon: "/assets/icons/mediaIcon.png",
    title: "Media & Entertainment",
    desc: "Content management systems and streaming platforms",
  },
  {
    icon: "/assets/icons/nonprofitIcon.png",
    title: "Non-Profit & Government",
    desc: "Citizen service portals and non-profit management systems",
  },
];

export default function Industries() {
  return (
    <section className="py-20 bg-white text-center">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Industries We Serve
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We provide tailored solutions across diverse industries, understanding
          unique challenges and requirements
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4  max-w-6xl mx-4 md:mx-auto">
        {industries.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-red-50 to-white rounded-lg shadow-sm border
             border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-md transition"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={40}
              height={40}
              className="mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
