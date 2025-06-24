import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Aside } from "../components/organims/aside/Aside";
import { Header } from "../components/organims/header/Header";
import { MenuSm } from "../components/organims/menuSm/MenuSm";
import { Modal } from "../components/organims/modal/Modal";
import { useSelector } from "react-redux";
import { CompleteInfoAffiliateComponentModal } from "../components/organims/modal/completeInfoAffiliateComponentModal/CompleteInfoAffiliateComponentModal";
import toast, { Toaster } from "react-hot-toast";

export const TemplateApp = () => {
  const { rol, state } = useSelector((state) => state.auth);
  const [viewMenuSm, setViewMenuSm] = useState(false);
  const [validateInfoAffiliate, setValidateInfoAffiliate] = useState(false);

  useEffect(() => {
    switch (rol) {
      case "Afiliado":
        state === 0 && setValidateInfoAffiliate(true);
        break;

      default:
        break;
    }
  }, []);

  return (
    <article className="h-[100dvh] flex">
      <Aside />
      <div className="bg-white-custom flex-1 flex flex-col overflow-hidden">
        <Header setViewMenuSm={setViewMenuSm} />
        <Outlet />
      </div>
      <MenuSm isopenModal={viewMenuSm} setViewMenuSm={setViewMenuSm} />
      <Modal
        isOpen={validateInfoAffiliate}
        styleHW="w-[600px]"
        titleModal={"Completar información"}
      >
        <CompleteInfoAffiliateComponentModal
          setValidateInfoAffiliate={setValidateInfoAffiliate}
          toast={toast}
        />
      </Modal>
      <Toaster position="bottom-right" reverseOrder={true} />
    </article>
  );
};
