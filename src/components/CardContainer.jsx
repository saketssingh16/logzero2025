import Link from "next/link";
import Image from "next/image";
import { MoveRight, ChevronRight } from "lucide-react";
import { Check } from "lucide-react";
import GreenButton from "./GreenButton";

export default function CardContainer({
  service,
  index,
  bgadd,
  borderadd,
  bordercolor,
  maincartrounded,
  shadowadd,
  IconbgColor,
  roundcorner,
  desminheight,
  lineclamp,
  ctaType,
  imgheight,
  tchange,
  bgchange,
 
  checkicon,
}) {
  // rounded-[10px]   border-[#E6E6E6]
  return (
    <div
      key={index}
      className={`flex flex-col ${bgadd} ${borderadd} ${bordercolor} ${maincartrounded} ${shadowadd}  m-0 transition-colors duration-300 ease-in-out transition-transform hover:scale-104`}
    >
      {service.cartimage && (
        <div
          className={`cartimage relative w-full overflow-hidden rounded-t-[12px] flex ${
            imgheight ? imgheight : "h-[210px]"
          }`}
        >
          <Image
            src={service.cartimage}
            alt="Hero"
            // fill className="object-cover !h-[175px]"
            width={400}
            height={175}
            className="object-cover w-full"
          />
        </div>
      )}

      <div className="p-5 gap-4 flex flex-col flex-grow">
        {service.icon && (
          <div
            className={`w-11 h-11 p-2 ${IconbgColor} ${roundcorner} flex items-center justify-center`}
          >
            {/* rounded-full */}
            {service.icon}
          </div>
        )}

        {service.title && <h3 className="">{service.title}</h3>}

        {/* min-h-[80px]  line-clamp-3*/}
        {service.description && (
          <p
            className={`subtext subtextcolor ${desminheight} ${lineclamp} !mb-0`}
          >
            {service.description}
          </p>
        )}
        {service.coloreddescription && (
          <p
            className={`subheading-3 mt-auto ${
              service.coloreddescriptioncolor
                ? service.coloreddescriptioncolor
                : "text-[#27A483]"
            }`}
          >
            {service.coloreddescription}
          </p>
        )}

        {service.technologies && (
          <>
            <p className="subheading-3 !mb-0 ptextcolor">Technologies:</p>

            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, i) => (
                <span
                  key={i}
                  className={`px-[10px] py-[5px] text-sm border border-gray-600 rounded-[20px] mb-[2px] ${
                    bgchange ? bgchange : ""
                  } ${tchange ? tchange : ""}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}

        {service.features && (
          <>
            <p className="subheading-3 !mb-0 ptextcolor mt-3">Key Features:</p>

            <ul className="subtext subtextcolor finter">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  {checkicon ? (
                    <Check className="text-[#5BC2A7] w-[20px]" />
                  ) : (
                    <span className="text-lg">•</span>
                  )}
                  {feature}
                </li>
              ))}
            </ul>
          </>
        )} 

        {service.linkurl && (
          <>
            {ctaType === "primary" && (
              <div className="mt-auto pt-4">
                <Link href={service.linkurl} className="greenbtn flex items-center justify-center text-white hover:bg-[#27A483] hover:text-white transition-all duration-300">
                          Read More
                            <span className="pl-[10px]">
                            <MoveRight width={14} height={14} />
                            </span>
                        </Link>

                {/* <GreenButton
                  text="Read more"
                  linkurl="/"
                  linktarget=""
                  MoveRighticon={true}
                  textcolor= ""
                /> */}
              </div>
            )}

            {ctaType === "secondary" && (
              <div className="mt-auto pt-4 border-t border-black/10">
                {/* <GreenButton
                                text="Learn more"
                                linkurl="/"
                                linktarget=""
                                MoveRighticon={true}
                            /> */}

                <Link
                  href={service.linkurl}
                  className="inline-flex items-center font-semibold text-[#1E8767] hover:text-[#1e8c6f] transition-colors duration-200 transition-transform duration-300 ease-in-out hover:translate-x-[5px] hover:!text-[#1F1F1F]"
                >
                Read  more
                  <span className="pl-[9px] text-[14px] font-bold text-[#27A483]">
                    <ChevronRight width={20} height={20} />
                  </span>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
