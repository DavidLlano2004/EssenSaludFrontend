import React from "react";
import { CustomSelect } from "../../molecules/select/SelectSimple";
import { Icons } from "../../../assets/icons/IconsProvider";
import { InputSimple } from "../../molecules/inputs/InputSimple";
import { ButtonTypeA } from "../../molecules/buttons/ButtonTypeA";
const {
  IconUser,
  IconDoctorGrayDark,
  IconHealthyCentersGrayDark,
  IconCalendarGray,
  IconCalendarTimeGray,
} = Icons;

const FormUpdateAppointment = ({
  buttonLoading,
  control,
  affiliatesData,
  errors,
  register,
  actionBtnCancel,
  healthyCentersData,
  professionalsData,
  dataForm,
  dataUpdate,
}) => {
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
          placeholder="Fecha cita"
          defaultValue={dataUpdate?.date}
        />
        <InputSimple
          errors={errors}
          inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
          iconInput={IconCalendarTimeGray}
          nameRegister={"time"}
          type="time"
          register={register}
          placeholder="Fecha cita"
          defaultValue={dataUpdate?.time}
        />
      </div>
      <CustomSelect
        control={control}
        name="affiliateId"
        staticData={affiliatesData}
        placeholder="Paciente"
        keyOption="label"
        styleLabel="xl:text-base text-sm flex justify-between"
        iconSelect={IconUser}
        iconSelectStyle="w-5 h-5"
        keyLabel={"name"}
        keyValue={"userId"}
        defaultValue={{
          label: dataUpdate?.infoAffiliate?.user?.name,
          value: dataUpdate?.infoAffiliate?.userId,
        }}
      />
      <CustomSelect
        control={control}
        name="healthyCenterId"
        staticData={healthyCentersData}
        placeholder="Centro médico"
        keyOption="label"
        styleLabel="xl:text-base text-sm flex justify-between"
        iconSelect={IconHealthyCentersGrayDark}
        iconSelectStyle="w-5 h-5"
        keyLabel={"name"}
        keyValue={"id"}
        defaultValue={{
          label: dataUpdate?.infoHealthyCenter?.name,
          value: dataUpdate?.infoHealthyCenter?.id,
        }}
      />
      <CustomSelect
        control={control}
        name="professionalId"
        staticData={professionalsData}
        placeholder="Médico"
        keyOption="label"
        styleLabel="xl:text-base text-sm flex justify-between"
        iconSelect={IconDoctorGrayDark}
        iconSelectStyle="w-5 h-5"
        disabled={dataUpdate === null ? !dataForm?.healthyCenterId : false}
        keyLabel={"name"}
        keyValue={"userId"}
        defaultValue={{
          label: dataUpdate?.infoProfessional?.user?.name,
          value: dataUpdate?.infoProfessional?.userId,
        }}
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
    </>
  );
};

export default FormUpdateAppointment;
