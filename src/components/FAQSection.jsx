import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQSection({
  title = "FAQ's",
  subtitle = "",
  faqs = [],
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const PlusMinusIcon = ({ isOpen }) =>
    isOpen ? (
      <Minus className="w-5 h-5 text-white transition-transform duration-300 flex-shrink-0 cursor-pointer" />
    ) : (
      <Plus className="w-5 h-5 text-white transition-transform duration-300 flex-shrink-0 cursor-pointer" />
    );

  const mid = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, mid);
  const rightFaqs = faqs.slice(mid);

  return (
    <section className="px-6 py-16 bg-white">
      <div className="container mx-auto ">
        <div className="text-center mb-12">
          <h2 className="">{title}</h2>
          {subtitle && <p className="mt-4 text-gray-600">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
          {/* Left column */}
          <div className="space-y-4">
            {leftFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.qId || index}
                  className="border border-gray-700 bgsecondary rounded-lg text-white overflow-hidden transition-all duration-300 hover:border-gray-600"
                >
                  <button
                    className="w-full flex justify-between items-start px-5 py-4 font-medium text-left gap-4 text-white transition-colors"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex-1">{faq.question}</span>
                    <PlusMinusIcon isOpen={isOpen} />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 py-4 subtext text-gray-200 border-t border-gray-700">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {rightFaqs.map((faq, index) => {
              const realIndex = mid + index;
              const isOpen = openIndex === realIndex;

              return (
                <div
                  key={faq.qId || realIndex}
                  className="border border-gray-700 bgsecondary rounded-lg text-white overflow-hidden transition-all duration-300 hover:border-gray-600"
                >
                  <button
                    className="w-full flex justify-between items-start px-5 py-4 font-medium text-left gap-4 text-white transition-colors"
                    onClick={() => toggleFAQ(realIndex)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex-1">{faq.question}</span>
                    <PlusMinusIcon isOpen={isOpen} />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 py-4 subtext text-gray-200 border-t border-gray-700">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
