import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ButtonTypeA } from "../../../components/molecules/buttons/ButtonTypeA";
import { Icons } from "../../../assets/icons/IconsProvider";
import { CardHealthyPlan } from "../../../components/organims/cards/CardHealthyPlan";
import { useHealthyPlan } from "../../../hooks/useHealthyPlans.hooks";
import { useDispatch, useSelector } from "react-redux";
import { LoaderComponent } from "../../../components/molecules/loader/LoaderComponent";
import { ValidateModal } from "../../../components/organims/modal/validateModal/ValidateModal";
import { Modal } from "../../../components/organims/modal/Modal";
import { getInfoAffiliateAction } from "../../../redux/actions/affiliatesAction/affiliates.action";
import { useAffiliate } from "../../../hooks/useAffiliates.hooks";
const { IconCheckGreen } = Icons;

export const HealthyPlans = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [indexButtonChooseen, setIndexButtonChooseen] = useState(null);
  const [planChoosee, setPlanChoosee] = useState(null);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const { healthyPlans } = useSelector((state) => state.healthyPlan);
  const { affiliate } = useSelector((state) => state.affiliates);

  const { getAllHealthyPlansFunction } = useHealthyPlan();
  const { getOneAffiliateFunction } = useAffiliate();

  const openModalConfirmFunction = (i) => {
    setPlanChoosee(i);
    setOpenModalConfirm(true);
  };

  const closeModalConfirmFunction = () => {
    setPlanChoosee(null);
    setOpenModalConfirm(false);
  };

  const choosePlanFunction = () => {
    setIndexButtonChooseen(planChoosee);
    setOpenModalConfirm(false);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          getOneAffiliateFunction(),
          getAllHealthyPlansFunction(),
        ]);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (affiliate?.healthyPlanId != null) {
      set;
    }
  }, []);

  console.log(affiliate);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="sm:p-4 p-3  flex-1 flex flex-col overflow-y-auto"
    >
      <div className=" flex justify-center">
        <span className="bg-primary text-white p-1 w-[100px] rounded-xl grid place-items-center">
          <p>Precio</p>
        </span>
      </div>
      <div className="flex justify-center">
        <h1 className="text-center mt-4 font-semibold text-black-custom sm:text-[35px] text-[28px] lg:w-[40%] md:w-[60%] w-[80%]">
          Los mejores planes de salud
        </h1>
      </div>
      {loading ? (
        <div className="flex-1 grid place-items-center">
          <LoaderComponent />
        </div>
      ) : (
        <div className=" flex-1 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 mt-3 gap-4">
          {healthyPlans?.map((plan, i) => (
            <CardHealthyPlan
              key={plan?.id}
              namePlan={plan?.name}
              description={plan?.description}
              price={plan?.month_cost}
              middle={i === 1}
              choosePlan={plan?.id === indexButtonChooseen}
              actionButton={() => openModalConfirmFunction(plan?.id)}
              checkPlan={plan?.id === indexButtonChooseen}
            />
          ))}
        </div>
      )}
      <Modal
        isOpen={openModalConfirm}
        closeModal={() => closeModalConfirmFunction()}
        styleHW="w-[400px]"
      >
        <ValidateModal
          actionCancel={() => choosePlanFunction()}
          actionDelete={() => closeModalConfirmFunction()}
          title={"¿Estás seguro de escoger el plan?"}
          subtitle={"En cualquier momento puedes cambiar de plan"}
          textFirstButton="Escoger"
          textSecondButton="Cancelar"
          oderButton="last"
        />
      </Modal>
    </motion.div>
  );
};
