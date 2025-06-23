import React from "react";

export const InfoUserComponentModal = ({ userData }) => {
  return (
    <div className="mb-4">
      <div className="grid sm:grid-cols-2 grid-cols-1 mt-10 gap-10">
        <div className="  flex justify-center">
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
      </div>
      {userData?.rol != "Administrativo" && (
        <div className=" mt-4"></div>
      )}
    </div>
  );
};
