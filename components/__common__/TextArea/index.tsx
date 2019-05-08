import React from "react";
import styled from "styled-components";
import { culdevateDefaultTheme } from "../../defaultTheme";

const StyledTextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
StyledTextAreaContainer.defaultProps = {
  theme: culdevateDefaultTheme,
};

interface StyledTextAreaProps {
  isError: boolean;
}
const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  width: 100%;
  color: ${props => props.theme.colors.gray};
  padding: 1.5rem;
  border: 2px solid ${props => (props.isError ? props.theme.colors.red : props.theme.colors.lightGray)};
  border-radius: 5px;
`;
StyledTextArea.defaultProps = {
  theme: culdevateDefaultTheme,
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
      {!isError && (
        <span data-testid="textAreaInfo" id={infoId}>
          {infoMessage}
        </span>
      )}
      {isError && (
        <span data-testid="textAreaError" id={errorId}>
          {errorMessage}
        </span>
      )}
    </StyledTextAreaContainer>
  );
};

export default TextArea;
