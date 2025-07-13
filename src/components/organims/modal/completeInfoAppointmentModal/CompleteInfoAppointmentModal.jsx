import React from "react";
import { TextareaInputSimple } from "../../../molecules/textarea/TextareaInputSimple";
import { useForm } from "react-hook-form";
import { ButtonTypeA } from "../../../molecules/buttons/ButtonTypeA";

export const CompleteInfoAppointmentModal = ({ actionBtnCancel }) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <div className="mt-4 flex flex-col gap-4">
      <TextareaInputSimple
        idTextarea={"inputBarrierScenary-3"}
        errors={errors}
        placeholder="Escribe..."
        label="Síntomas"
        nameRegister="barrier_3"
        register={register}
        validations={{
          required: "La descripción es requerido",
          maxLength: {
            value: 1100,
            message: "Se requiere un minimo de 200 palabras",
          },
        }}
        styLabel="text-sm xl:text-base text-black-custom mb-3 font-medium"
      />
      <TextareaInputSimple
        idTextarea={"inputBarrierScenary-3"}
        errors={errors}
        placeholder="Escribe..."
        label="Tratamiento"
        nameRegister="barrier_3"
        register={register}
        validations={{
          required: "La descripción es requerido",
          maxLength: {
            value: 1100,
            message: "Se requiere un minimo de 200 palabras",
          },
        }}
        styLabel="text-sm xl:text-base text-black-custom mb-3 font-medium"
      />
      <TextareaInputSimple
        idTextarea={"inputBarrierScenary-3"}
        errors={errors}
        placeholder="Escribe..."
        label="Medicamentos"
        nameRegister="barrier_3"
        register={register}
        validations={{
          required: "La descripción es requerido",
          maxLength: {
            value: 1100,
            message: "Se requiere un minimo de 200 palabras",
          },
        }}
        styLabel="text-sm xl:text-base text-black-custom mb-3 font-medium"
      />
      <div className="flex gap-3">
        <ButtonTypeA
          action={actionBtnCancel}
          text="Cancelar"
          bgColor="bg-white"
          txColor="text-primary"
          bdWidth="1px"
          bgHvColor="hover:bg-[#e9e9e9]"
          width="w-full"
          alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer"
          paddingButton="0 20px"
          heigthButton={"h-[45px]"}
        />
        <ButtonTypeA
          // submitBtn={true}
          text="Completar"
          bgColor="bg-primary"
          txColor="text-white"
          bdWidth="0px"
          bgHvColor="hover:bg-primary-hover"
          width="w-full"
          alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer"
          paddingButton="0 20px"
          heigthButton={"h-[45px]"}
          // loading={buttonLoading}
        />
      </div>
    </div>
  );
};
