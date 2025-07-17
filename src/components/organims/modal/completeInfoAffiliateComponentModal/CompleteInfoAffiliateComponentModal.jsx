import React, { useState } from "react";
import { InputSimple } from "../../../molecules/inputs/InputSimple";
import { useForm } from "react-hook-form";
import { Icons } from "../../../../assets/icons/IconsProvider";
import { CustomSelect } from "../../../molecules/select/SelectSimple";
import { ButtonTypeA } from "../../../molecules/buttons/ButtonTypeA";
import { useAffiliate } from "../../../../hooks/useAffiliates.hooks";
import { useSelector } from "react-redux";
const { IconDocumentType, IconLocationGray, IconPhoneGrayDark } = Icons;

export const CompleteInfoAffiliateComponentModal = ({
  toast,
  setValidateInfoAffiliate,
}) => {
  const { userId } = useSelector((state) => state.auth);
  const { createAffiliateFunction } = useAffiliate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const {
    formState: { errors },
    register,
    control,
    watch,
    handleSubmit,
    reset,
  } = useForm();
  const dataForm = watch();
  const documentTypes = [
    {
      value: 1,
      label: "CC",
    },
    {
      value: 2,
      label: "CE",
    },
    {
      value: 3,
      label: "TI",
    },
  ];

  const onStartFunctionCreateHealthyCenter = () => {
    setButtonLoading(true);
  };

  const onSuccessFunctionCreateHealthyCenter = () => {
    toast.success("¡Información completada exitosamente!", { duration: 3000 });
    setButtonLoading(false);
    reset({
      document_type: null,
      document_number: "",
      address: "",
      phone: "",
    });
    setValidateInfoAffiliate(false);
  };

  const onSubmit = () => {
    const newData = {
      userId: userId,
      document_type: dataForm?.document_type?.label,
      document_number: dataForm?.document_number,
      address: dataForm?.address,
      phone: dataForm?.phone,
    };
    createAffiliateFunction({
      dataForm: newData,
      onStart: onStartFunctionCreateHealthyCenter,
      onSuccess: onSuccessFunctionCreateHealthyCenter,
    });
  };

  return (
    <div className="mt-3">
      <div className="sm:w-[80%]">
        <p>Para poder seguir debes de completar información personal.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-6">
          <CustomSelect
            control={control}
            name="document_type"
            staticData={documentTypes}
            rules={{ required: "El tipo de documento es requerido" }}
            placeholder="Tipo de documento"
            keyOption="label"
            styleLabel="xl:text-base text-sm flex justify-between"
            iconSelect={IconDocumentType}
            iconSelectStyle="w-5 h-5"
          />
          <InputSimple
            errors={errors}
            inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
            iconInput={IconDocumentType}
            nameRegister={"document_number"}
            register={register}
            validations={{
              required: "El documento es requerido",
            }}
            placeholder="Documento"
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
        </div>
        <div className="mt-6">
          <ButtonTypeA
            submitBtn={true}
            text="Completar"
            bgColor="bg-primary"
            txColor="text-white"
            bdWidth="0px"
            bgHvColor="hover:bg-primary-hover"
            width="w-full"
            alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer"
            paddingButton="0 20px"
            heigthButton={"h-[45px]"}
            loading={buttonLoading}
          />
        </div>
      </form>
    </div>
  );
};
