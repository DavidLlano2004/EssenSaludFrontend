import React from "react";
import { CustomAlert } from "../customAlert/CustomAlert";

export const InputSimple = ({
  disabled = false,
  errors,
  hadleOnEnter = () => {},
  imgTooltip = null,
  inputStyle = "rounded-md border border-dimgray-200 pl-20 py-2 outline-none text-sm xl:text-base",
  label,
  nameRegister,
  placeholder = "Ingrese",
  register = () => {},
  styleLabel = "xl:text-f18 text-[16px] text-primary-gris2",
  type = "text",
  validations,
  value,
  width = "w-full",
  idInputSimple,
  actionBtnCalendar,
  date = false,
  onChangeInput,
  defaultValue,
  refInput = false,
  setViewRefInput,
  styleRefLink = "h-[20px] absolute top-[10px] right-[12px]",
  maxLength,
  feature = true,
  step,
  errorMessage,
  dataTestId = "inputSimple",
  styleContainerLabelInput = "flex flex-col w-full",
  iconInput,
  ...props
}) => {
  return (
    <div className={` ${styleContainerLabelInput}`}>
      {imgTooltip && (
        <label htmlFor={idInputSimple} className={styleLabel}>
          {imgTooltip}
        </label>
      )}
      <div>
        <div className="flex gap-1 relative">
          {iconInput && (
            <div className="absolute top-0 h-full grid place-items-center px-3">
              <img className="w-5 h-5" src={iconInput} alt="" />
            </div>
          )}
          <input
            step={step}
            defaultValue={defaultValue}
            maxLength={maxLength}
            id={idInputSimple}
            max={feature ? null : formattedToday}
            data-testid={dataTestId}
            className={` focus:border-black-custom transition-all ease-in duration-200 focus:outline-0 ${
              errors[nameRegister]?.type && " border-red-custom"
            } ${
              disabled
                ? "bg-[#dfdfdf] border border-gray-light-custom xl:py-3 py-[10px] text-base pl-12 pr-3 rounded-2xl text-black-custom"
                : inputStyle
            } ${width}`}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            {...register(nameRegister, validations)}
            {...props}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                hadleOnEnter();
              }
            }}
            {...(onChangeInput ? { onChange: onChangeInput } : null)}
          />
        </div>

        {errorMessage
          ? errorMessage && <CustomAlert message={errorMessage} type="error" />
          : errors?.[nameRegister] && (
              <CustomAlert
                message={errors[nameRegister]?.message}
                type="error"
              />
            )}
      </div>
    </div>
  );
};
