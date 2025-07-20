import React, { useState } from "react";
import { TextareaInputSimple } from "../../../molecules/textarea/TextareaInputSimple";
import { useForm } from "react-hook-form";
import { ButtonTypeA } from "../../../molecules/buttons/ButtonTypeA";
import { useAppointment } from "../../../../hooks/useAppointment.hooks";
import { useMedicalRecord } from "../../../../hooks/useMedicalRecord.hooks";
import { useInvoices } from "../../../../hooks/useInvoices.hooks";

export const CompleteInfoAppointmentModal = ({
  actionBtnCancel,
  toast,
  setDataAppointment,
  setIsOpenModal,
  setFlagHelpAppointment,
  medicalAppointmentId,
  dataAppointment,
}) => {
  const [loadingButton, setLoadingButton] = useState(false);

  const { createMedicalRecordFunction } = useMedicalRecord();
  const { createInvoiceFunction } = useInvoices();

  const {
    register,
    formState: { errors },
    watch,
    reset,
    handleSubmit,
  } = useForm();

  const dataForm = watch();

  const onStartFunctionCreateMedicalRecord = () => {
    setLoadingButton(true);
  };

  const onSuccessFunctionCreateMedicalRecord = () => {
    toast.success("Cita actualizada correctamente!", { duration: 2000 });
    setLoadingButton(false);
    setDataAppointment(null);
    reset();
    actionBtnCancel();
    setIsOpenModal(false);
    setFlagHelpAppointment((prev) => !prev);
  };

  const createMedicalRecordEndAppointmentOnSubmit = () => {
    const dataInvoice = {
      affiliateId: dataAppointment?.affiliateId,
      medicalAppointmentId: medicalAppointmentId,
      cost: dataAppointment?.infoAffiliate?.healthyPlan?.month_cost,
      payment_status: "Pendiente",
    };

    createInvoiceFunction({
      dataForm: dataInvoice,
    });

    createMedicalRecordFunction({
      medicalAppointmentId: medicalAppointmentId,
      dataForm: dataForm,
      onStart: onStartFunctionCreateMedicalRecord,
      onSuccess: onSuccessFunctionCreateMedicalRecord,
    });
  };

  console.log(dataForm);

  return (
    <form onSubmit={handleSubmit(createMedicalRecordEndAppointmentOnSubmit)}>
      <div className="mt-4 flex flex-col gap-4">
        <TextareaInputSimple
          errors={errors}
          placeholder="Escribe..."
          label="Síntomas"
          nameRegister="symptoms"
          register={register}
          validations={{
            required: "Los síntomas son requeridos",
          }}
          styLabel="text-sm xl:text-base text-black-custom mb-3 font-medium"
        />
        <TextareaInputSimple
          idTextarea={"inputBarrierScenary-3"}
          errors={errors}
          placeholder="Escribe..."
          label="Tratamiento"
          nameRegister="treatment"
          register={register}
          validations={{
            required: "El tratamiento es requerido",
          }}
          styLabel="text-sm xl:text-base text-black-custom mb-3 font-medium"
        />
        <TextareaInputSimple
          idTextarea={"inputBarrierScenary-3"}
          errors={errors}
          placeholder="Escribe..."
          label="Diagnóstico"
          nameRegister="diagnostic"
          register={register}
          validations={{
            required: "El diagnóstico es requerido",
          }}
          styLabel="text-sm xl:text-base text-black-custom mb-3 font-medium"
        />
        <div className="flex sm:flex-row flex-col gap-3">
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
            loading={loadingButton}
          />
        </div>
      </div>
    </form>
  );
};
