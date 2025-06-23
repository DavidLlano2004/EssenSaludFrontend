import React from "react";
import { Icons } from "../../../assets/icons/IconsProvider";
const { IconDeleteRed, IconEditYellow, IconSeeGreen } = Icons;

export const TableUsers = ({
  users = [],
  actionDelete = () => {},
  actionEdit = () => {},
  actionView = () => {},
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="w-full bg-white px-3">
        <thead className=" text-sm text-black-custom border-b border-[#F2F4F7]">
          <tr className="">
            <th scope="col" className="text-start px-6 py-3 lg:flex hidden">
              Nombre
            </th>
            <th scope="col" className="text-start px-6 py-3">
              Correo
            </th>
            <th scope="col" className="text-start px-6 py-3">
              Rol
            </th>
            <th scope="col" className="text-start px-6 py-3">
              Estado
            </th>
            <th scope="col" className="text-center px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className=" text-gray-dark-custom text-sm">
          {users?.map((user) => (
            <tr key={user?.id} className="border-b border-[#F2F4F7]">
              <td className="px-6 py-4 lg:flex hidden">{user?.name}</td>
              <td className="px-6 py-4">{user?.email}</td>
              <td className="px-6 py-4">{user?.rol}</td>
              <td className="px-6 py-4">
                {user?.state === 1 ? "Activo" : "Inactivo"}
              </td>
              <td className="px-6 py-4">
                <div className=" flex justify-center gap-5">
                  <button
                    onClick={() => actionView(user)}
                    className=" w-9 h-9 rounded-lg bg-secondary/20 hover:bg-secondary/30 cursor-pointer grid place-items-center transition-all ease-in duration-150"
                  >
                    <img className="w-4" src={IconSeeGreen} alt="" />
                  </button>
                  <button
                    onClick={() => actionEdit(user)}
                    className=" w-9 h-9 rounded-lg bg-yellow-custom/20 hover:bg-yellow-custom/30 cursor-pointer grid place-items-center transition-all ease-in duration-150"
                  >
                    <img className="w-4" src={IconEditYellow} alt="" />
                  </button>
                  <button
                    onClick={() => actionDelete(user)}
                    className=" w-9 h-9 rounded-lg bg-red-custom/20 hover:bg-red-custom/30 cursor-pointer grid place-items-center transition-all ease-in duration-150"
                  >
                    <img className="w-4" src={IconDeleteRed} alt="" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
