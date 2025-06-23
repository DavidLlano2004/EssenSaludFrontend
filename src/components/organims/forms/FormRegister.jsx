import React from "react";
import { InputSimple } from "../../molecules/inputs/InputSimple";
import { useForm } from "react-hook-form";
import { Icons } from "../../../assets/icons/IconsProvider";
import { InputController } from "../../molecules/inputs/InputController/InputController";
import { useState } from "react";
import { RulesPassword } from "../../molecules/rulesPassword/RulesPassword";
import { arrayRulesPassword } from "../../../helpers/ValidationPassword";
import { ButtonTypeA } from "../../molecules/buttons/ButtonTypeA";
import { registerAppAction } from "../../../redux/actions/authAction/auth.action";
import { useIsAdult } from "../../../hooks/useIsAdult";
import { CustomAlert } from "../../molecules/customAlert/CustomAlert";
import { CustomSelect } from "../../molecules/select/SelectSimple";
const { IconEmail, IconUser, IconDateInput, IconPasswordInput, IconRolesGray } =
  Icons;

export const FormRegister = ({ toast, rol, functionHelp }) => {
  const [focusInputPassword, setFocusInputPassword] = useState(false);
  const [flagCorrectPassword, setFlagCorrectPassword] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [alertText, setAlertText] = useState(null);

  const {
    formState: { errors },
    register,
    control,
    watch,
    handleSubmit,
    reset,
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const dataForm = watch();

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  let confirmPasswordBorderP = "border-red-500 "; // rojo por defecto
  if (!flagCorrectPassword) {
    confirmPasswordBorderP = "border-gray-300"; // gris si está deshabilitado
  } else if (passwordsMatch) {
    confirmPasswordBorderP = "border-green-500"; // verde si coinciden
  }

  let confirmPasswordBorderCP = "border-red-500 "; // rojo por defecto
  let disable = false; // rojo por defecto
  if (!flagCorrectPassword) {
    confirmPasswordBorderCP = "border-gray-300 bg-gray-200"; // gris si está deshabilitado
    disable = true;
  } else if (passwordsMatch) {
    confirmPasswordBorderCP = "border-green-500"; // verde si coinciden
    disable = false;
  }

  const rolesApp = [
    {
      value: 1,
      label: "Afiliado",
    },
    {
      value: 1,
      label: "Profesional",
    },
    {
      value: 1,
      label: "Administrador",
    },
  ];

  const esMayorDeEdad = useIsAdult(dataForm?.birthday);

  const registerFunction = async () => {
    setButtonLoading(true);

    if (!esMayorDeEdad) {
      setButtonLoading(false);
      setAlertText("Debe de ser mayor de edad");
      return;
    }

    try {
      const newData = {
        email: dataForm?.email,
        name: dataForm?.name,
        birthday: dataForm?.birthday,
        password: dataForm?.password,
        rol: dataForm?.rol?.label || "Afiliado",
      };
      const response = await registerAppAction(newData);
      if (response) {
        toast.success("¡Usuario registrado correctamente!", { duration: 5000 });
        setButtonLoading(false);
        setAlertText(null);
        reset({
          name: "",
          birthday: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setFlagCorrectPassword(false);
        functionHelp();
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(dataForm);

  return (
    <div>
      <form
        onSubmit={handleSubmit(registerFunction)}
        className="flex flex-col gap-4"
      >
        {rol && (
          <CustomSelect
            control={control}
            name="rol"
            staticData={rolesApp}
            rules={{ required: "El tipo de usuario es requerido" }}
            placeholder="Tipo de usuario"
            keyOption="label"
            styleLabel="xl:text-base text-sm flex justify-between"
          />
        )}

        <InputSimple
          errors={errors}
          inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
          iconInput={IconUser}
          nameRegister={"name"}
          register={register}
          validations={{
            required: "El nombre es requerido",
          }}
          placeholder="Ingresa tu nombre"
        />
        <div>
          <InputSimple
            errors={errors}
            inputStyle="border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
            iconInput={IconDateInput}
            nameRegister={"birthday"}
            type="date"
            register={register}
            validations={{
              required: "La fecha es requerida",
            }}
            placeholder="Ingresa tu fecha de nacimiento"
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
            required: "El correo es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Ingresa una dirección de correo electrónico válida",
            },
          }}
          placeholder="Ingresa tu correo"
        />
        <InputController
          control={control}
          name={"password"}
          placeholder="Ingresa tu contraseña"
          type="password"
          styleDiv="w-full mt-6"
          styleInput={`border border-gray-light-custom xl:py-3 py-[10px] text-base focus:outline-0 pl-12 pr-3 rounded-2xl text-black-custom w-full  ${
            confirmPasswordBorderP
              ? confirmPasswordBorderP
              : "focus:border-black-custom transition-all ease-in duration-200 "
          }`}
          iconInput={IconPasswordInput}
          rules={{ required: "Por favor, ingresa tu contraseña" }}
          inputProps={{
            onFocus: () => setFocusInputPassword(true),
            onBlur: () => setFocusInputPassword(false),
          }}
        />

        {/* Aquí aparecen las reglas solo cuando se enfoca el input */}
        {focusInputPassword && (
          <RulesPassword
            arrayRulesPassword={arrayRulesPassword(password)}
            confirmPassword={confirmPassword}
            password={password}
            setFlagCorrectPassword={setFlagCorrectPassword}
          />
        )}

        <InputController
          disabled={disable}
          control={control}
          name={"confirmPassword"}
          placeholder="Confirma tu contraseña"
          type="password"
          styleDiv="w-full mt-6"
          styleInput={`border border-gray-light-custom xl:py-3 py-[10px] text-base focus:outline-0 pl-12 pr-3 rounded-2xl text-black-custom w-full ${
            confirmPasswordBorderCP
              ? confirmPasswordBorderCP
              : "focus:border-black-custom transition-all ease-in duration-200 "
          }`}
          iconInput={IconPasswordInput}
          rules={{
            required: "Por favor, confirma tu contraseña",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          }}
        />
        <ButtonTypeA
          submitBtn={true}
          text={rol ? "Registrar usuario" : "Registrarse"}
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
