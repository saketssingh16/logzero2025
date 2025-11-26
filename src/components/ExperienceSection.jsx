import Image from "next/image";

export default function ExperienceSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-black mb-12">
          We Engineer Experiences, Not Just Websites
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-[2px] rounded-lg bg-[linear-gradient(178.97deg,#9DFEE5_0.99%,#FFFFFF_99.25%)] shadow-md">
            <div className="flex flex-col justify-between h-full rounded-lg p-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-full text-white mb-4">
                <Image
                  src="/assets/icons/uiux.svg"
                  alt="icon"
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                UI/UX Design that Boosts Conversions by up to 58%
              </h3>
              <p className="text-gray-600 text-base">
                Built using insights, user psychology, and behavioral design
                principles that guide users toward key actions while creating
                memorable brand experiences.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-[2px] rounded-lg bg-[linear-gradient(178.97deg,#9DFEE5_0.99%,#FFFFFF_99.25%)] shadow-md">
            <div className="flex flex-col justify-between h-full rounded-lg p-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-500 text-white mb-4">
                <Image
                  src="/assets/icons/fsd.svg"
                  alt="icon"
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                Full Stack Development
              </h3>
              <p className="text-gray-600 text-base">
                Frontend, backend, and DevOps—all covered by elite developers
                who write clean, maintainable code and build scalable
                architectures that grow with your business.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-[2px] rounded-lg bg-[linear-gradient(178.97deg,#9DFEE5_0.99%,#FFFFFF_99.25%)] shadow-md">
            <div className="flex flex-col justify-between h-full rounded-lg p-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-500 text-white mb-4">
                <Image
                  src="/assets/icons/tech.svg"
                  alt="icon"
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                Tech Technologies We Use
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Angular",
                  "Node.js",
                  "Laravel",
                  "AWS",
                  "WordPress",
                  "Next.js",
                  "Figma",
                  "Docker",
                  "Stripe",
                  "Tailwind",
                  "+more",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full border border-teal-500 text-sm text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
