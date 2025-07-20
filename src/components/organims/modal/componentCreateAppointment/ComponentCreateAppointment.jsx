import React, { useEffect, useState } from "react";
import FormCreateAppointment from "../../forms/FormCreateAppointment";
import { useForm } from "react-hook-form";
import { useAffiliate } from "../../../../hooks/useAffiliates.hooks";
import { useSelector } from "react-redux";
import { useProfessional } from "../../../../hooks/useProfessional.hooks";
import { useHealthyCenter } from "../../../../hooks/useHealthyCenter.hooks";
import { useAppointment } from "../../../../hooks/useAppointment.hooks";

const ComponentCreateAppointment = ({
  toast,
  setModalCreateAppointment,
  setFlagHelpAppointment,
}) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const { affiliatesData } = useSelector((state) => state.affiliates);
  const { professionalsData } = useSelector((state) => state.professionals);
  const { healthyCenters } = useSelector((state) => state.healthyCenter);

  const { getAllAffiliatesFunction } = useAffiliate();
  const { getAllProfessionalsFunction } = useProfessional();
  const { getAllHealthyCentersFunction } = useHealthyCenter();
  const { createAppointmentFunction } = useAppointment();

  const {
    control,
    register,
    formState: { errors },
    watch,
    reset,
    handleSubmit,
  } = useForm();

  const dataForm = watch();

  const onStartFunctionCreateHealthyCenter = () => {
    setButtonLoading(true);
  };

  const onSuccessFunctionCreateHealthyCenter = () => {
    toast.success("Cita creada correctamente!", { duration: 3000 });
    setButtonLoading(false);
    reset();
    setModalCreateAppointment(false);
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

    createAppointmentFunction({
      dataForm: dataForm,
      onStart: onStartFunctionCreateHealthyCenter,
      onSuccess: onSuccessFunctionCreateHealthyCenter,
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
        <FormCreateAppointment
          control={control}
          affiliatesData={affiliatesData}
          register={register}
          errors={errors}
          healthyCentersData={healthyCenters}
          professionalsData={dataDoctorsByCenter}
          dataForm={dataForm}
          buttonLoading={buttonLoading}
          actionBtnCancel={() => setModalCreateAppointment(false)}
        />
      </form>
    </div>
  );
};

export default ComponentCreateAppointment;
