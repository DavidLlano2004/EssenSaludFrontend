import React from "react";
import { ButtonTypeA } from "../../molecules/buttons/ButtonTypeA";
import { Icons } from "../../../assets/icons/IconsProvider";
import { useFormattedPrice } from "../../../hooks/useFormattedPrice";
import { motion } from "framer-motion";
const { IconCheckGreen, IconCheckWhite, IconDeleteWhite } = Icons;

export const CardHealthyPlan = ({
  actionButton,
  namePlan,
  description = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur mollitia.",
  price,
  middle = false,
  choosePlan = false,
  checkPlan,
}) => {
  const priceFormatted = useFormattedPrice(price);
  return (
    <div
      className={`relative flex-1 rounded-2xl shadow-lg overflow-hidden border-2 ${
        choosePlan ? " border-secondary" : "border-transparent"
      }`}
    >
      {/* Gradiente superior */}
      {middle && (
        <div className="absolute z-10 top-0 left-0 w-full h-[180px] bg-gradient-to-b from-[#2F80ED] to-transparent rounded-t-2xl" />
      )}

      {/* Contenido de la card */}
      <div className="relative bg-white rounded-2xl p-8 flex flex-col h-full">
        <h2
          className={` font-bold text-lg z-20 ${
            middle ? "text-white-custom" : "text-black-custom"
          }`}
        >
          {namePlan}
        </h2>
        <div className="min-h-[100px] z-20">
          <p className="text-black-custom">{description}</p>
        </div>
        <div className="sm:mt-0 mt-6">
          <p className="sm:text-[40px] text-[36px] font-semibold text-black-custom ">
            $ {priceFormatted}
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <ButtonTypeA
            action={actionButton}
            text={choosePlan ? "Plan escogido" : "Escoger"}
            bgColor="bg-primary"
            txColor="text-white"
            bdWidth="0px"
            bgHvColor={!choosePlan && "hover:bg-primary-hover"}
            width="w-full"
            alternativeStyle={`flex items-center justify-center gap-2 xl:text-base text-[14px] ${
              !choosePlan && "cursor-pointer"
            } `}
            paddingButton="0 20px"
            heigthButton={"h-[45px]"}
            imgStyles={"w-[18px]"}
            img={choosePlan ? IconCheckWhite : null}
            imgAnimated={true}
            checkPlan={checkPlan}
          />
          {/* {choosePlan && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ButtonTypeA
                action={actionButton}
                text={"Eliminar plan"}
                bgColor="bg-red-custom"
                txColor="text-white"
                bdWidth="0px"
                bgHvColor="hover:bg-red-custom-hover"
                width="w-full"
                alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer"
                paddingButton="0 20px"
                heigthButton={"h-[45px]"}
                imgStyles={"w-[16px]"}
                img={IconDeleteWhite}
              />
            </motion.div>
          )} */}
        </div>
        <div className="h-[2px] w-full bg-[#E6EFF5] my-6"></div>
        <div className="flex-1 flex flex-col">
          <p className=" font-semibold text-black-custom">Que incluye:</p>
          <div className="mt-3 flex-1 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img className="w-7" src={IconCheckGreen} alt="" />
              <p className="text-black-custom">Lorem, ipsum dolor.</p>
            </div>
            <div className="flex items-center gap-3">
              <img className="w-7" src={IconCheckGreen} alt="" />
              <p className="text-black-custom">Lorem, ipsum dolor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
