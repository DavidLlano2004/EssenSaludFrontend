import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ButtonTypeA } from "../../../components/molecules/buttons/ButtonTypeA";
import { Icons } from "../../../assets/icons/IconsProvider";
import { TableUsers } from "../../../components/organims/tables/TableUsers";
import { useUsers } from "../../../hooks/useUsers.hooks";
import { LoaderComponent } from "../../../components/molecules/loader/LoaderComponent";
import { EmptyData } from "../../../components/molecules/emptyData/EmptyData";
import { Modal } from "../../../components/organims/modal/Modal";
import toast, { Toaster } from "react-hot-toast";
import { CreateUserComponentModal } from "../../../components/organims/modal/createUserComponentModal/CreateUserComponentModal";
import { ValidateModal } from "../../../components/organims/modal/validateModal/ValidateModal";
import { InfoUserComponentModal } from "../../../components/organims/modal/infoUserComponentModal/InfoUserComponentModal";
import { UpdateComponentModal } from "../../../components/organims/modal/updateComponentModal/UpdateComponentModal";
import { Search } from "../../../components/molecules/inputs/Search";

const { IconAddUser } = Icons;

export const HomeApp = () => {
  const { users } = useSelector((state) => state.user);

  const { fetchAllUsers, deleteUserFunction } = useUsers();

  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openModalCreateUsers, setOpenModalCreateUsers] = useState(false);
  const [flagCreateUserHome, setFlagCreateUserHome] = useState(false);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({});
  const [openModalDeleteUser, setOpenModalDeleteUser] = useState(false);
  const [openModalInfoUser, setOpenModalInfoUser] = useState(false);
  const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [filteredTournaments, setFilteredTournaments] = useState([]);

  const [tabsUsers, setTabUsers] = useState([
    {
      id: 0,
      name: "Todos los usuarios",
      isActive: true,
    },
    {
      id: 1,
      name: "Afilidiados",
      isActive: false,
    },
    {
      id: 2,
      name: "Profesionales",
      isActive: false,
    },
    {
      id: 3,
      name: "Administradores",
      isActive: false,
    },
  ]);

  const navigateOnPages = (id) => {
    setTabUsers((prevUsers) =>
      prevUsers.map((item) => ({
        ...item,
        isActive: item?.id === id,
      }))
    );
    setCurrentSection(id);
  };

  const functionHelpCreateUserHome = () => {
    setOpenModalCreateUsers(false);
    setFlagCreateUserHome((prev) => !prev);
  };

  const modalDeleteSetIdUser = (userId) => {
    setUserId(userId?.id);
    setOpenModalDeleteUser(true);
  };

  const flagDeleteUser = () => {
    toast.success("¡Usuario eliminado correctamente!", { duration: 3000 });
    setUserId("");
    setOpenModalDeleteUser(false);
    setFlagCreateUserHome((prev) => !prev);
  };

  const closeModalDeleteUser = () => {
    setUserData({});
    setUserId("");
    setOpenModalDeleteUser(false);
  };

  const closeModalInfoUser = () => {
    setOpenModalInfoUser(false);
    setUserData({});
    setUserId("");
  };

  const modalInfoUser = (userId) => {
    setUserData(userId);
    setUserId(userId?.id);
    setOpenModalInfoUser(true);
  };

  const modalUpdateUser = (userId) => {
    setUserData(userId);
    setUserId(userId?.id);
    setOpenModalUpdateUser(true);
  };

  const closeModalUpdateUser = () => {
    setUserData({});
    setUserId("");
    setOpenModalUpdateUser(false);
  };

  const filteredUsers = useMemo(() => {
    switch (currentSection) {
      case 0:
        return filteredTournaments;
      case 1:
        return filteredTournaments?.filter((user) => user?.rol === "Afiliado");
      case 2:
        return filteredTournaments?.filter(
          (user) => user?.rol === "Profesional"
        );
      default:
        return filteredTournaments?.filter(
          (user) => user?.rol === "Administrativo"
        );
    }
  }, [currentSection, filteredTournaments]);

  useEffect(() => {
    setLoading(true);
    fetchAllUsers().then((data) => {
      data?.state === 200 && setLoading(false);
    });
  }, [flagCreateUserHome]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTournaments(users);
    } else {
      const filtered = users.filter((user) =>
        user?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTournaments(filtered);
    }
  }, [searchTerm, users]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="sm:p-4 p-3 flex flex-col flex-1 overflow-hidden"
    >
      <Toaster position="bottom-right" reverseOrder={true} />
      <div className="flex sm:flex-row flex-col items-end gap-4 w-full">
        <div className="sm:order-1 order-2 sm:flex-1 w-full">
          <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            width="w-full"
            textSearch="Buscar usuarios"
          />
        </div>
        <div className="sm:order-2 order-1 sm:w-auto w-full">
          <ButtonTypeA
            action={() => setOpenModalCreateUsers(true)}
            submitBtn={false}
            text="Crear usuario"
            bgColor="bg-primary"
            txColor="text-white"
            bdWidth="0px"
            bgHvColor="hover:bg-primary-hover"
            width="sm:w-[230px] w-full"
            alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer"
            heigthButton={" h-[40px]"}
            img={IconAddUser}
            imgStyles={"w-[18px]"}
          />
        </div>
      </div>
      <div className="min-h-8 mt-4 gap-3 lg:flex hidden">
        {tabsUsers?.map((tab) => (
          <button
            onClick={() => navigateOnPages(tab?.id)}
            key={tab?.id}
            className="w-[180px] cursor-pointer"
          >
            <p
              className={`text-center hover:text-primary transition-all ease-in duration-150  ${
                tab?.isActive ? "text-primary" : "text-[#B1B1B1]"
              } font-medium text-[16px]`}
            >
              {tab?.name}
            </p>
          </button>
        ))}
      </div>
      <div className=" bg-[#EBEEF2] w-full h-[2px] mb-3 lg:flex hidden">
        <motion.div
          animate={{ x: currentSection * (180 + 12) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-primary h-1 w-[180px] rounded-tl-3xl rounded-tr-3xl"
        ></motion.div>
      </div>
      <div className="flex-1 w-full mt-4 overflow-y-auto ">
        {loading ? (
          <div className="h-full flex justify-center items-center">
            <LoaderComponent />
          </div>
        ) : filteredUsers?.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            <EmptyData />
          </div>
        ) : (
          <TableUsers
            actionEdit={modalUpdateUser}
            actionView={modalInfoUser}
            actionDelete={modalDeleteSetIdUser}
            users={filteredUsers}
          />
        )}
      </div>
      <Modal
        isOpen={openModalCreateUsers}
        closeModal={() => setOpenModalCreateUsers(false)}
        styleHW="w-[400px]"
        titleModal={"Crear usuario"}
        itemsStart="items-center"
      >
        <CreateUserComponentModal
          functionHelpCreateUserHome={() => functionHelpCreateUserHome()}
          toast={toast}
        />
      </Modal>
      <Modal
        isOpen={openModalDeleteUser}
        closeModal={() => closeModalDeleteUser()}
        styleHW="w-[400px]"
        itemsStart="items-center"
      >
        <ValidateModal
          actionCancel={() => closeModalDeleteUser()}
          actionDelete={() => deleteUserFunction(userId, flagDeleteUser)}
          title={"¿Estás seguro de borrar el usuario?"}
          subtitle={
            "Perderás toda la información relacionada con este usuario."
          }
        />
      </Modal>
      <Modal
        isOpen={openModalInfoUser}
        closeModal={() => closeModalInfoUser()}
        styleHW="w-[600px]"
        titleModal={"Información del usuario"}
        itemsStart="items-center"
      >
        <InfoUserComponentModal userData={userData} />
      </Modal>
      <Modal
        isOpen={openModalUpdateUser}
        closeModal={() => closeModalUpdateUser()}
        styleHW="w-[600px]"
        itemsStart="items-center"
        titleModal={"Editar el usuario"}
      >
        <UpdateComponentModal
          closeModalUpdateUser={closeModalUpdateUser}
          toast={toast}
          rol={true}
          userId={userId}
          userData={userData}
          setFlagCreateUserHome={setFlagCreateUserHome}
        />
      </Modal>
    </motion.div>
  );
};
