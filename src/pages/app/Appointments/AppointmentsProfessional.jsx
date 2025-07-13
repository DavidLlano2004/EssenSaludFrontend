import React, { useState } from "react";
import { Search } from "../../../components/molecules/inputs/Search";
import { CarouselAppoCenter } from "../../../components/organims/carousel/CarouselAppoCenter/CarouselAppoCenter";
import { motion } from "framer-motion";
import { Icons } from "../../../assets/icons/IconsProvider";
import { AppointmentState } from "../../../components/organims/appointmentState/AppointmentState";
import { ViewInfoAffliate } from "../../../components/organims/modal/viewInfoAffiliate/ViewInfoAffliate";
import { Modal } from "../../../components/organims/modal/Modal";
import { CompleteInfoAppointmentModal } from "../../../components/organims/modal/completeInfoAppointmentModal/CompleteInfoAppointmentModal";
const { IconOpenInfoPacient } = Icons;

export const AppointmentsProfessional = () => {
  const [hidden, setHidden] = useState(true);
  const [isopenModal, setIsOpenModal] = useState(false);
  const [
    isOpenModalCompleteInfoAppointment,
    setIsOpenModalCompleteInfoAppointment,
  ] = useState(false);
  return (
    <article className="  flex-1 p-4 flex flex-col xl:overflow-hidden overflow-y-auto">
      <section className=" flex xl:flex-row flex-col justify-between h-auto xl:items-end items-start">
        <div className="xl:flex-1  xl:order-1 order-2 w-full xl:mt-0 mt-8 ">
          <Search />
        </div>
        <div className="flex-1 flex w-full sm:flex-row flex-col gap-4 h-[90px] xl:order-2 order-1 overflow-hidden">
          <div className="rounded-xl sm:flex-1 min-h-[90px] overflow-hidden">
            <CarouselAppoCenter />
          </div>
          <div className="rounded-xl sm:flex-1 min-h-[90px] overflow-hidden">
            <CarouselAppoCenter center={true} textCarousel="Próximas sedes" />
          </div>
        </div>
      </section>
      <section className=" flex-1 mt-6  xl:flex-row flex flex-col">
        <AppointmentState
          actionCard={() => setIsOpenModal(true)}
          hidden={hidden}
          setHidden={setHidden}
        />
      </section>
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
      >
        <CompleteInfoAppointmentModal
          actionBtnCancel={() => setIsOpenModalCompleteInfoAppointment(false)}
        />
      </Modal>
    </article>
  );
};
