import React from "react";
import cn from "classnames";
import Text from "../Text";
import { CommonProps } from "../commonProps";

export interface CheckboxProps extends CommonProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  id,
  label,
  disabled = false,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  return (
    <div className={cn(className)}>
      <label
        className={cn("inline-flex", "items-center", {
          "cursor-pointer": !disabled,
        })}
        htmlFor={id}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          id={id}
          className={cn({
            "cursor-pointer": !disabled,
          })}
          {...(testId !== "" ? { "data-testid": testId } : {})}
          {...passThroughProps}
        />
        <Text
          variant="span"
          className={cn("ml-2", {
            "opacity-75": disabled,
          })}
        >
          {label}
        </Text>
      </label>
    </div>
  );
};

export default Checkbox;
