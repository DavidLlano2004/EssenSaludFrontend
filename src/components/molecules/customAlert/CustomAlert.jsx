import React from "react";
// import { Icons } from "../../../assets/Icons/IconProvider";

// const { IconAlertWhite } = Icons;

export const CustomAlert = ({
    height = "28px",
    idAlert,
    maxChars = 60,
    message,
    textColor = "text-white",
    type = "error",
    fullWidth = false,
}) => {

    let containerStyle = {
        success: "bg-[#6FCF97]",
        error: "bg-[#EB5757]",
        warning: "bg-[#F2C94C]",
        info: "bg-[#2F80ED]",
    }

    const truncatedMessage = maxChars ? message.substring(0, maxChars) : message

    return (
        <div id={idAlert} className={`${containerStyle[type]} rounded h-[${height}] ${fullWidth ? "w-full" : "w-fit"} flex items-center mt-2 whitespace-normal p-1 border-[#EF443E] border-0.5`}>
            {/* <img className="w-[15px]" src={IconAlertWhite} alt="Icono de alerta" /> */}
            <p className={`ml-1 ${textColor} text-left text-sm leading-5 tracking-tighter opacity-100`}>
                {truncatedMessage}
            </p>
        </div>
    )
}
