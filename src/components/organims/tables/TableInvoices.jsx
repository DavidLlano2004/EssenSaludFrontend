import React from "react";
import { Icons } from "../../../assets/icons/IconsProvider";
import {
  formatearFechaConSlashes,
  formatearHoraA12Horas,
} from "../../../helpers/truncateDate";
import { formatPrice } from "../../../helpers/truncatePrice";
const { IconDollarPayGreen, IconCheckGreenLine } = Icons;

export const TableInvoices = ({ invoices = [], actionPay = () => {} }) => {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="w-full bg-white px-3">
        <thead className=" text-sm text-black-custom border-b border-[#F2F4F7]">
          <tr className="">
            <th scope="col" className="text-start px-6 py-3">
              Especialista
            </th>
            <th scope="col" className="text-start px-6 py-3">
              C. Médico
            </th>
            <th scope="col" className="text-start px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="text-start px-6 py-3">
              Hora
            </th>
            <th scope="col" className="text-start px-6 py-3">
              Costo
            </th>
            <th scope="col" className="text-start px-6 py-3">
              Estado de pago
            </th>
            <th scope="col" className="text-center px-6 py-3">
              Pagar
            </th>
          </tr>
        </thead>

        <tbody className=" text-gray-dark-custom text-sm">
          {invoices?.map((invoice) => (
            <tr key={invoice?.id} className="border-b border-[#F2F4F7]">
              <td className="px-6 py-4">
                {invoice?.infoProfessional?.user?.name}
              </td>
              <td className="px-6 py-4">{invoice?.nameCenter}</td>
              <td className="px-6 py-4">
                {formatearFechaConSlashes(invoice?.infoAppointment?.date)}
              </td>
              <td className="px-6 py-4">
                {formatearHoraA12Horas(invoice?.infoAppointment?.time)}
              </td>
              <td className="px-6 py-4">$ {formatPrice(invoice?.cost)} </td>
              <td
                className={`px-6 py-4 font-semibold ${
                  invoice?.payment_status === "Pendiente"
                    ? "text-yellow-custom"
                    : "text-secondary"
                }`}
              >
                {invoice?.payment_status}
              </td>
              <td className="px-6 py-4">
                <div className=" flex justify-center gap-5">
                  <button
                    onClick={() => actionPay(invoice)}
                    className={`w-9 h-9 rounded-lg bg-secondary/20 ${
                      invoice?.payment_status === "Pendiente" &&
                      "hover:bg-secondary/30 cursor-pointer"
                    }   grid place-items-center transition-all ease-in duration-150`}
                  >
                    <img
                      className={`${
                        invoice?.payment_status === "Pendiente"
                          ? "w-[10px]"
                          : "w-4"
                      }`}
                      src={
                        invoice?.payment_status === "Pendiente"
                          ? IconDollarPayGreen
                          : IconCheckGreenLine
                      }
                      alt=""
                    />
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
