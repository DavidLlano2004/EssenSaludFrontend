import React from "react";
import { singOffCaseAction } from "../../../redux/actions/authAction/auth.action";
import { useDispatch } from "react-redux";

export const HomeApp = () => {
  const dispatch = useDispatch();

  const singOffCaseFunction = async () => {
    try {
      const response = await dispatch(singOffCaseAction());
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button
        onClick={() => singOffCaseFunction()}
        className="bg-red-800 p-2 m-2 rounded-lg text-white"
      >
        Salir
      </button>
    </div>
  );
};
