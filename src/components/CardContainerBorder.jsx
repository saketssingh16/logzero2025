import Link from "next/link";

export default function CardContainerBorder({ 
  carddata, 
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
  mxauto 
}) {

  // Reusable inner content template for cleaner rendering structures
  const CardInnerContent = () => (
    <>
      {carddata.icon && (
        <div className={`w-11 h-11 p-2 ${IconbgColor} ${roundcorner} flex items-center justify-center ${mxauto ? "mx-auto" : ""}`}>
          {carddata.icon}
        </div>
      )}

      {carddata.title && (
        <h3 className="text-gray-900 dark:text-white font-semibold">{carddata.title}</h3>
      )}

      {carddata.description && (
        <p className={`subtext subtextcolor !mb-0 ${desminheight} ${lineclamp}`}>{carddata.description}</p>
      )}            

      {carddata.featurestext && (
        <div className="bg-[#F0F4FC] rounded-[4px] pt-2 pb-2 pl-[10px] pr-[10px] fopensans text-[15px] font-semibold leading-[20px] text-[#3D3333] mt-auto">
          {carddata.featurestext}
        </div>
      )}
    </>
  );

  const containerClasses = `flex flex-col gap-5 h-full ${bgadd} ${borderadd} ${bordercolor} ${maincartrounded} ${shadowadd} p-5 m-0 transition-all duration-300 ease-in-out hover:scale-104 block ${carddata.link ? "cursor-pointer hover:border-blue-400" : ""}`;

  // Direct conditional layout container routing setup
  if (carddata.link) {
    return (
      <Link href={carddata.link} className={containerClasses} key={index}>
        <CardInnerContent />
      </Link>
    );
  }

  return (
    <div className={containerClasses} key={index}>
      <CardInnerContent />
    </div>
  );
}