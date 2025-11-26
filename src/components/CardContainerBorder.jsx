import Link from "next/link";


export default function CardContainerBorder({ carddata, index, bgadd, borderadd, bordercolor, maincartrounded, shadowadd, IconbgColor,  roundcorner, desminheight, lineclamp, mxauto }) {

    return (

            <div
            key={index}
            className={`flex flex-col gap-5 h-full ${bgadd} ${borderadd} ${bordercolor} ${maincartrounded} ${shadowadd} p-5 m-0 transition-colors duration-300 ease-in-out transition-transform hover:scale-104`}
            >

            {carddata.icon && (
                <div className={`w-11 h-11 p-2 ${IconbgColor} ${roundcorner} flex items-center justify-center ${mxauto ? "mx-auto" : ""}`}>
                    {carddata.icon}
                </div>
            )}

            {carddata.title && (
                <h3 className="">{carddata.title}</h3>
            )}

            {carddata.description && (
                <p className={`subtext subtextcolor !mb-0 ${desminheight} ${lineclamp}`}>{carddata.description}</p>
            )}
            {/* min-h-[55px] */}            

            {carddata.featurestext && (
                <>
                    <div className="bg-[#F0F4FC] rounded-[4px] pt-2 pb-2 pl-[10px] pr-[10px] fopensans text-[15px] font-semibold leading-[20px] text-[#3D3333] mt-auto">
                         {carddata.featurestext}
                    </div>
                </>
            )}


        </div>
    )

};
