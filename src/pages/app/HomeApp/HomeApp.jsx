import React from "react";
import { useDispatch } from "react-redux";
import { singOffCase } from "../../../redux/slices/authSlice/Auth.Slice";
import { singOffCaseAction } from "../../../redux/actions/authAction/auth.action";

export const HomeApp = () => {
  const dispatch = useDispatch();

  const singOffCaseFunction = async () => {
    try {
      const response = await singOffCaseAction();
      dispatch(singOffCase())
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
