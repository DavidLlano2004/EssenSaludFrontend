import React from "react";
import { ButtonTypeA } from "../../../molecules/buttons/ButtonTypeA";

export const ValidateModal = ({
  title,
  subtitle,
  actionCancel,
  actionDelete,
  loadingButton,
}) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="sm:text-xl text-lg text-center text-black-custom font-semibold">
        {title}
      </h1>
      <p className="text-center sm:text-base text-sm mt-2">{subtitle}</p>
      <div className="w-full flex mt-8 gap-3 mb-3 ">
        <ButtonTypeA
          action={actionCancel}
          submitBtn={false}
          text="Cancelar"
          bgColor="bg-primary"
          txColor="text-white"
          bdWidth="0px"
          bgHvColor="hover:bg-primary-hover"
          width="w-full"
          alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer font-semibold"
          heigthButton={" h-[40px]"}
          imgStyles={"w-[18px]"}
        />
        <ButtonTypeA
          action={actionDelete}
          submitBtn={false}
          text="Eliminar"
          bgColor="bg-white"
          txColor="text-primary"
          bdWidth="1px"
          bgHvColor="hover:bg-[#e9e9e9]"
          width="w-full"
          alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer font-semibold"
          heigthButton={" h-[40px]"}
          imgStyles={"w-[18px]"}
          buttonSecondary={true}
          loading={loadingButton}
        />
      </div>
    </div>
  );
};
