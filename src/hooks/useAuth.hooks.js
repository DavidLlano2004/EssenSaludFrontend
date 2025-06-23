import { useDispatch } from "react-redux";
import { persistor } from "../redux/store";
import { singOffCaseAction } from "../redux/actions/authAction/auth.action";
import { singOffCase } from "../redux/slices/authSlice/Auth.Slice";

export const useAuth = () => {

  const dispatch = useDispatch();

  const fetchSignOut = async () => {
    try {
      await persistor.purge();
      dispatch({ type: "RESET_STATE" });
      await singOffCaseAction();
      dispatch(singOffCase());
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };
  
  return {
    fetchSignOut,
  };
};
