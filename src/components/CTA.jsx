import Link from "next/link";

export default function CTA({
  title,
  description,
  linkUrl,
  linkUrl2,
  linkText,
  linkText2,
  ctabtnType,
}) {
  return (
    // <section className="px-6">
    <div className="container bgsecondary text-white text-center rounded-[8px] mx-auto px-6 py-10">
      <h2 className="mb-4 !text-white">{title}</h2>
      <p className="w-full sm:max-w-full md:max-w-[75%] m-auto">
        {description}
      </p>

      <div className="mt-2 flex flex-col sm:flex-row gap-4 justify-center">
        {(ctabtnType === "primary" || ctabtnType === "both") && (
          <Link
            href={linkUrl}
            className="mt-5 inline-block font-inter text-[15px] font-semibold leading-[22px] text-black bluenew  textcolor  !border-[#5BC2A7] px-[24px] py-[17px] rounded-full hover:bg-[#ffffff] hover:text-white hover:shadow-md transition-all duration-300 ease-in-out transition-transform hover:scale-107"
          >
            {linkText}
          </Link>
        )}

        {(ctabtnType === "secondary" || ctabtnType === "both") && (
          <Link
            href={linkUrl2}
            className="mt-5 inline-block font-inter text-[15px] font-semibold leading-[22px] 
             text-black bg-white fill-white 
             border-[1px] border-solid border-white 
             px-[24px] py-[17px] rounded-[50px] 
             transition-all duration-[500ms] ease-in-out 
              hover:text-black hover:shadow-md transition-transform hover:scale-107"
          >
            {linkText2}
          </Link>
        )}
      </div>
    </div>
    // </section>
  );
}
