"use client";
import Link from "next/link";
import { MoveRight, Send } from "lucide-react";

function GreenButton({ linkurl, text, linktarget, MoveRighticon, send }) {
    return (
        <Link
            href={linkurl}
            target={linktarget}
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-[15px] font-semibold leading-[22px] text-white bg-[#1E8767] border !border-[var(--bg-blue-700)] rounded-[6px] px-[35px] xl:px-[35px] lg:px-[28px] py-[17px] font-[var(--font-inter)] transition duration-300 ease-in-out hover:bg-[#1E8767] hover:text-white transition-transform hover:scale-104"
            >
            {send && (
                <Send width={20}/>
            )}
            {text}

            {MoveRighticon && (
                <span>       
                <MoveRight width={20} />
                </span>
            )}
        </Link>
    )
}

export default GreenButton;