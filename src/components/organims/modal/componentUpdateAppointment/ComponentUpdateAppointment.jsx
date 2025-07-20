import React, { useEffect, useState } from "react";
import FormUpdateAppointment from "../../forms/FormUpdateAppointment";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAffiliate } from "../../../../hooks/useAffiliates.hooks";
import { useProfessional } from "../../../../hooks/useProfessional.hooks";
import { useHealthyCenter } from "../../../../hooks/useHealthyCenter.hooks";
import { useAppointment } from "../../../../hooks/useAppointment.hooks";

const ComponentUpdateAppointment = ({
  toast,
  setModalUpdateAppointment,
  setFlagHelpAppointment,
  dataUpdate,
}) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const { affiliatesData } = useSelector((state) => state.affiliates);
  const { professionalsData } = useSelector((state) => state.professionals);
  const { healthyCenters } = useSelector((state) => state.healthyCenter);

  const { getAllAffiliatesFunction } = useAffiliate();
  const { getAllProfessionalsFunction } = useProfessional();
  const { getAllHealthyCentersFunction } = useHealthyCenter();
  const { updateAppointmentFunction } = useAppointment();

  const {
    control,
    register,
    formState: { errors },
    watch,
    reset,
    handleSubmit,
  } = useForm();

  const dataForm = watch();

  const onStartFunctionUpdateHealthyCenter = () => {
    setButtonLoading(true);
  };

  const onSuccessFunctionUpdateHealthyCenter = () => {
    toast.success("Cita actualizada correctamente!", { duration: 3000 });
    setButtonLoading(false);
    reset();
    setModalUpdateAppointment(false);
    setFlagHelpAppointment((prev) => !prev);
  };

  const validatePlanAffiliate = affiliatesData?.find(
    (affiliate) => affiliate?.userId === dataForm?.affiliateId?.value
  );

  const onSubmit = () => {
    if (validatePlanAffiliate?.healthyPlanId === null) {
      toast.error("El usuario escogido aún no tiene un plan de salud", {
        duration: 4000,
      });
      setButtonLoading(false);
      return;
    }
    const newInfo = {
      ...dataForm,
      idAppointment: dataUpdate?.id,
    };

    updateAppointmentFunction({
      dataForm: newInfo,
      onStart: onStartFunctionUpdateHealthyCenter,
      onSuccess: onSuccessFunctionUpdateHealthyCenter,
    });
  };

  useEffect(() => {
    Promise.all([
      getAllAffiliatesFunction(),
      getAllProfessionalsFunction(),
      getAllHealthyCentersFunction(),
    ]);
  }, []);

  const dataDoctorsByCenter = professionalsData?.filter(
    (data) => data?.centerId === dataForm?.healthyCenterId?.value
  );

  return (
    <div className="mt-8">
      <form className=" flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <FormUpdateAppointment
          control={control}
          affiliatesData={affiliatesData}
          register={register}
          errors={errors}
          healthyCentersData={healthyCenters}
          professionalsData={dataDoctorsByCenter}
          dataForm={dataForm}
          buttonLoading={buttonLoading}
          actionBtnCancel={() => setModalUpdateAppointment(false)}
          dataUpdate={dataUpdate}
        />
      </form>
    </div>
  );
};

export default ComponentUpdateAppointment;
