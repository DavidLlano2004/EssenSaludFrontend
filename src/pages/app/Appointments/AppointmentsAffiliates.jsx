import React, { useState } from "react";
import { Search } from "../../../components/molecules/inputs/Search";
import { CarouselAppoCenter } from "../../../components/organims/carousel/CarouselAppoCenter/CarouselAppoCenter";
import { motion } from "framer-motion";
import { AppointmentState } from "../../../components/organims/appointmentState/AppointmentState";
import { ViewInfoAffliate } from "../../../components/organims/modal/viewInfoAffiliate/ViewInfoAffliate";
import { Modal } from "../../../components/organims/modal/Modal";
import { CompleteInfoAppointmentModal } from "../../../components/organims/modal/completeInfoAppointmentModal/CompleteInfoAppointmentModal";

export const AppointmentsAffiliates = () => {

  const [hidden, setHidden] = useState(true);
  const [isopenModal, setIsOpenModal] = useState(false);
  const [buttonCancel, setButtonCancel] = useState(false);
  const [
    isOpenModalCompleteInfoAppointment,
    setIsOpenModalCompleteInfoAppointment,
  ] = useState(false);

  const openModalInfoAppointment = (i) => {
    if (i === 0) {
      setButtonCancel(true);
    } else {
      setButtonCancel(false);
    }
    setIsOpenModal(true);
  };
  
  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="  flex-1 p-4 flex flex-col xl:overflow-hidden overflow-y-auto"
    >
      <section className=" flex xl:flex-row flex-col justify-between h-auto xl:items-end items-start">
        <div className="xl:flex-1  xl:order-1 order-2 w-full xl:mt-0 mt-8 ">
          <Search textSearch="Buscar especialista" />
        </div>
        <div className="flex-1 flex w-full sm:flex-row flex-col gap-4 h-[90px] xl:order-2 order-1 overflow-hidden">
          <div className="rounded-xl sm:flex-1 min-h-[90px] overflow-hidden">
            <CarouselAppoCenter
              affiliate={false}
              textCarousel="Próximos doctores"
            />
          </div>
          <div className="rounded-xl sm:flex-1 min-h-[90px] overflow-hidden">
            <CarouselAppoCenter center={true} textCarousel="Próximas sedes" />
          </div>
        </div>
      </section>
      <section className=" flex-1 mt-6  xl:flex-row flex flex-col">
        <AppointmentState
          actionCard={openModalInfoAppointment}
          hidden={hidden}
          setHidden={setHidden}
          titleCard={"Especialista"}
          affiliate={false}
        />
      </section>
      <ViewInfoAffliate
        setViewMenuSm={setIsOpenModal}
        isopenModal={isopenModal}
        actionComplete={() => setIsOpenModalCompleteInfoAppointment(true)}
        affiliate={true}
        buttonCancel={buttonCancel}
      />
      <Modal
        isOpen={isOpenModalCompleteInfoAppointment}
        closeModal={() => setIsOpenModalCompleteInfoAppointment(false)}
        styleHW="w-[600px]"
        titleModal={"Completar historia clínica"}
      >
        <CompleteInfoAppointmentModal
          actionBtnCancel={() => setIsOpenModalCompleteInfoAppointment(false)}
        />
      </Modal>
    </motion.article>
  );
};
