import { motion } from "framer-motion";
import React from "react";
import { Icons } from "../../../assets/icons/IconsProvider";
import CardAffiliatesAppointState from "../cards/CardAffiliatesAppointState";
const { IconOpenInfoPacient } = Icons;

export const AppointmentState = ({ hidden, setHidden , actionCard}) => {
  return (
    <>
      <div className=" flex-1 flex flex-col">
        <h1 className="text-lg font-medium mb-2 text-black-custom">Estados de cita</h1>
        <div className="grid lg:grid-cols-3 grid-cols-1 flex-1 gap-3">
         <CardAffiliatesAppointState actionCard={actionCard} textState={"Programada"} numberAppoints={2} stateAppoint="programada"/>
         <CardAffiliatesAppointState textState={"Cancelada"} numberAppoints={2} stateAppoint="cancelada"/>
         <CardAffiliatesAppointState textState={"Realizada"} numberAppoints={2} stateAppoint="realizada"/>
        </div>
      </div>
    </>
  );
};
