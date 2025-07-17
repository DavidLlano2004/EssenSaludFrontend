import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyTokenRequest } from "../redux/actions/authAction/auth.action";
import { loginCase, singOffCase } from "../redux/slices/authSlice/Auth.Slice";
import { useUIContext } from "../context/UIContext";

export const useAuthInitializer = () => {
  const { setIsLoading } = useUIContext();
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await verifyTokenRequest();

        if (!res?.data?.response) {
          setIsLoading(false);
          dispatch(singOffCase());
          return;
        }

        const userData = res?.data?.response;
        dispatch(
          loginCase({
            email: userData?.email,
            name: userData?.name,
            rol: userData?.rol,
            birthday: userData?.birthday,
            id: userData?.id,
            state: userData?.state,
            gender: userData?.gender,
          })
        );
      } catch (error) {
        dispatch(singOffCase());
      }
    }

    checkLogin();
  }, [dispatch]);
};
