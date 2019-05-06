import React from "react";
// import styled from "styled-components";

interface TextAreaProps {
  value: string;
  name: string;
  valid: boolean;
  touched: boolean;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  infoMessage?: string;
  errorMessage?: string;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  name,
  valid,
  touched,
  onChange,
  infoMessage,
  errorMessage,
  ...restOfProps
}) => {
  return (
    <div>
      <textarea value={value} onChange={onChange} name={name} {...restOfProps} />
    </div>
  );
};

export default TextArea;
