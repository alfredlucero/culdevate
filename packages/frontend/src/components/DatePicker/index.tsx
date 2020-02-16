import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import cn from "classnames";
import { CommonProps } from "../commonProps";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

export interface DatePickerProps extends ReactDatePickerProps, CommonProps {
  id: string;
  valid?: boolean;
  errorInfo?: string;
  textInfo?: string;
  label?: string;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  selected,
  onChange,
  disabled = false,
  required = false,
  valid = true,
  errorInfo = "",
  textInfo = "",
  label = "",
  placeholder = "",
  className = "",
  testId = "",
  ...restOfDatePickerProps
}) => {
  return (
    <div {...(className !== "" ? { className } : {})}>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
          {label} {required ? "" : "(optional)"}
        </label>
      )}
      <ReactDatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        disabled={disabled}
        required={required}
        customInput={
          <input
            type="text"
            className={cn(
              [
                "shadow",
                "appearance-none",
                "border",
                "w-full",
                "py-2",
                "px-3",
                "text-gray-700",
                "leading-tight",
                "focus:outline-none",
                "focus:shadow-outline",
                "rounded",
              ],
              !valid ? ["border-red-500"] : [],
              disabled ? ["bg-gray-200", "opacity-75"] : [],
            )}
            {...(testId !== "" ? { "data-testid": testId } : {})}
          />
        }
        placeholderText={placeholder}
        {...restOfDatePickerProps}
      />
      {valid && textInfo !== "" && <p className="text-gray-700 text-xs italic mt-2">{textInfo}</p>}

      {!valid && errorInfo !== "" && <p className="text-red-500 text-xs italic mt-2">{errorInfo}</p>}
    </div>
  );
};

export default DatePicker;
