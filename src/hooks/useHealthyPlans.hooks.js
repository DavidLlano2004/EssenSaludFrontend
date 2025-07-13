import { useDispatch } from "react-redux";
import { getAllHealthyPlansAction } from "../redux/actions/healthyPlansAction/HealthyPlans.action";

export const useHealthyPlan = () => {
  const dispatch = useDispatch();

  const getAllHealthyPlansFunction = async () => {
    try {
      const data = await dispatch(getAllHealthyPlansAction());
      if (data?.error) {
        console.error("Error al obtener centros:", data?.error);
        return { state: 500, error: data?.error };
      }
      return { state: 200 };
    } catch (error) {
      console.error("Error inesperado:", error);
      return { state: 500, error: error };
    }
  };

  
  return {
    getAllHealthyPlansFunction,
  };
};
