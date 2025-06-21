import React, { useEffect, useState } from "react";
import { InputSimple } from "../../molecules/inputs/InputSimple";
import { useForm } from "react-hook-form";
import { Icons } from "../../../assets/icons/IconsProvider";
import { InputController } from "../../molecules/inputs/InputController/InputController";
import { ButtonTypeA } from "../../molecules/buttons/ButtonTypeA";
import { loginAppAction } from "../../../redux/actions/authAction/auth.action";
import { useDispatch } from "react-redux";
import { CustomAlert } from "../../molecules/customAlert/CustomAlert";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../routes/paths";
import { loginCase } from "../../../redux/slices/authSlice/Auth.Slice";
const { IconEmail, IconPasswordInput } = Icons;

export const FormLogin = ({ setCurrentSection, toast }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [alertext, setAlertext] = useState(null);
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
    register,
  } = useForm({ defaultValues });

  const dataForm = watch();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginFunction = async () => {
    setButtonLoading(true);
    try {
      const data = await loginAppAction(dataForm);

      const { error, verify, response } = data;

      if (error) {
        setAlertext(error);
        setButtonLoading(false);
        return;
      }

      if (verify) {
        navigate(paths.HOME);
        setButtonLoading(false);
        dispatch(loginCase(response));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = handleSubmit(loginFunction);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertext(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [alertext]);


  return (
    <form onSubmit={onSubmit} action="" className="flex flex-col gap-5">
      <InputSimple
        label={"Correo electrónico"}
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
        hadleOnEnter={onSubmit}
      />
      <div>
        <InputController
          control={control}
          name={"password"}
          placeholder="Ingresa tu contraseña"
          type="password"
          styleDiv="w-full mt-6"
          styleInput="border border-gray-light-custom xl:py-3 py-[10px] focus:border-black-custom transition-all ease-in duration-200 focus:outline-0 text-base pl-12 pr-3 rounded-2xl text-black-custom w-full"
          iconInput={IconPasswordInput}
          rules={{ required: "Por favor, ingresar tu contraseña" }}
          hadleOnEnter={onSubmit}
        />

        {alertext && (
          <CustomAlert fullWidth={true} message={alertext} type="error" />
        )}
      </div>

      <ButtonTypeA
        submitBtn={true}
        text="Iniciar sesión"
        bgColor="bg-primary"
        txColor="text-white"
        bdWidth="0px"
        bgHvColor="hover:bg-primary-hover"
        width="w-full"
        alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer"
        heigthButton={"xl:h-[50px] h-[43px]"}
        loading={buttonLoading}
      />

      <div className="flex gap-2 text-dark-black justify-end xl:text-base text-[14px]">
        <p className="text-black-custom">¿ Aún no tienes una cuenta?</p>
        <button
          onClick={setCurrentSection}
          type="button"
          className="underline cursor-pointer text-black-custom"
        >
          Regístrate
        </button>
      </div>
    </form>
  );
};
