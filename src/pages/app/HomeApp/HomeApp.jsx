import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { singOffCase } from "../../../redux/slices/authSlice/Auth.Slice";
import { singOffCaseAction } from "../../../redux/actions/authAction/auth.action";
import { motion } from "framer-motion";
import { ButtonTypeA } from "../../../components/molecules/buttons/ButtonTypeA";
import { Icons } from "../../../assets/icons/IconsProvider";
const { IconAddUser } = Icons;
export const HomeApp = () => {
  const [currentSection, setCurrentSection] = useState(0);

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

  const dispatch = useDispatch();

  const singOffCaseFunction = async () => {
    try {
      const response = await singOffCaseAction();
      dispatch(singOffCase());
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateOnPages = (id) => {
    setTabUsers((prevUsers) =>
      prevUsers.map((item) => ({
        ...item,
        isActive: item?.id === id,
      }))
    );
    setCurrentSection(id);
  };

  console.log(currentSection);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="p-4 flex flex-col flex-1"
    >
      <div className="flex flex-row justify-end">
        <ButtonTypeA
          submitBtn={false}
          text="Crear usuario"
          bgColor="bg-primary"
          txColor="text-white"
          bdWidth="0px"
          bgHvColor="hover:bg-primary-hover"
          width="w-[180px]"
          alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer"
          heigthButton={" h-[40px]"}
          img={IconAddUser}
          imgStyles={"w-[18px]"}
        />
      </div>
      <div className=" flex min-h-8 mt-4 gap-3">
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
      <div className=" bg-[#EBEEF2] w-full h-[2px] mb-3">
        <motion.div
          animate={{ x: currentSection * (180 + 12) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-primary h-1 w-[180px] rounded-tl-3xl rounded-tr-3xl"
        ></motion.div>
      </div>
      <div className="flex-1 w-full"></div>
      <button
        onClick={() => singOffCaseFunction()}
        className="bg-red-800 p-2 m-2 rounded-lg text-white"
      >
        Cerrar sesion
      </button>
    </motion.div>
  );
};
