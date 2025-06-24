import React from "react";
import { InputSimple } from "../../../molecules/inputs/InputSimple";
import { useForm } from "react-hook-form";
import { Icons } from "../../../../assets/icons/IconsProvider";
import { InputController } from "../../../molecules/inputs/InputController/InputController";
import { useState } from "react";
import { RulesPassword } from "../../../molecules/rulesPassword/RulesPassword";
import { arrayRulesPassword } from "../../../../helpers/ValidationPassword";
import { ButtonTypeA } from "../../../molecules/buttons/ButtonTypeA";
import { registerAppAction } from "../../../../redux/actions/authAction/auth.action";
import { useIsAdult } from "../../../../hooks/useIsAdult";
import { CustomAlert } from "../../../molecules/customAlert/CustomAlert";
import { CustomSelect } from "../../../molecules/select/SelectSimple";
import { useUsers } from "../../../../hooks/useUsers.hooks";
const { IconEmail, IconUser, IconDateInput, IconPasswordInput, IconRolesGray } =
  Icons;

export const UpdateComponentModal = ({
  toast,
  rol,
  userId,
  userData,
  setFlagCreateUserHome,
  closeModalUpdateUser,
}) => {
  const { updateUserFunction } = useUsers();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [alertText, setAlertText] = useState(null);

  const defaultValues = {
    state: userData?.state === 1,
  };

  const {
    formState: { errors },
    register,
    control,
    watch,
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const dataForm = watch();

  const rolesApp = [
    {
      value: 1,
      label: "Afiliado",
    },
    {
      value: 2,
      label: "Profesional",
    },
    {
      value: 3,
      label: "Administrativo",
    },
  ];

  const validateRolId = () => {
    let idOption = 1;
    switch (userData?.rol) {
      case "Afiliado":
        idOption = idOption;
        break;
      case "Profesional":
        idOption = 2;
        break;

      default:
        idOption = 3;
        break;
    }

    return idOption;
  };

  const esMayorDeEdad = useIsAdult(dataForm?.birthday);

  const onStartFunctionUpdateUser = () => {
    setButtonLoading(true);

    if (!esMayorDeEdad) {
      setButtonLoading(false);
      setAlertText("Debe de ser mayor de edad");
      return;
    }
  };

  const onSuccessFunctionUpdateUser = () => {
    toast.success("¡Usuario editado correctamente!", { duration: 3000 });
    setButtonLoading(false);
    setAlertText(null);
    setFlagCreateUserHome((prev) => !prev);
    reset({
      name: "",
      birthday: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    closeModalUpdateUser();
    setFlagCorrectPassword(false);
  };

  const onSubmit = () => {
    const newInfo = {
      email: dataForm?.email || userData?.email,
      name: dataForm?.name || userData?.name,
      state: userData === 1,
      birthday: dataForm?.birthday || userData?.birthday,
      rol: dataForm?.rol?.label || userData?.rol,
    };
    updateUserFunction({
      userId,
      dataForm: newInfo,
      onStart: onStartFunctionUpdateUser,
      onSuccess: onSuccessFunctionUpdateUser,
    });
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {rol && (
          <CustomSelect
            control={control}
            name="rol"
            staticData={rolesApp}
            placeholder="Tipo de usuario"
            keyOption="label"
            styleLabel="xl:text-base text-sm flex justify-between"
            defaultValue={{
              label: userData?.rol,
              value: validateRolId(),
            }}
          />
        )}

        <InputSimple
          errors={errors}
          inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
          iconInput={IconUser}
          nameRegister={"name"}
          register={register}
          placeholder="Ingresa tu nombre"
          defaultValue={userData?.name}
        />
        <div>
          <InputSimple
            errors={errors}
            inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
            iconInput={IconDateInput}
            nameRegister={"birthday"}
            type="date"
            register={register}
            placeholder="Ingresa tu fecha de nacimiento"
            defaultValue={userData?.birthday}
          />
          {alertText && <CustomAlert message={alertText} type="error" />}
        </div>

        <InputSimple
          errors={errors}
          inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
          iconInput={IconEmail}
          nameRegister={"email"}
          register={register}
          validations={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Ingresa una dirección de correo electrónico válida",
            },
          }}
          placeholder="Ingresa tu correo"
          defaultValue={userData?.email}
        />
        <ButtonTypeA
          submitBtn={true}
          text={"Editar usuario"}
          bgColor="bg-primary"
          txColor="text-white"
          bdWidth="0px"
          bgHvColor="hover:bg-primary-hover"
          width="w-full"
          alternativeStyle="flex items-center justify-center gap-2 text-base cursor-pointer"
          heigthButton={"xl:h-[50px] h-[43px]"}
          loading={buttonLoading}
        />
      </form>
    </div>
  );
};
