import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useInvoices } from "../../../hooks/useInvoices.hooks";
import { LoaderComponent } from "../../../components/molecules/loader/LoaderComponent";
import { EmptyData } from "../../../components/molecules/emptyData/EmptyData";
import { TableInvoices } from "../../../components/organims/tables/TableInvoices";
import { motion } from "framer-motion";
import { useFormattedPrice } from "../../../hooks/useFormattedPrice";
import { Modal } from "../../../components/organims/modal/Modal";
import toast, { Toaster } from "react-hot-toast";
import { ValidateModal } from "../../../components/organims/modal/validateModal/ValidateModal";

const Invoices = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataVoice, setDataVoice] = useState(null);
  const [loadingButtonPay, setLoadingButtonPay] = useState(false);
  const [openModalValidate, setOpenModalValidate] = useState(false);
  const [flagUpdateInvoice, setFlagUpdateInvoice] = useState(false);

  const { invoicesByUsers, invoiceTotalByUser } = useSelector(
    (state) => state.invoice
  );
  const { userId } = useSelector((state) => state.auth);

  const {
    getAllInvoicesByUserFunction,
    getTotalInvoiceByUserFunction,
    updateInvoiceFunction,
  } = useInvoices();

  const [tabsState, setTabsState] = useState([
    {
      id: 0,
      name: "Todas las facturas",
      isActive: true,
    },
    {
      id: 1,
      name: "Pendientes",
      isActive: false,
    },
    {
      id: 2,
      name: "Pagadas",
      isActive: false,
    },
  ]);

  const navigateOnPages = (id) => {
    setTabsState((prevUsers) =>
      prevUsers.map((item) => ({
        ...item,
        isActive: item?.id === id,
      }))
    );
    setCurrentSection(id);
  };

  const actionPayInvoiceUI = (data) => {
    setDataVoice(data);
    setOpenModalValidate(true);
  };

  const closeModalValidate = () => {
    setDataVoice(null);
    setOpenModalValidate(false);
  };

  const onStartFunctionUpdateInvoice = () => {
    setLoadingButtonPay(true);
  };

  const onSuccessFunctionUpdateAffiliate = () => {
    toast.success("¡Factura pagada correctamente!", { duration: 3000 });
    setLoadingButtonPay(false);
    setOpenModalValidate(false);
    setDataVoice(null);
    setFlagUpdateInvoice((prev) => !prev);
  };

  const updateInvoiceOnSubmit = () => {
    const newData = {
      payment_status: "Pagada",
    };
    updateInvoiceFunction({
      idInvoice: dataVoice?.id,
      dataForm: newData,
      onStart: onStartFunctionUpdateInvoice,
      onSuccess: onSuccessFunctionUpdateAffiliate,
    });
  };

  const filteredVoices = useMemo(() => {
    switch (currentSection) {
      case 0:
        return invoicesByUsers;
      case 1:
        return invoicesByUsers?.filter(
          (voice) => voice?.payment_status === "Pendiente"
        );
      default:
        return invoicesByUsers?.filter(
          (voice) => voice?.payment_status === "Pagada"
        );
    }
  }, [currentSection, invoicesByUsers]);

  useEffect(() => {
    Promise.all([
      getAllInvoicesByUserFunction(userId),
      getTotalInvoiceByUserFunction(userId),
    ]).then(() => setLoading(false));
  }, [flagUpdateInvoice]);

  const formattedPrice = useFormattedPrice(invoiceTotalByUser);

  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className=" p-4 h-full flex flex-col"
    >
      <Toaster position="bottom-right" reverseOrder={true} />
      {invoicesByUsers?.length != 0 && (
        <>
          <div className="flex items-center justify-between">
            <div className="min-h-8 mt-4 gap-3 lg:flex hidden ">
              {tabsState?.map((tab) => (
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
            <div className="bg-white sm:w-auto w-full rounded-xl sm:justify-normal justify-center py-4 px-4 gap-2 shadow-lg flex items-center mb-3">
              <p className="text-lg font-medium text-black-custom">Total:</p>
              <p className="text-lg font-medium text-black-custom ">
                <b className="font-medium text-secondary">$</b> {formattedPrice}{" "}
                COP
              </p>
            </div>
          </div>
          <div className=" bg-[#EBEEF2] w-full h-[2px] mb-3 lg:flex hidden">
            <motion.div
              animate={{ x: currentSection * (180 + 12) }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-primary h-1 w-[180px] rounded-tl-3xl rounded-tr-3xl"
            ></motion.div>
          </div>
        </>
      )}
      <div className="flex-1 w-full mt-4 overflow-y-auto flex flex-col">
        {loading ? (
          <div className="h-full flex justify-center items-center">
            <LoaderComponent />
          </div>
        ) : filteredVoices?.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            <EmptyData textEmpty={"Aún no tienes facturas"} />
          </div>
        ) : (
          <TableInvoices
            invoices={filteredVoices}
            actionPay={actionPayInvoiceUI}
          />
        )}
      </div>
      <Modal
        isOpen={openModalValidate}
        closeModal={() => closeModalValidate()}
        styleHW="w-[450px]"
        itemsStart="items-center"
      >
        <ValidateModal
          actionCancel={() => updateInvoiceOnSubmit()}
          actionDelete={() => closeModalValidate()}
          title={`¿Estás seguro de pagar esta factura?`}
          subtitle={"Cubre tu deuda con EssenSalud"}
          textFirstButton="Pagar"
          textSecondButton="Cancelar"
          oderButton="last"
          loadingButton={loadingButtonPay}
        />
      </Modal>
    </motion.article>
  );
};

export default Invoices;
