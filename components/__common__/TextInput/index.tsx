import React from "react";
// import styled from "styled-components";

export type TextInputType = "text" | "password" | "email";

export interface TextInputProps {
  value: string;
  name: string;
  valid: boolean;
  touched: boolean;
  type: TextInputType;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  infoMessage?: string;
  errorMessage?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  name,
  valid,
  touched,
  type,
  onChange,
  infoMessage,
  errorMessage,
  ...restOfProps
}) => {
  return (
    <div>
      <input type={type} value={value} onChange={onChange} name={name} {...restOfProps} />
    </div>
  );
};

export default TextInput;
