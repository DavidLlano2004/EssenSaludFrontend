import PropTypes from "prop-types";
import { CustomAlert } from "../customAlert/CustomAlert";
import React from "react";

export const TextareaInputSimple = ({
    disabled = false,
    errors,
    label,
    nameRegister,
    placeholder = "Ingrese",
    register,
    validations,
    rows = 1,
    styleTextareaSimple = "",
    imgTooltip = null,
    styLabel = "text-sm xl:text-base text-gray-light-custom mb-3",
    borderColor = "border-gray-light-custom",
    idTextarea,
    onChangeInput,
    dataTestId,
}) => {

    return (
        <div className={styleTextareaSimple ? "flex flex-col" : null}>
            <label htmlFor={idTextarea} className={styLabel}>{label}{imgTooltip}</label>
            <textarea
                data-testid={dataTestId}
                id={idTextarea}
                className={`px-2 py-2 resize-none outline-0 text-sm xl:text-base rounded-md border  ${borderColor} h-32 w-full`}
                type="text"
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                {...register(nameRegister, validations)}
                {
                ...onChangeInput ? { onChange: onChangeInput } : null
                }
            />
            {errors?.[nameRegister] && (
                <CustomAlert
                    message={errors[nameRegister].message}
                    type="error"
                />
            )}
        </div>
    );
}