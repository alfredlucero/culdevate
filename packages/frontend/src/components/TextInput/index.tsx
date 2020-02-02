import React from "react";
import cn from "classnames";
import { CommonProps } from "../commonProps";

interface TextInputProps extends CommonProps {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent) => void;
  value: string;
  id: string;
  type: "text" | "password";
  required?: boolean;
  valid?: boolean;
  errorInfo?: string;
  textInfo?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
}

const textInputBaseClasses = [
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
];
const textInputErrorClasses = ["border-red-500"];
const textInputDisabledClasses = ["bg-gray-200", "opacity-75"];

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  value,
  id,
  type,
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

      <input
        className={cn(
          textInputBaseClasses,
          !valid ? textInputErrorClasses : [],
          disabled ? textInputDisabledClasses : [],
        )}
        value={value}
        id={id}
        name={id}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-required={required}
        {...(testId !== "" ? { "data-testid": testId } : {})}
        {...passThroughProps}
      />

      {valid && textInfo !== "" && <p className="text-gray-700 text-xs italic mt-2">{textInfo}</p>}

      {!valid && errorInfo !== "" && <p className="text-red-500 text-xs italic mt-2">{errorInfo}</p>}
    </div>
  );
};

export default TextInput;
