import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rolePaths } from "../../../routes/rolePaths";

export const RedirectByRole = () => {
  const { rol } = useSelector((state) => state.auth);

  if (!rol) return null; // Puedes poner un loader si quieres

  const defaultPath = rolePaths[rol]?.[0] || "/"; // Primer path permitido
  return <Navigate to={defaultPath} replace />;
};
