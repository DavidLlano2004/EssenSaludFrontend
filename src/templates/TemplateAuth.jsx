import React, { useState } from "react";
import { FormLogin } from "../components/organims/forms/FormLogin";
import { FormRegister } from "../components/organims/forms/FormRegister";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { paths } from "../routes/paths";
import { Icons } from "../assets/icons/IconsProvider";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { CarouselLogin } from "../components/organims/carousel/CarouselLogin/CarouselLogin";
const { IconWeb2, IconWeb, IconArrowLeft } = Icons;

export const TemplateAuth = () => {
  const { isLogged } = useSelector((state) => state.auth);

  const [currentSection, setCurrentSection] = useState(0);

  const LOGIN_REGISTER = {
    0: <FormLogin setCurrentSection={() => setCurrentSection(1)} />,
    1: <FormRegister toast={toast} />,
  };

  if (isLogged) {
    return <Navigate to={paths.HOME} />;
  }

  return (
    <div className="w-full h-[100dvh] grid lg:grid-cols-2 grid-cols-1">
      <Toaster position="bottom-left" reverseOrder={true} />
      <article className=" flex flex-col">
        <section className=" w-full h-[100px] flex justify-center items-center gap-2">
          <div className="w-8 h-8">
            <img className="w-full h-full" src={IconWeb} alt="" />
          </div>
          <h1 className=" xl:text-2xl text-xl text-primary font-semibold">
            EssenSalud
          </h1>
        </section>
        <section className=" w-full flex-1 flex flex-col justify-center items-center">
          <div className="w-auto px-5 max-w-[450px] ">
            {currentSection === 1 && (
              <div className=" mb-10">
                <button
                  onClick={() => setCurrentSection(0)}
                  className="w-10 h-10 hover:bg-[#f7f7f7] transition-all ease-in duration-200 border-gray-light-custom border rounded-full grid place-items-center cursor-pointer"
                >
                  <img className="w-6" src={IconArrowLeft} alt="" />
                </button>
              </div>
            )}
            <div className=" h-auto w-full flex flex-col justify-center items-center ">
              <h1 className="font-bold text-black-custom xl:text-2xl text-xl text-center">
                {currentSection === 0
                  ? "Bienvenido de vuelta"
                  : "Hola , bienvenido a EssenSalud"}
              </h1>
              <p className="font-normal xl:text-base text-sm text-black-custom text-center">
                {currentSection === 0
                  ? "Bienvenido a EssenSalud , ingresa tus credenciales para acceder."
                  : "Ingresa tus datos personales , tu fecha de nacimiento y registrate para comenzar."}
              </p>
            </div>
            <div className=" w-full mt-6">
              {Object.entries(LOGIN_REGISTER).map(([dataId, dataComponent]) => {
                const data = currentSection === Number(dataId);
                return data ? (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    // transition={{ type: "spring", stiffness: 700, damping: 20 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                    key={dataId}
                  >
                    {dataComponent}
                  </motion.div>
                ) : null;
              })}
            </div>
          </div>
        </section>
      </article>
      <article className=" bg-primary lg:flex hidden">
        <CarouselLogin />
      </article>
    </div>
  );
};
