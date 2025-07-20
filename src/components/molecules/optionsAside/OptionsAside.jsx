import React from "react";

export const OptionsAside = ({
  text,
  img,
  action = () => {},
  isRelatedRoute,
}) => {
  return (
    <button
      onClick={action}
      className={` bntOptionAside group h-[45px] flex ${isRelatedRoute ? "" : "cursor-pointer"}  w-full`}
    >
      <div
        className={`w-[6px] full  transition-all duration-150 ease-in  rounded-tr-[6px] rounded-br-[6px] ${isRelatedRoute ? "bg-primary" : "group-hover:bg-primary bg-transparent"}`}
      ></div>
      <div className={`flex-1 flex items-center pl-5 transition-all duration-150 ease-in gap-4  ${isRelatedRoute ? "" : "group-hover:bg-[#00000009]"}`}>
        <img className="w-[18px] h-[18px]" src={img} alt="" />
        <h1
          className={`${
            isRelatedRoute ? "text-primary" : "text-gray-dark-custom "
          } text-[15px] font-medium transition-all duration-150 ease-in`}
        >
          {text}
        </h1>
      </div>
    </button>
  );
};
