import { motion } from "framer-motion";
import CardAffiliatesAppointState from "../cards/CardAffiliatesAppointState";
import { EmptyData } from "../../molecules/emptyData/EmptyData";

export const AppointmentState = ({
  actionCard,
  titleCard,
  affiliate,
  appointments,
}) => {
  const filterDataAppointmentProgress = appointments?.filter(
    (data) => data?.state === "programada"
  );
  const filterDataAppointmentCancel = appointments?.filter(
    (data) => data?.state === "cancelada"
  );
  const filterDataAppointmentEnd = appointments?.filter(
    (data) => data?.state === "realizada"
  );

  return (
    <>
      {appointments?.length > 0 ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className=" flex-1 flex flex-col"
        >
          <h1 className="text-lg font-medium mb-2 text-black-custom">
            Estados de cita
          </h1>
          <div className="grid lg:grid-cols-3 grid-cols-1 flex-1 gap-3">
            <CardAffiliatesAppointState
              actionCard={() => actionCard(0)}
              textState={"Programada"}
              numberAppoints={filterDataAppointmentProgress?.length}
              stateAppoint="programada"
              dataByCards={filterDataAppointmentProgress}
            />
            <CardAffiliatesAppointState
              actionCard={() => actionCard(1)}
              textState={"Cancelada"}
              numberAppoints={filterDataAppointmentCancel?.length}
              stateAppoint="cancelada"
              dataByCards={filterDataAppointmentCancel}
            />
            <CardAffiliatesAppointState
              actionCard={() => actionCard(1)}
              textState={"Realizada"}
              numberAppoints={filterDataAppointmentEnd?.length}
              stateAppoint="realizada"
              dataByCards={filterDataAppointmentEnd}
            />
          </div>
        </motion.div>
      ) : (
        <div className=" flex-1 flex justify-center items-center">
          <EmptyData />
        </div>
      )}
    </>
  );
};
