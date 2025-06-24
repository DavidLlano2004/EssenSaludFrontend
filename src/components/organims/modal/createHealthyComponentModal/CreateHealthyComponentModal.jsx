import React, { useState } from "react";
import { InputSimple } from "../../../molecules/inputs/InputSimple";
import { useForm } from "react-hook-form";
import { Icons } from "../../../../assets/icons/IconsProvider";
import { ButtonTypeA } from "../../../molecules/buttons/ButtonTypeA";
import { useHealthyCenter } from "../../../../hooks/useHealthyCenter.hooks";
const {
  IconHealthyCentersGrayDark,
  IconLocationGray,
  IconPhoneGrayDark,
  IconCityGrayDark,
} = Icons;
export const CreateHealthyComponentModal = ({
  toast,
  setModalCreateHealthyCenter,
  setFlagHelpHealthyCenter,
}) => {
  const { createHealthyCenterFunction } = useHealthyCenter();

  const [buttonLoading, setButtonLoading] = useState(false);
  const {
    formState: { errors },
    register,
    reset,
    watch,
    handleSubmit,
  } = useForm();

  const dataForm = watch();

  const onStartFunctionCreateHealthyCenter = () => {
    setButtonLoading(true);
  };

  const onSuccessFunctionCreateHealthyCenter = () => {
    toast.success("¡Centro creado correctamente!", { duration: 3000 });
    setButtonLoading(false);
    reset({
      name: "",
      address: "",
      phone: "",
      city: "",
    });
    setModalCreateHealthyCenter(false);
    setFlagHelpHealthyCenter((prev) => !prev);
  };

  const onSubmit = () => {
    createHealthyCenterFunction({
      dataForm: dataForm,
      onStart: onStartFunctionCreateHealthyCenter,
      onSuccess: onSuccessFunctionCreateHealthyCenter,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
        <InputSimple
          errors={errors}
          inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
          iconInput={IconHealthyCentersGrayDark}
          nameRegister={"name"}
          register={register}
          validations={{
            required: "El nombre es requerido",
          }}
          placeholder="Nombre"
        />
        <InputSimple
          errors={errors}
          inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
          iconInput={IconLocationGray}
          nameRegister={"address"}
          register={register}
          validations={{
            required: "La dirección es requerida",
          }}
          placeholder="Dirección"
        />
        <InputSimple
          errors={errors}
          inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
          iconInput={IconPhoneGrayDark}
          nameRegister={"phone"}
          register={register}
          validations={{
            required: "El teléfono es requerido",
          }}
          placeholder="Teléfono"
        />
        <InputSimple
          errors={errors}
          inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
          iconInput={IconCityGrayDark}
          nameRegister={"city"}
          register={register}
          validations={{
            required: "La ciudad es requerida",
          }}
          placeholder="Ciudad"
        />
      </div>
        <div className="mt-6">
          <ButtonTypeA
            submitBtn={true}
            text={"Crear centro"}
            bgColor="bg-primary"
            txColor="text-white"
            bdWidth="0px"
            bgHvColor="hover:bg-primary-hover"
            width="w-full"
            alternativeStyle="flex items-center justify-center gap-2 text-base cursor-pointer"
            heigthButton={"xl:h-[50px] h-[43px]"}
            loading={buttonLoading}
          />
        </div>
    </form>
  );
};
