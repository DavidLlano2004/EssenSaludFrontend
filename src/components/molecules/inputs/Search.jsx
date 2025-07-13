import React from "react";
import { Icons } from "../../../assets/icons/IconsProvider";
const { IconSearchGray } = Icons;

export const Search = ({ textSearch = "Buscar pacientes" }) => {
  return (
    <div className="relative xl:w-[95%] sm:w-[50%]">
      <h1 className=" font-medium text-lg mb-1 text-black-custom">{textSearch}</h1>
      <input
        className=" outline-0 border border-gray-light-custom w-full bg-white py-[6px] px-3 rounded-xl"
        type="text"
      />
      <img className="w-4 absolute bottom-[11px] right-3" src={IconSearchGray} alt="" />
    </div>
  );
};
