import React, { useState } from "react";
import { Icons } from "../../../assets/icons/IconsProvider";
import { paths } from "../../../routes/paths";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.hooks";
import { Images } from "../../../assets/images/ImagesProvider";
import { AnimatePresence } from "framer-motion";
import { MenuFloat } from "../../molecules/menuFloat/MenuFloat";
import { OptionsProfile } from "../modal/optionsProfile/OptionsProfile";
import { useSelector } from "react-redux";
import { truncateText } from "../../../helpers/truncateText";
const { IconMenuHamburguesa, IconArrowDownBlackCustom, IconUser } = Icons;
const { ImgAvatarMen, ImgAvatarWoman } = Images;

export const Header = ({ setViewMenuSm }) => {
  const { gender, name, rol, email } = useSelector((state) => state.auth);

  const [activeMenu, setActiveMenu] = useState(false);
  const [menuOptionsProfile, setMenuOptionsProfile] = useState(false);
  const { fetchSignOut } = useAuth();

  const navigate = useNavigate();

  const optionsAccount = [
    {
      id: 1,
      title: "Perfil",
      img: IconUser,
      handleClick: () => {
        navigate(paths.PROFILE);
        setActiveMenu(false);
      },
    },
  ];

  const dataProfile = {
    nameUser: name,
    email: email,
    gender: gender,
    rol: rol,
  };

  return (
    <div className="h-auto bg-white border-b border-[#E6EFF5] flex items-center sm:justify-end justify-between px-4 py-3">
      <button className="sm:hidden flex" onClick={() => setViewMenuSm(true)}>
        <img className="w-5" src={IconMenuHamburguesa} alt="" />
      </button>

      <div className="flex items-center gap-3">
        <img
          className="w-10"
          src={gender === "Masculino" ? ImgAvatarMen : ImgAvatarWoman}
          alt=""
        />
        <div className="sm:flex flex-col hidden">
          <p className="text-black-custom font-semibold text-sm">
            {truncateText(name, 18)}
          </p>
          <p className="text-black-custom font-normal text-xs">{rol}</p>
        </div>
        <button
          onClick={() => setActiveMenu((prev) => !prev)}
          className="w-6 h-6 sm:grid border border-gray-light-custom bg-white hover:bg-[#f1f1f1] hover:scale-[98%] transition-all ease-in duration-150 rounded-md hidden place-items-center cursor-pointer"
        >
          <img className="w-3" src={IconArrowDownBlackCustom} alt="" />
        </button>
        <button
          onClick={() => setMenuOptionsProfile((prev) => !prev)}
          className="w-6 h-6 sm:hidden border border-gray-light-custom bg-white hover:bg-[#f1f1f1] hover:scale-[98%] transition-all ease-in duration-150 rounded-md grid place-items-center cursor-pointer"
        >
          <img className="w-3" src={IconArrowDownBlackCustom} alt="" />
        </button>
      </div>
      <AnimatePresence>
        {activeMenu && (
          <MenuFloat
            activeMenu={activeMenu}
            options={optionsAccount}
            signOutAppAction={() => fetchSignOut()}
            setActiveMenu={setActiveMenu}
            dataProfile={dataProfile}
          />
        )}
      </AnimatePresence>
      <OptionsProfile
        setViewMenuSm={setMenuOptionsProfile}
        isopenModal={menuOptionsProfile}
        dataProfile={dataProfile}
        fetchSignOut={() => fetchSignOut()}
      />
    </div>
  );
};
