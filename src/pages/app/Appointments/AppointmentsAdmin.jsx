import React, { use, useEffect, useState } from "react";
import { Search } from "../../../components/molecules/inputs/Search";
import { AppointmentState } from "../../../components/organims/appointmentState/AppointmentState";
import { ViewInfoAffliate } from "../../../components/organims/modal/viewInfoAffiliate/ViewInfoAffliate";
import { Modal } from "../../../components/organims/modal/Modal";
import { CompleteInfoAppointmentModal } from "../../../components/organims/modal/completeInfoAppointmentModal/CompleteInfoAppointmentModal";
import { ButtonTypeA } from "../../../components/molecules/buttons/ButtonTypeA";
import { Icons } from "../../../assets/icons/IconsProvider";
import ComponentCreateAppointment from "../../../components/organims/modal/componentCreateAppointment/ComponentCreateAppointment";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useAppointment } from "../../../hooks/useAppointment.hooks";
import { useSelector } from "react-redux";
import { LoaderComponent } from "../../../components/molecules/loader/LoaderComponent";
import { ValidateModal } from "../../../components/organims/modal/validateModal/ValidateModal";
import ComponentUpdateAppointment from "../../../components/organims/modal/componentUpdateAppointment/ComponentUpdateAppointment";
import { CarouselAppoCenter } from "../../../components/organims/carousel/CarouselAppoCenter/CarouselAppoCenter";
import { useAffiliate } from "../../../hooks/useAffiliates.hooks";
import { CarouselCenter } from "../../../components/organims/carousel/CarouselCenter/CarouselAppoCenter";
import { data } from "react-router-dom";
import { useMedicalRecord } from "../../../hooks/useMedicalRecord.hooks";
import { useInvoices } from "../../../hooks/useInvoices.hooks";
const { IconDateAppointmentWhite } = Icons;

const AppointmentsAdmin = () => {
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isopenModal, setIsOpenModal] = useState(false);
  const [isOpenModalCreateAppoinment, setIsOpenModalCreateAppoinment] =
    useState(false);
  const [flagHelpAppointment, setFlagHelpAppointment] = useState();
  const [
    isOpenModalCompleteInfoAppointment,
    setIsOpenModalCompleteInfoAppointment,
  ] = useState(false);
  const [dataAppointment, setDataAppointment] = useState(null);
  const [validateModalCancel, setValidateModalCancel] = useState(false);
  const [isOpenModalUpdateAppoinment, setIsOpenModalUpdateAppoinment] =
    useState(false);
  const [loadingButtonCancelAppointment, setLoadingButtonCancelAppointment] =
    useState(false);
  const [validateModalDeleteAppointment, setValidateModalDeleteAppointment] =
    useState(false);
  const [loadingButtonDeleteAppointment, setLoadingButtonDeleteAppointment] =
    useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [filteredTournaments, setFilteredTournaments] = useState([]);

  const { medicalRecords } = useSelector((state) => state.medicalRecord);
  const { appointments } = useSelector((state) => state.appointment);
  const { upcomingAppointments } = useSelector((state) => state.affiliates);
  const { rol, userId } = useSelector((state) => state.auth);
  const { invoices } = useSelector((state) => state.invoice);

  const {
    getAllAppointmentsFunction,
    updateAppointmentFunction,
    deleteAppointmentFunction,
  } = useAppointment();

  const { getUpcomingAppointmentsFunction } = useAffiliate();

  const { getAllMedicalRecordFunction, deleteMedicalRecordFunction } =
    useMedicalRecord();

  const { getOneInvoiceDeleteFunction , deleteInvoiceFunction } = useInvoices();

  const openModalViewInfoFunction = (data) => {
    setDataAppointment(data);
    setIsOpenModal(true);
  };

  const closeModalViewInfoAppointment = () => {
    setIsOpenModal(false);
    setDataAppointment(null);
  };

  const onStartFunctionUpdateAppointment = () => {
    setLoadingButtonCancelAppointment(true);
  };

  const onSuccessFunctionUpdateAppointment = () => {
    toast.success("Cita actualizada correctamente!", { duration: 2000 });
    setLoadingButtonCancelAppointment(false);
    setDataAppointment(null);
    setValidateModalCancel(false);
    setIsOpenModal(false);
    setFlagHelpAppointment((prev) => !prev);
  };

  const medicalRecordEnd = medicalRecords.find(
    (record) => record?.medicalAppointmentId === dataAppointment?.id
  );

  const deleteMedicalRecordOnSubmit = () => {
    deleteMedicalRecordFunction(medicalRecordEnd?.id);
  };

  const deleteInvoiceOnSubmit = () => {
    deleteInvoiceFunction(invoices?.id);
  };

  const updateAppointmentOnSubmit = () => {
    if (dataAppointment?.state === "realizada") {
      deleteMedicalRecordOnSubmit();
      deleteInvoiceOnSubmit()
    }

    const dataForm = {
      idAppointment: dataAppointment?.id,
      state:
        dataAppointment?.state === "cancelada" ||
        dataAppointment?.state === "realizada"
          ? "programada"
          : "cancelada",
    };

    updateAppointmentFunction({
      dataForm: dataForm,
      onStart: onStartFunctionUpdateAppointment,
      onSuccess: onSuccessFunctionUpdateAppointment,
    });
  };

  const onStartFunctionDeleteAppointment = () => {
    setLoadingButtonDeleteAppointment(true);
  };

  const onSuccessFunctionDeleteAppointment = () => {
    toast.success("Cita eliminada correctamente!", { duration: 2000 });
    setLoadingButtonDeleteAppointment(false);
    setDataAppointment(null);
    setValidateModalDeleteAppointment(false);
    setFlagHelpAppointment((prev) => !prev);
  };

  const deleteAppointmentOnSubmit = () => {
    deleteAppointmentFunction({
      appointmentId: dataUpdate?.id,
      onStart: onStartFunctionDeleteAppointment,
      onSuccess: onSuccessFunctionDeleteAppointment,
    });
  };

  const dataAppointmentEnd = () => {
    let dataAppointments;
    switch (rol) {
      case "Afiliado":
        dataAppointments = filteredTournaments?.filter(
          (appointment) => appointment?.affiliateId === userId
        );
        break;
      case "Profesional":
        dataAppointments = filteredTournaments?.filter(
          (appointment) => appointment?.professionalId === userId
        );
        break;

      default:
        dataAppointments = filteredTournaments;
        break;
    }
    return dataAppointments;
  };

  useEffect(() => {
    Promise.all([
      getUpcomingAppointmentsFunction(userId),
      getAllAppointmentsFunction(),
    ]).then(() => setLoading(false));
  }, [flagHelpAppointment]);

  useEffect(() => {
    getAllMedicalRecordFunction();
  }, [flagHelpAppointment]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTournaments(appointments);
    } else {
      const filtered = appointments.filter((appointment) =>
        appointment?.infoAffiliate?.user?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredTournaments(filtered);
    }
  }, [searchTerm, appointments]);

  useEffect(() => {
    getOneInvoiceDeleteFunction(dataAppointment?.affiliateId);
  }, [dataAppointment]);

  console.log("====================================");
  console.log(invoices);
  console.log("====================================");
  console.log("====================================");
  console.log(dataAppointment);
  console.log("====================================");

  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="  flex-1 p-4 flex flex-col xl:overflow-hidden overflow-y-auto"
    >
      <Toaster position="bottom-right" reverseOrder={true} />
      {loading ? (
        <div className="flex-1 w-full flex justify-center items-center">
          <LoaderComponent />
        </div>
      ) : (
        <>
          {rol != "Administrativo" && dataAppointmentEnd()?.length > 0 && (
            <section className=" flex xl:flex-row flex-col justify-between h-auto xl:items-end items-start">
              <div className="xl:flex-1  xl:order-1 order-2 w-full xl:mt-0 mt-8 ">
                {/* <Search /> */}
              </div>
              <div className="flex-1 flex w-full sm:flex-row flex-col gap-4 h-[90px] xl:order-2 order-1 overflow-hidden">
                <div className="rounded-xl sm:flex-1 min-h-[90px] overflow-hidden">
                  <CarouselAppoCenter
                    rol={rol}
                    upcomingAppointments={upcomingAppointments}
                    actionCardCarousel={openModalViewInfoFunction}
                  />
                </div>
                <div className="rounded-xl sm:flex-1 min-h-[90px] overflow-hidden">
                  <CarouselCenter
                    textCarousel="Próximas sedes"
                    upcomingAppointments={upcomingAppointments}
                    actionCardCarousel={openModalViewInfoFunction}
                  />
                </div>
              </div>
            </section>
          )}
          {rol === "Administrativo" && (
            <section className=" flex sm:flex-row flex-col items-end justify-between gap-4">
              <div className="flex-1 w-full sm:order-1 order-2">
                <Search
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  width="w-full"
                  disabled={appointments?.length === 0}
                />
              </div>
              <div className="sm:order-2 order-1 sm:w-auto w-full">
                <ButtonTypeA
                  action={() => setIsOpenModalCreateAppoinment(true)}
                  submitBtn={false}
                  text="Crear cita"
                  bgColor="bg-primary"
                  txColor="text-white"
                  bdWidth="0px"
                  bgHvColor="hover:bg-primary-hover"
                  width="w-full"
                  alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer gap-4"
                  paddingButton="0 20px"
                  heigthButton={" h-[40px]"}
                  img={IconDateAppointmentWhite}
                  imgStyles={"w-[18px]"}
                />
              </div>
            </section>
          )}
          <section className=" flex-1 xl:flex-row flex flex-col mt-6">
            <AppointmentState
              actionCard={openModalViewInfoFunction}
              hidden={hidden}
              setHidden={setHidden}
              appointments={dataAppointmentEnd()}
              setIsOpenModalUpdateAppoinment={setIsOpenModalUpdateAppoinment}
              setDataUpdate={setDataUpdate}
              setValidateModalDeleteAppointment={
                setValidateModalDeleteAppointment
              }
              rol={rol}
            />
          </section>
        </>
      )}
      <ViewInfoAffliate
        setViewMenuSm={() => closeModalViewInfoAppointment()}
        isopenModal={isopenModal}
        actionComplete={() => setIsOpenModalCompleteInfoAppointment(true)}
        actionCancel={() => setValidateModalCancel(true)}
        dataAppointment={dataAppointment}
        rol={rol}
        medicalRecordEnd={medicalRecordEnd}
      />
      <Modal
        isOpen={isOpenModalCompleteInfoAppointment}
        closeModal={() => setIsOpenModalCompleteInfoAppointment(false)}
        styleHW="w-[600px]"
        titleModal={"Completar historia clínica"}
        itemsStart="sm:items-center items-start"
      >
        <CompleteInfoAppointmentModal
          actionBtnCancel={() => setIsOpenModalCompleteInfoAppointment(false)}
          toast={toast}
          setDataAppointment={setDataAppointment}
          setIsOpenModal={setIsOpenModal}
          setFlagHelpAppointment={setFlagHelpAppointment}
          medicalAppointmentId={dataAppointment?.id}
          dataAppointment={dataAppointment}
        />
      </Modal>
      <Modal
        isOpen={isOpenModalCreateAppoinment}
        closeModal={() => setIsOpenModalCreateAppoinment(false)}
        styleHW="w-[600px]"
        titleModal={"Crear cita"}
        itemsStart="items-center"
      >
        <ComponentCreateAppointment
          toast={toast}
          setModalCreateAppointment={setIsOpenModalCreateAppoinment}
          setFlagHelpAppointment={setFlagHelpAppointment}
        />
      </Modal>
      <Modal
        isOpen={isOpenModalUpdateAppoinment}
        closeModal={() => setIsOpenModalUpdateAppoinment(false)}
        styleHW="w-[600px]"
        titleModal={"Actualizar cita"}
        itemsStart="items-center"
      >
        <ComponentUpdateAppointment
          toast={toast}
          setModalUpdateAppointment={setIsOpenModalUpdateAppoinment}
          setFlagHelpAppointment={setFlagHelpAppointment}
          dataUpdate={dataUpdate}
        />
      </Modal>
      <Modal
        isOpen={validateModalCancel}
        closeModal={() => setValidateModalCancel(false)}
        styleHW="w-[450px]"
        itemsStart="items-center"
      >
        <ValidateModal
          actionCancel={() => updateAppointmentOnSubmit()}
          actionDelete={() => setValidateModalCancel(false)}
          title={`¿Estás seguro de ${
            dataAppointment?.state === "cancelada" ||
            dataAppointment?.state === "realizada"
              ? "reprogramar"
              : "cancelar"
          }  la cita?`}
          subtitle={
            dataAppointment?.state === "realizada"
              ? "En cualquier momento puedes cambiar el estado , recuerda que se eliminará esta historia clínica."
              : "En cualquier momento puedes cambiar el estado."
          }
          textFirstButton="Aceptar"
          textSecondButton="Cancelar"
          oderButton="last"
          loadingButton={loadingButtonCancelAppointment}
        />
      </Modal>
      <Modal
        isOpen={validateModalDeleteAppointment}
        closeModal={() => setValidateModalDeleteAppointment(false)}
        styleHW="w-[450px]"
        itemsStart="items-center"
      >
        <ValidateModal
          actionCancel={() => setValidateModalDeleteAppointment(false)}
          actionDelete={() => deleteAppointmentOnSubmit()}
          title={`¿Estás seguro de eliminar la cita?`}
          subtitle={"Perderás toda la información de esta."}
          textFirstButton="Cancelar"
          textSecondButton="Eliminar"
          oderButton="last"
          loadingButton={loadingButtonDeleteAppointment}
        />
      </Modal>
    </motion.article>
  );
};

export default AppointmentsAdmin;
