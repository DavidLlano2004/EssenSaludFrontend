import { motion } from "framer-motion";
import { useRef } from "react";
import { Icons } from "../../../assets/icons/IconsProvider";
import { ButtonTypeA } from "../buttons/ButtonTypeA";
import { useClickOutside } from "../../../hooks/useClickOutside";
const { IconLogoutWhite } = Icons;

export const MenuFloat = ({
  options,
  signOutAppAction,
  setActiveMenu,
  dataProfile
}) => {
  const handleClickOutside = () => {
    setActiveMenu(null);
  };
  const modalRef = useRef(null);
  useClickOutside([modalRef], handleClickOutside);
  return (
    <motion.div
      ref={modalRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="absolute top-[70px] right-4 mt-2 w-[282px] h-auto bg-white shadow-2xl rounded-lg z-50 border border-gray-light-custom"
    >
      <div className="py-4 px-5 border-b border-gray-light-custom">
        <h1 className="font-semibold text-base text-black-custom">
          {dataProfile?.nameUser}
        </h1>
        <p className="text-sm mt-3 text-black-custom">
          {dataProfile?.email}
        </p>
      </div>
      {/* <ul className="p-7 text-start">
        {options.map((option, index) => (
          <button
            key={index}
            className={` w-full ${index == 1 && "flex"} ${
              index === 1 && "md:hidden"
            } flex py-2 px-4 hover:bg-[#d8d9dd] rounded-lg transition duration-200 ease-in cursor-pointer text-[#282828] text-sm  items-center gap-3 font-medium`}
            onClick={option?.handleClick} // Cerrar el menú al hacer clic en una opción
          >
            <img className="w-4" src={option?.img} alt="" />
            {option?.title}
          </button>
        ))}
      </ul> */}
      <div className="py-4 px-5 border-t border-gray-light-custom">
        <ButtonTypeA
          submitBtn={false}
          text="Cerrar sesión"
          bgColor="bg-red-custom"
          txColor="text-white"
          bdWidth="0px"
          bgHvColor="hover:bg-red-custom-hover"
          width="w-full"
          alternativeStyle="flex items-center justify-center gap-2 text-[14px] cursor-pointer"
          heigthButton={"h-[40px]"}
          action={signOutAppAction}
          img={IconLogoutWhite}
          imgStyles={"w-4"}
        />
      </div>
    </motion.div>
  );
};
