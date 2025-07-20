import React from "react";
import { CustomSelect } from "../../molecules/select/SelectSimple";
import { Icons } from "../../../assets/icons/IconsProvider";
import { InputSimple } from "../../molecules/inputs/InputSimple";
import { ButtonTypeA } from "../../molecules/buttons/ButtonTypeA";
const {
  IconUser,
  IconDoctorGrayDark,
  IconHealthyCentersGrayDark,
  IconDateInput,
  IconCalendarGray,
  IconCalendarTimeGray,
} = Icons;

const FormCreateAppointment = ({
  buttonLoading,
  control,
  affiliatesData,
  errors,
  register,
  actionBtnCancel,
  healthyCentersData,
  professionalsData,
  dataForm,
}) => {

  console.log('====================================');
  console.log(affiliatesData);
  console.log('====================================');
  return (
    <>
      <div className="flex sm:flex-row flex-col items-center gap-5">
        <InputSimple
          errors={errors}
          inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
          iconInput={IconCalendarGray}
          nameRegister={"date"}
          type="date"
          register={register}
          validations={{
            required: "La fecha es requerida",
          }}
          placeholder="Fecha cita"
        />
        <InputSimple
          errors={errors}
          inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
          iconInput={IconCalendarTimeGray}
          nameRegister={"time"}
          type="time"
          register={register}
          validations={{
            required: "La fecha es requerida",
          }}
          placeholder="Fecha cita"
        />
      </div>
      <CustomSelect
        control={control}
        name="affiliateId"
        staticData={affiliatesData}
        rules={{ required: "El paciente es requerido" }}
        placeholder="Paciente"
        keyOption="label"
        styleLabel="xl:text-base text-sm flex justify-between"
        iconSelect={IconUser}
        iconSelectStyle="w-5 h-5"
        keyLabel={"name"}
        keyValue={"userId"}
      />
      <CustomSelect
        control={control}
        name="healthyCenterId"
        staticData={healthyCentersData}
        rules={{ required: "El centro es requerido" }}
        placeholder="Centro médico"
        keyOption="label"
        styleLabel="xl:text-base text-sm flex justify-between"
        iconSelect={IconHealthyCentersGrayDark}
        iconSelectStyle="w-5 h-5"
        keyLabel={"name"}
        keyValue={"id"}
      />
      <CustomSelect
        control={control}
        name="professionalId"
        staticData={professionalsData}
        rules={{ required: "El médico es requerido" }}
        placeholder="Médico"
        keyOption="label"
        styleLabel="xl:text-base text-sm flex justify-between"
        iconSelect={IconDoctorGrayDark}
        iconSelectStyle="w-5 h-5"
        disabled={!dataForm?.healthyCenterId}
        keyLabel={"name"}
        keyValue={"userId"}
      />

      <div className=" col-span-2 flex sm:flex-row flex-col sm:gap-5 gap-2">
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
          submitBtn={true}
          text="Crear"
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
    </>
  );
};

export default FormCreateAppointment;
