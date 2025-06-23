import React from "react";
import { FormRegister } from "../../forms/FormRegister";

export const CreateUserComponentModal = ({ toast , functionHelpCreateUserHome }) => {
  return (
    <div className="mt-8">
      <FormRegister functionHelp={functionHelpCreateUserHome} toast={toast} rol={true} />
    </div>
  );
};
