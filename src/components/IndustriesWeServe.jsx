"use client";
import Image from "next/image";

const Industries = ({ title, industries }) => {
  return (
    <section className="py-20 bg-white text-center">
      <div className="mb-12">
        <h2 className="text-gray-900 mb-4">
          {title || "Industries We Serve"}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {industries.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-red-50 to-white rounded-lg shadow-sm border
             border-gray-200 p-6 flex flex-col"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={40}
              height={40}
              className="mb-4"
            />
            <h3 className="text-gray-900 mb-2 text-left">{item.title}</h3>
            <p className="text-gray-600 leading-normal text-left">{item.desc}</p>

            <div className="mt-auto pt-4">
              <button className="w-full bg-white text-[#27A483] px-2 py-2 rounded-lg text-left">
                Learn more &gt;
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Industries;
