"use client";
import {
  Award,
  ChevronRight,
  Eye,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CounterNo from "./CounterNo";

export default function SuccessStory({
  title,
  subtitle,
  Resultstext,
  link,
  caseStudies = [],
}) {
  return (
    <>
      {/* Title + Subtitle */}
      <div className="text-center  mb-12">
        <h2 className="mb-5 !text-[32px] !font-bold">{title}</h2>
        <p className="max-w-full md:max-w-[65%] mx-auto">{subtitle}</p>
      </div>

      {/* Case Studies */}
      {caseStudies.map((study, index) => (
        <div
          key={index}
          className={`flex flex-col-reverse md:flex-row items-center gap-10 ${
            index === caseStudies.length - 1 ? "mb-0" : "mb-16"
          } ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
        >
          {/* Image */}
          <div className="w-full md:w-[50%] max-w-[564px]">
            <Image
              src={study.image}
              alt={study.title}
              width={study.width}
              height={study.height}
              className="rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:translate-y-[-5px]"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-[50%]">
            <div className="mb-3 text-[24px] leading-[30px] font-semibold text-gray-900 foutfit">
              {study.title}
            </div>
            <p className="md:text-base subheading-2 textbluenew">
              {study.subtitle}
            </p>

            {/* Challenge & Solution */}
            <div className="space-y-4 text-sm mt-9">
              <div className="subheading-2 text-gray-800">Challenge</div>
              <p className="subtext subtextcolor">{study.challenge}</p>

              <div className="subheading-2 mt-5 text-gray-800">Solution</div>
              <p className="subtext subtextcolor">{study.solution}</p>
            </div>

            {/* Results */}
            <div className="my-6">
              <p className="mb-3 subheading-2 text-gray-800">Results</p>
              <p className="subtext subtextcolor">{study.Resultstext}</p>

              {/* <div className="flex flex-wrap sm:flex-nowrap gap-y-6 gap-x-10 mt-5 justify-between sm:justify-start"> 

                   <CounterNo
                    nostats={[
                      { 
                        icon: <Users className="text-[#5BC2A7]" />,                        
                        Novalue: 50, 
                        indicator:"K+",
                        label: "Active Users" 
                      },

                      { 
                        icon: <TrendingUp className="text-[#5BC2A7]" />,                        
                        Novalue: 300,
                        indicator:"%", 
                        label: "Order Increase" 
                      },

                      { 
                        icon: <Star className="text-[#5BC2A7]" />,                        
                        Novalue: 4.5, 
                        label: "App Store Rating" 
                      },
                    ]}
                  />  */}

              {/* {study.results.map((res, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-center gap-2 sm:w-auto"
                    >
                      <Image  
                        src={res.icon}
                        alt={res.label}
                        width={60}
                        height={60}
                        className="mb-2"
                      />                      
                      <h4 className="font-semibold textblue7 !text-[24px]">
                        {res.value}
                      </h4>
                      <p className="subtext subtextcolor">{res.label}</p>
                    </div>
                  ))}  */}

              {/* </div>  */}
            </div>

            {/* Technologies */}
            <div className="mt-8">
              <p className="subheading-2 text-gray-800">Technologies Used</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {study.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="py-[6px] px-[14px] border rounded-full text-[13px] whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Link */}
            <div className="mt-8">
              <Link
                href={study.link}
                target="_blank"
                className="subheading-3 textbluenew inline-flex items-center gap-1 transition-transform duration-300 ease-in-out hover:translate-x-[5px] hover:!text-[#1F1F1F]"
              >
                Read Full Case Study <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
