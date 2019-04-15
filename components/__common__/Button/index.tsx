import React from "react";

interface ButtonProps {
  testId: string;
}

const Button: React.FC<ButtonProps> = ({ testId }) => {
  return <button data-testid={testId}>Button</button>;
};

export default Button;
