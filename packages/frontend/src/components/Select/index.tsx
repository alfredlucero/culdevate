import React from "react";
import cn from "classnames";
import { CommonProps } from "../commonProps";

export interface SelectProps extends CommonProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  value: string;
  options: SelectOption[];
  id: string;
  required?: boolean;
  valid?: boolean;
  errorInfo?: string;
  textInfo?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

const selectBaseClasses = [
  "block",
  "appearance-none",
  "w-full",
  "bg-white",
  "border",
  "border-gray-400",
  "hover:border-gray-500",
  "px-4",
  "py-2",
  "pr-8",
  "rounded",
  "shadow",
  "leading-tight",
  "focus:outline-none",
  "focus:shadow-outline",
];
const selectErrorClasses = ["border-red-500"];
const selectDisabledClasses = ["bg-gray-200", "opacity-75"];

const Select: React.FC<SelectProps> = ({
  onChange,
  value,
  options,
  id,
  onBlur = () => {},
  required = false,
  valid = true,
  errorInfo = "",
  textInfo = "",
  label = "",
  disabled = false,
  placeholder = "",
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <div {...(className !== "" ? { className } : {})}>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
          {label} {required ? "" : "(optional)"}
        </label>
      )}

      <div className="inline-block relative">
        <select
          className={cn(selectBaseClasses, !valid ? selectErrorClasses : [], disabled ? selectDisabledClasses : [])}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          aria-required={required}
          data-testid={testId}
          {...passThroughProps}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option, idx) => (
            <option value={option.value} key={idx}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {valid && textInfo !== "" && <p className="text-gray-700 text-xs italic mt-2">{textInfo}</p>}

      {!valid && errorInfo !== "" && <p className="text-red-500 text-xs italic mt-2">{errorInfo}</p>}
    </div>
  );
};

export default Select;
