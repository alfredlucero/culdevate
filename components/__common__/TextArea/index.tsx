import React from "react";
import styled, { css } from "styled-components";
import "../../../moduleTypes/styled-components.d.ts";
import { culdevateThemes } from "../../defaultTheme";

const StyledTextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
StyledTextAreaContainer.defaultProps = {
  theme: culdevateThemes.light,
};

interface StyledTextAreaProps {
  isError: boolean;
}
const StyledTextArea = styled.textarea<StyledTextAreaProps>`
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
StyledTextArea.defaultProps = {
  theme: culdevateThemes.light,
};

const StyledTextAreaInfo = styled.em`
  ${({ theme: { semanticColors, fontSize } }) => css`
    padding: 0.25rem 1rem;
    color: ${semanticColors.normalTextColor};
    font-size: ${fontSize.smallBodyFontSize};
  `}
`;
StyledTextAreaInfo.defaultProps = {
  theme: culdevateThemes.light,
};

const StyledTextAreaError = styled.em`
  ${({ theme: { semanticColors, fontSize } }) => css`
    padding: 0.25rem 1rem;
    color: ${semanticColors.errorTextColor};
    font-size: ${fontSize.smallBodyFontSize};
  `}
`;
StyledTextAreaError.defaultProps = {
  theme: culdevateThemes.light,
};

interface TextAreaProps {
  value: string;
  id: string;
  name: string;
  valid: boolean;
  touched: boolean;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  disabled?: boolean;
  infoMessage?: string;
  errorMessage?: string;
  placeholder?: string;
  required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  id,
  name,
  valid,
  touched,
  onChange,
  label = "",
  disabled = false,
  infoMessage = "",
  errorMessage = "",
  placeholder = "",
  required = true,
  ...passThroughProps
}) => {
  const infoId = infoMessage && `${id}-text-area-info`;
  const errorId = errorMessage && `${id}-text-area-error`;
  const isError = touched && !valid;

  return (
    <StyledTextAreaContainer>
      <label htmlFor={id}>
        {label} {label && required && "(Required)"}
      </label>
      <StyledTextArea
        isError={isError}
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
        <StyledTextAreaError data-testid="textAreaError" id={errorId}>
          {errorMessage}
        </StyledTextAreaError>
      )}
      {!isError && (
        <StyledTextAreaInfo data-testid="textAreaInfo" id={infoId}>
          {infoMessage}
        </StyledTextAreaInfo>
      )}
    </StyledTextAreaContainer>
  );
};

export default TextArea;
