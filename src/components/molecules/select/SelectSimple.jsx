import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { CustomAlert } from "../customAlert/CustomAlert";
import {
  customStylesSelect,
  filterOptions,
} from "../../../helpers/SelectHelper";

export const CustomSelect = ({
  clearable = true,
  control = () => {},
  disabled = false,
  keyLabel = null,
  keyOption = "value",
  keyValue = null,
  name,
  optionImage = false,
  placeholder = "",
  rules = {},
  searchable = true,
  staticData = null,
  styleDiv = "",
  onChange,
  inputId = "selectInputId",
  defaultValue,
}) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      staticData &&
      Array.isArray(staticData) &&
      staticData.length > 0 &&
      keyValue &&
      keyLabel
    ) {
      setList(
        staticData.map((item) => ({
          value: item[keyValue],
          label: item[keyLabel].toString(),
        }))
      );
    } else {
      setList(staticData);
    }
  }, [staticData, keyValue, keyLabel]);

  const getOptionLabel = (option, optionImage, keyOption) => (
    <div>
      {optionImage && (
        <img
          src={`https://flagcdn.com/24x18/${option.value.toLowerCase()}.png`}
          alt={option.label}
        />
      )}

      {!optionImage && option[keyOption]}
    </div>
  );

  return (
    <article className={styleDiv}>
      {/* {label && (
        <label htmlFor={inputId} className={styleLabel}>
          {label}
          {imgTooltip}
        </label>
      )} */}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              inputId={inputId}
              {...field}
              defaultValue={defaultValue}
              placeholder={placeholder}
              isDisabled={disabled}
              isLoading={isLoading}
              isClearable={clearable}
              searchable={searchable}
              options={list}
              styles={customStylesSelect}
              filterOption={filterOptions}
              menuPosition="fixed"
              getOptionLabel={(option) =>
                getOptionLabel(option, optionImage, keyOption)
              }
              {...(onChange ? { onChange: onChange } : null)}
            ></Select>

            {error && <CustomAlert message={error.message} type="error" />}
          </>
        )}
      />
    </article>
  );
};
