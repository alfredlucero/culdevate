import React from "react";
import styled from "styled-components";
import { culdevateDefaultTheme } from "../../defaultTheme";

const StyledTextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
StyledTextInputContainer.defaultProps = {
  theme: culdevateDefaultTheme,
};

interface StyledTextInputProps {
  isError: boolean;
}
const StyledTextInput = styled.input<StyledTextInputProps>`
  width: 100%;
  color: ${props => props.theme.colors.gray};
  padding: 1.5rem;
  border: 2px solid ${props => (props.isError ? props.theme.colors.red : props.theme.colors.lightGray)};
  border-radius: 5px;
`;
StyledTextInput.defaultProps = {
  theme: culdevateDefaultTheme,
};

export type TextInputType = "text" | "password" | "email";

export interface TextInputProps {
  value: string;
  id: string;
  name: string;
  valid: boolean;
  touched: boolean;
  type: TextInputType;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  infoMessage?: string;
  errorMessage?: string;
  placeholder?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  id,
  name,
  valid,
  touched,
  type,
  onChange,
  label = "",
  disabled = false,
  infoMessage = "",
  errorMessage = "",
  placeholder = "",
  required = true,
  ...passThroughProps
}) => {
  const infoId = infoMessage && `${id}-text-input-info`;
  const errorId = errorMessage && `${id}-text-input-error`;
  const isError = touched && !valid;

  return (
    <StyledTextInputContainer>
      <label htmlFor={id}>
        {label} {label && required && "(Required)"}
      </label>
      <StyledTextInput
        isError={isError}
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        aria-describedby={isError ? errorId : infoId}
        {...passThroughProps}
      />
      {!isError && (
        <span data-testid="textInputInfo" id={infoId}>
          {infoMessage}
        </span>
      )}
      {isError && (
        <span data-testid="textInputError" id={errorId}>
          {errorMessage}
        </span>
      )}
    </StyledTextInputContainer>
  );
};

export default TextInput;
