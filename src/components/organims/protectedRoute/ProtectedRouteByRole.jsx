import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { paths } from "../../../routes/paths";
import { rolePaths } from "../../../routes/rolePaths";

export const ProtectedRouteByRole = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  const currentPath = location.pathname;
  const allowedPaths = rolePaths[auth?.rol] || [];

  if (!auth?.rol) {
    // Espera a que se rehidrate redux-persist
    return null; // o un loader
  }


  return allowedPaths.includes(currentPath) ? (
    <Outlet />
  ) : (
    <Navigate to={paths.TEMPLATEAPP} />
  );
};
