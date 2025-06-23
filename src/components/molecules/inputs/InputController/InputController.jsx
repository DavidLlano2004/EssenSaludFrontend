import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { CustomAlert } from "../../customAlert/CustomAlert";
import { Icons } from "../../../../assets/icons/IconsProvider";
import "./StyleInputController.css";

const { ViewPassword, HidePassword } = Icons;

export const InputController = ({
  control,
  disabled = false,
  estrict = true,
  hadleOnEnter = () => {},
  label = "example",
  name,
  placeholder = "Ingrese",
  rules = {},
  styleInput = "focus:border-black-custom transition-all ease-in duration-200 focus:outline-0 w-full h-[45px] text-black px-3 text-base border border-[#BDBDBD] rounded-md bg-transparent outline-none transition-all duration-300 focus:border-black placeholder-transparent",
  type = "text",
  inputProps = {},
  idInputController = "styled_input_bar_controller",
  styleImgView = "absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer xl:w-6 xl:h-6 w-5 h-5",
  iconInput,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      id="text_input_controller"
      data-testid="text_input_controller"
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <div className="relative w-full">
            {iconInput && (
              <div className="absolute top-0 h-full grid place-items-center px-3">
                <img className="xl:w-6 xl:h-6 w-5 h-5" src={iconInput} alt="" />
              </div>
            )}
            {console.log(error)}
            <input
              id={idInputController}
              data-testid="inputController"
              {...field}
              {...inputProps}
              className={`${styleInput}   ${
                disabled && "bg-zinc-200"
              } ${error && "border-red-custom"}`}
              placeholder={placeholder}
              type={showPassword ? "text" : type}
              disabled={disabled}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  hadleOnEnter();
                }
              }}
            />
            {type === "password" && (
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                <img
                  data-testid="buttonHide"
                  className={`${styleImgView}`}
                  src={showPassword ? ViewPassword : HidePassword}
                  alt="Mostrar contraseña"
                />
              </button>
            )}
          </div>
          {error && estrict && (
            <CustomAlert message={error.message} type="error" />
          )}
        </div>
      )}
    />
  );
};
