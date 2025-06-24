import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ButtonTypeA } from "../../../components/molecules/buttons/ButtonTypeA";
import { LoaderComponent } from "../../../components/molecules/loader/LoaderComponent";
import { TableHealthyCenters } from "../../../components/organims/tables/TableHealthyCenters";
import { Icons } from "../../../assets/icons/IconsProvider";
import { EmptyData } from "../../../components/molecules/emptyData/EmptyData";
import { Modal } from "../../../components/organims/modal/Modal";
import { CreateHealthyComponentModal } from "../../../components/organims/modal/createHealthyComponentModal/CreateHealthyComponentModal";
import { useHealthyCenter } from "../../../hooks/useHealthyCenter.hooks";
import { useSelector } from "react-redux";
import { ValidateModal } from "../../../components/organims/modal/validateModal/ValidateModal";
import { UpdateHealthyComponentModal } from "../../../components/organims/modal/updateHealthyComponentModal/UpdateHealthyComponentModal";
const { IconAddHealthyCenterWhite } = Icons;

export const HealthyCenters = () => {
  const { healthyCenters } = useSelector((state) => state.healthyCenter);

  const { getAllHealthyCentersFunction, deleteHealthyCenterFunction } =
    useHealthyCenter();

  const [modalCreateHealthyCenter, setModalCreateHealthyCenter] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [flagHelpHealthyCenter, setFlagHelpHealthyCenter] = useState(false);
  const [healthyCenterId, setHealthyCenterId] = useState("");
  const [
    loadingButtonUpdateHealthyCenter,
    setLoadingButtonUpdateHealthyCenter,
  ] = useState("");
  const [healthyCenterdata, setHealthyCenterdata] = useState("");
  const [isModalUpdateHealthyCenter, setIsModalUpdateHealthyCenter] =
    useState(false);
  // Delete
  const [
    loadingButtonDeleteHealthyCenter,
    setLoadingButtonDeleteHealthyCenter,
  ] = useState(false);
  const [isModalDeleteHealthyCenter, setIsModalDeleteHealthyCenter] =
    useState(false);

  const [openModalInfoHealthyCenter, setOpenModalInfoHealthyCenter] =
    useState(false);

  //Delete

  const modalDeleteHealthyCenter = (healthyCenter) => {
    setHealthyCenterId(healthyCenter?.id);
    setIsModalDeleteHealthyCenter(true);
  };

  const closeModalDeleteHealthyCenter = () => {
    setHealthyCenterId("");
    setIsModalDeleteHealthyCenter(false);
  };

  const onStartDeleteHealthyCenter = () => {
    setLoadingButtonDeleteHealthyCenter(true);
  };
  const onSuccessDeleteHealthyCenter = () => {
    setLoadingButtonDeleteHealthyCenter(false);
    setIsModalDeleteHealthyCenter(false);
    toast.success("¡Centro borrado correctamente!", { duration: 3000 });
    setFlagHelpHealthyCenter((prev) => !prev);
  };

  //Update

  const modalUpdateHealthyCenter = (healthyCenter) => {
    setHealthyCenterId(healthyCenter?.id);
    setHealthyCenterdata(healthyCenter);
    setIsModalUpdateHealthyCenter(true);
  };

  const closeModalUpdateHealthyCenter = () => {
    setHealthyCenterId("");
    setHealthyCenterdata("");
    setIsModalUpdateHealthyCenter(false);
  };

  useEffect(() => {
    getAllHealthyCentersFunction().then((data) => {
      data?.state === 200 && setLoading(false);
    });
  }, [flagHelpHealthyCenter]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="sm:p-4 p-3 flex flex-col flex-1 overflow-hidden"
    >
      <Toaster position="bottom-right" reverseOrder={true} />
      <div className="flex flex-row justify-end">
        <ButtonTypeA
          action={() => setModalCreateHealthyCenter(true)}
          submitBtn={false}
          text="Crear centro de salud"
          bgColor="bg-primary"
          txColor="text-white"
          bdWidth="0px"
          bgHvColor="hover:bg-primary-hover"
          width="sm:w-[250px] w-full"
          alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer"
          paddingButton="0 20px"
          heigthButton={" h-[40px]"}
          img={IconAddHealthyCenterWhite}
          imgStyles={"w-[18px]"}
        />
      </div>
      <div className="flex-1 w-full mt-4 overflow-y-auto ">
        {loading ? (
          <div className="h-full flex justify-center items-center">
            <LoaderComponent />
          </div>
        ) : healthyCenters?.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            <EmptyData />
          </div>
        ) : (
          <TableHealthyCenters
            actionEdit={modalUpdateHealthyCenter}
            actionDelete={modalDeleteHealthyCenter}
            healthyCenters={healthyCenters}
          />
        )}
      </div>
      <Modal
        isOpen={modalCreateHealthyCenter}
        closeModal={() => setModalCreateHealthyCenter(false)}
        styleHW="w-[450px]"
        titleModal={"Crear centro"}
      >
        <CreateHealthyComponentModal
          setFlagHelpHealthyCenter={setFlagHelpHealthyCenter}
          toast={toast}
          setModalCreateHealthyCenter={setModalCreateHealthyCenter}
        />
      </Modal>

      <Modal
        isOpen={isModalDeleteHealthyCenter}
        closeModal={() => closeModalDeleteHealthyCenter()}
        styleHW="w-[400px]"
      >
        <ValidateModal
          loadingButton={loadingButtonDeleteHealthyCenter}
          actionCancel={() => closeModalDeleteHealthyCenter()}
          actionDelete={() =>
            deleteHealthyCenterFunction({
              healthyCenterId: healthyCenterId,
              onStart: onStartDeleteHealthyCenter,
              onSuccess: onSuccessDeleteHealthyCenter,
            })
          }
          title={"¿Estás seguro de borrar el centro de salud?"}
          subtitle={
            "Perderás toda la información relacionada con este centro de salud."
          }
        />
      </Modal>

      <Modal
        isOpen={isModalUpdateHealthyCenter}
        closeModal={() => closeModalUpdateHealthyCenter()}
        styleHW="w-[400px]"
        titleModal={"Editar centro"}
      >
        <UpdateHealthyComponentModal
          healthyCenterdata={healthyCenterdata}
          healthyCenterId={healthyCenterId}
          toast={toast}
          closeModalUpdateHealthyCenter={closeModalUpdateHealthyCenter}
          setFlagHelpHealthyCenter={setFlagHelpHealthyCenter}
          loadingButtonUpdateHealthyCenter={loadingButtonUpdateHealthyCenter}
        />
      </Modal>
    </motion.div>
  );
};
