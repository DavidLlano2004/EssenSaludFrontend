import React from "react";
import { Icons } from "../../../assets/icons/IconsProvider";
const { IconDeleteRed, IconEditYellow, IconSeeGreen } = Icons;

export const TableHealthyCenters = ({
  healthyCenters = [],
  actionDelete = () => {},
  actionEdit = () => {},
  actionView,
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="w-full bg-white px-3">
        <thead className=" text-sm text-black-custom border-b border-[#F2F4F7]">
          <tr className="">
            <th scope="col" className="text-start px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="text-start px-6 py-3">
              Dirección
            </th>
            <th scope="col" className="text-start px-6 py-3">
              Teléfono
            </th>
            <th scope="col" className="text-start px-6 py-3">
              Ciudad
            </th>
            <th scope="col" className="text-center px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className=" text-gray-dark-custom text-sm">
          {healthyCenters?.map((healthyCenter) => (
            <tr key={healthyCenter?.id} className="border-b border-[#F2F4F7]">
              <td className="px-6 py-4">{healthyCenter?.name}</td>
              <td className="px-6 py-4">{healthyCenter?.address}</td>
              <td className="px-6 py-4">{healthyCenter?.phone}</td>
              <td className="px-6 py-4">{healthyCenter?.city}</td>
              <td className="px-6 py-4">
                <div className=" flex justify-center gap-5">
                  {actionView && (
                    <button
                      onClick={() => actionView(healthyCenter)}
                      className=" w-9 h-9 rounded-lg bg-secondary/20 hover:bg-secondary/30 cursor-pointer grid place-items-center transition-all ease-in duration-150"
                    >
                      <img className="w-4" src={IconSeeGreen} alt="" />
                    </button>
                  )}
                  <button
                    onClick={() => actionEdit(healthyCenter)}
                    className=" w-9 h-9 rounded-lg bg-yellow-custom/20 hover:bg-yellow-custom/30 cursor-pointer grid place-items-center transition-all ease-in duration-150"
                  >
                    <img className="w-4" src={IconEditYellow} alt="" />
                  </button>
                  <button
                    onClick={() => actionDelete(healthyCenter)}
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
