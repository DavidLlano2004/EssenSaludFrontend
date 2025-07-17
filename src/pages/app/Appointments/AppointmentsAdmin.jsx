import React, { useEffect, useState } from "react";
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

  const { appointments } = useSelector((state) => state.appointment);
  const { getAllAppointmentsFunction } = useAppointment();

  useEffect(() => {
    getAllAppointmentsFunction().then((data) => {
      data?.state === 200 && setLoading(false);
    });
  }, [flagHelpAppointment]);

  console.log(appointments);

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
          <section className=" flex sm:flex-row flex-col items-end justify-between gap-4">
            <div className="flex-1 w-full sm:order-1 order-2">
              <Search width="w-full" disabled={appointments?.length === 0} />
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
          <section
            className=" flex-1 mt-6  xl:flex-row flex flex-col"
          >
            <AppointmentState
              actionCard={() => setIsOpenModal(true)}
              hidden={hidden}
              setHidden={setHidden}
              appointments={appointments}
            />
          </section>
        </>
      )}
      <ViewInfoAffliate
        setViewMenuSm={setIsOpenModal}
        isopenModal={isopenModal}
        actionComplete={() => setIsOpenModalCompleteInfoAppointment(true)}
      />
      <Modal
        isOpen={isOpenModalCompleteInfoAppointment}
        closeModal={() => setIsOpenModalCompleteInfoAppointment(false)}
        styleHW="w-[600px]"
        titleModal={"Completar historia clínica"}
        itemsStart="items-start"
      >
        <CompleteInfoAppointmentModal
          actionBtnCancel={() => setIsOpenModalCompleteInfoAppointment(false)}
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
    </motion.article>
  );
};

export default AppointmentsAdmin;
