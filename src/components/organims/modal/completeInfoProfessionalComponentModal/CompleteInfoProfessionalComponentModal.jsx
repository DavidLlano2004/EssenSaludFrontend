import React, { useEffect, useState } from "react";
import { InputSimple } from "../../../molecules/inputs/InputSimple";
import { useForm } from "react-hook-form";
import { Icons } from "../../../../assets/icons/IconsProvider";
import { CustomSelect } from "../../../molecules/select/SelectSimple";
import { ButtonTypeA } from "../../../molecules/buttons/ButtonTypeA";
import { useSelector } from "react-redux";
import { useHealthyCenter } from "../../../../hooks/useHealthyCenter.hooks";
import { useProfessional } from "../../../../hooks/useProfessional.hooks";
const { IconDocumentType, IconDoctorGrayDark } = Icons;

export const CompleteInfoProfessionalComponentModal = ({
  setValidateInfoProfesional,
  toast,
}) => {
  const { getAllHealthyCentersFunction } = useHealthyCenter();
  const { createProfessionalFunction } = useProfessional();
  const { userId } = useSelector((state) => state.auth);
  const { healthyCenters } = useSelector((state) => state.healthyCenter);
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

  const onStartFunctionCreateProfessional = () => {
    setButtonLoading(true);
  };

  const onSuccessFunctionCreateProfessional = () => {
    toast.success("¡Información completada exitosamente!", { duration: 3000 });
    setButtonLoading(false);
    reset({
      specialty: "",
      license_number: "",
      centerId: null,
    });
    setValidateInfoProfesional(false);
  };

  const onSubmit = () => {
    const newData = {
      userId: userId,
      specialty: dataForm?.specialty,
      license_number: dataForm?.license_number,
      centerId: dataForm?.centerId?.value,
    };
    createProfessionalFunction({
      dataForm: newData,
      onStart: onStartFunctionCreateProfessional,
      onSuccess: onSuccessFunctionCreateProfessional,
    });
  };

  useEffect(() => {
    getAllHealthyCentersFunction();
  }, []);

  return (
    <div className="mt-3">
      <div className="sm:w-[80%]">
        <p>Para poder seguir debes de completar información personal.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="grid grid-cols-1 gap-4 mt-6">
          <InputSimple
            errors={errors}
            inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
            iconInput={IconDoctorGrayDark}
            nameRegister={"specialty"}
            register={register}
            validations={{
              required: "La especialidad es requerida",
            }}
            placeholder="Especialidad"
          />

          <InputSimple
            errors={errors}
            inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
            iconInput={IconDocumentType}
            nameRegister={"license_number"}
            register={register}
            validations={{
              required: "El número de licencia es requerido",
            }}
            placeholder="Número de licencia"
          />

          <CustomSelect
            control={control}
            name="centerId"
            staticData={healthyCenters}
            rules={{ required: "El centro de salud es requerido" }}
            placeholder="Centro de salud"
            keyOption="label"
            styleLabel="xl:text-base text-sm flex justify-between"
            keyLabel={"name"}
            keyValue={"id"}
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
