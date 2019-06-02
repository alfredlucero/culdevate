import React from "react";
import styled, { css } from "styled-components";
import "../../../moduleTypes/styled-components.d.ts";
import { culdevateThemes } from "../../defaultTheme";

const StyledTextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
StyledTextInputContainer.defaultProps = {
  theme: culdevateThemes.light,
};

interface StyledTextInputProps {
  isError: boolean;
}
const StyledTextInput = styled.input<StyledTextInputProps>`
  width: 100%;
  ${({
    isError,
    theme: {
      fontSize: { formInputFontSize },
      semanticColors: { inputBorderDefaultColor, inputBorderErrorColor, normalTextColor },
      forms: { inputBoxShadow, inputFocusShadow, inputBorderRadius, inputBorderWidth, inputPadding },
    },
  }) => css`
    padding: ${inputPadding};
    border: ${inputBorderWidth} solid ${isError ? inputBorderErrorColor : inputBorderDefaultColor};
    border-radius: ${inputBorderRadius};
    box-shadow: ${inputBoxShadow};
    color: ${normalTextColor};
    font-size: ${formInputFontSize};

    &:focus {
      outline: none;
      box-shadow: ${inputFocusShadow};
    }
  `}
`;
StyledTextInput.defaultProps = {
  theme: culdevateThemes.light,
};

const StyledTextInputInfo = styled.em`
  ${({ theme: { semanticColors, fontSize } }) => css`
    padding: 0.25rem 1rem;
    color: ${semanticColors.normalTextColor};
    font-size: ${fontSize.smallBodyFontSize};
  `}
`;
StyledTextInputInfo.defaultProps = {
  theme: culdevateThemes.light,
};

const StyledTextInputError = styled.em`
  ${({ theme: { semanticColors, fontSize } }) => css`
    padding: 0.25rem 1rem;
    color: ${semanticColors.errorTextColor};
    font-size: ${fontSize.smallBodyFontSize};
  `}
`;
StyledTextInputError.defaultProps = {
  theme: culdevateThemes.light,
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
      {isError && (
        <StyledTextInputError data-testid="textInputError" id={errorId}>
          {errorMessage}
        </StyledTextInputError>
      )}
      {!isError && (
        <StyledTextInputInfo data-testid="textInputInfo" id={infoId}>
          {infoMessage}
        </StyledTextInputInfo>
      )}
    </StyledTextInputContainer>
  );
};

export default TextInput;
