import React, { useEffect, useState } from "react";
import { Icons } from "../../../../assets/icons/IconsProvider";
import { useAffiliate } from "../../../../hooks/useAffiliates.hooks";
import { useSelector } from "react-redux";
import { LoaderComponent } from "../../../molecules/loader/LoaderComponent";
import { useFormattedPrice } from "../../../../hooks/useFormattedPrice";
import { useProfessional } from "../../../../hooks/useProfessional.hooks";
import ComponentViewInfoUser from "../../../molecules/componentViewInfoUser/ComponentViewInfoUser";
const { IconInfoHelpWhite } = Icons;

export const InfoUserComponentModal = ({ userData }) => {
  const [loadingInfo, setLoadingInfo] = useState(true);
  const { affiliate } = useSelector((state) => state.affiliates);
  const { professional } = useSelector((state) => state.professionals);

  const { getOneAffiliateFunction } = useAffiliate();
  const { getOneProfessionalFunction } = useProfessional();

  useEffect(() => {
    switch (userData?.rol) {
      case "Afiliado":
        getOneAffiliateFunction(userData?.id).then((data) => {
          setLoadingInfo(false);
        });
        break;
      case "Profesional":
        getOneProfessionalFunction(userData?.id).then((data) => {
          setLoadingInfo(false);
        });
        break;

      default:
        break;
    }
  }, []);

  const priceFormatted = useFormattedPrice(
    affiliate?.infoHealthyPlan?.month_cost
  );

  const dataAffiliate = [
    {
      title: "Tipo de documento",
      getValue: () => affiliate?.document_type,
      fallback: "Sin tipo de documento",
    },
    {
      title: "Documento",
      getValue: () => affiliate?.document_number,
      fallback: "Sin número de documento",
    },
    {
      title: "Dirección",
      getValue: () => affiliate?.address,
      fallback: "Sin dirección",
    },
    {
      title: "Teléfono",
      getValue: () => affiliate?.phone,
      fallback: "Sin teléfono",
    },
    {
      title: "Tipo de plan",
      getValue: () => affiliate?.infoHealthyPlan?.name,
      fallback: "Sin tipo de plan",
    },
    {
      title: "Costo del plan",
      getValue: () => priceFormatted,
      fallback: "Sin costo de plan",
    },
  ];

  const dataProfessional = [
    {
      title: "Especialidad",
      getValue: () => professional?.specialty,
      fallback: "Sin especialidad",
    },
    {
      title: "Número de licencia",
      getValue: () => professional?.license_number,
      fallback: "Sin número de licencia",
    },
    {
      title: "Centro médico",
      getValue: () => professional?.infoHealthyCenter?.name,
      fallback: "Sin número de licencia",
    },
    {
      title: "T. Centro médico",
      getValue: () => professional?.infoHealthyCenter?.phone,
      fallback: "Sin número de licencia",
    },
    {
      title: "D. Centro médico",
      getValue: () => professional?.infoHealthyCenter?.address,
      fallback: "Sin número de licencia",
    },
    {
      title: "C. Centro médico",
      getValue: () => professional?.infoHealthyCenter?.city,
      fallback: "Sin número de licencia",
    },
  ];

  console.log(professional);
  

  return (
    <div className="mb-4">
      <div className="grid sm:grid-cols-2 grid-cols-1 mt-10 gap-10">
        <div className="flex justify-center">
          <div>
            <h2 className="font-bold text-base text-black-custom text-center">
              Nombre
            </h2>
            <p className="text-black-custom">
              {userData?.name || "Sin nombre"}
            </p>
          </div>
        </div>
        <div className="  flex justify-center">
          <div>
            <h2 className="font-bold text-base text-black-custom text-center">
              Correo
            </h2>
            <p className="text-black-custom">
              {userData?.email || "Sin correo"}
            </p>
          </div>
        </div>
        <div className="  flex justify-center">
          <div>
            <h2 className="font-bold text-base text-black-custom text-center">
              Rol
            </h2>
            <p className="text-black-custom">{userData?.rol || "Sin rol"}</p>
          </div>
        </div>
        <div className="  flex justify-center">
          <div>
            <h2 className="font-bold text-base text-black-custom text-center">
              Estado
            </h2>
            <p className="text-black-custom">
              {userData?.state === 1 ? "Activo" : "Inactivo" || "Sin estado"}
            </p>
          </div>
        </div>
        <div className="  flex justify-center">
          <div>
            <h2 className="font-bold text-base text-black-custom text-center">
              Género
            </h2>
            <p className="text-black-custom">
              {userData?.gender || "Sin estado"}
            </p>
          </div>
        </div>
      </div>
      {userData?.rol != "Administrativo" && (
        <div className=" mt-5 bg-primary rounded-xl min-h-[200px]">
          {loadingInfo ? (
            <div className="flex justify-center items-center h-full">
              <LoaderComponent />
            </div>
          ) : userData?.state === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <img className="w-16 mt-10" src={IconInfoHelpWhite} alt="" />
              <p className="text-white-custom text-center w-[80%]">
                El usuario aún no ha activado su cuenta
              </p>
            </div>
          ) : userData?.rol === "Afiliado" ? (
            <ComponentViewInfoUser fields={dataAffiliate} />
          ) : (
            <ComponentViewInfoUser fields={dataProfessional} />
          )}
        </div>
      )}
    </div>
  );
};
