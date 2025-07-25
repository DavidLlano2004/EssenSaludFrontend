import React from "react";
import CardAffiliateAppointment from "./CardAffiliateAppointment";

const CardAffiliatesAppointState = ({
  textState,
  numberAppoints,
  stateAppoint = "programada",
  actionCard,
  titleCard,
  affiliate,
  dataByCards = [],
  actionEdit,
  actionDelete,
  rol
}) => {
  const colorCard = {
    programada: {
      container: "bg-primary-hover",
      numberAppoints: "bg-[#153479]",
    },
    cancelada: {
      container: "bg-red-custom",
      numberAppoints: "bg-[#853030]",
    },
    realizada: {
      container: "bg-secondary",
      numberAppoints: "bg-[#13572f]",
    },
  };
  return (
    <div className="lg:flex-1 flex flex-col">
      <div
        className={`px-3 py-2 rounded-lg w-full gap-4 ${colorCard[stateAppoint].container} flex items-center justify-center`}
      >
        <p className=" text-base text-white">{textState}</p>
        <div
          className={`w-[20px] h-[20px] ${colorCard[stateAppoint].numberAppoints} rounded-md grid place-items-center`}
        >
          <p className=" text-xs text-white">{numberAppoints}</p>
        </div>
      </div>

      <div className=" mt-3 lg:flex-[590px] max-h-[600px] h-auto overflow-y-auto flex flex-col gap-3">
        {dataByCards?.map((data) => (
          <CardAffiliateAppointment
            key={data?.id}
            actionCard={() => actionCard(data)}
            titleCard={titleCard}
            affiliate={affiliate}
            dataCard={data}
            actionEdit={actionEdit}
            actionDelete={actionDelete}
            rol={rol}
          />
        ))}
      </div>
    </div>
  );
};

export default CardAffiliatesAppointState;
