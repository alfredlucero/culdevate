import React from "react";
import cn from "classnames";
import { CommonProps } from "../commonProps";
import "./index.css";

interface TextInputProps extends CommonProps {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
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

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  value,
  id,
  type,
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
    <div className={className}>
      {label && (
        <label className="text-input-label" htmlFor={id}>
          {label} {required ? "(required)" : ""}
        </label>
      )}

      <input
        className={cn("text-input", { "text-input-error": !valid, "text-input-disabled": disabled })}
        value={value}
        id={id}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        data-testid={testId}
        aria-required={required}
        {...passThroughProps}
      />

      {valid && textInfo !== "" && <p className="text-input-info">{textInfo}</p>}

      {!valid && errorInfo !== "" && <p className="text-input-error-info">{errorInfo}</p>}
    </div>
  );
};

export default TextInput;
