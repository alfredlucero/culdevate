import React from "react";
import cn from "classnames";
import TextInput, { TextInputProps } from "../../../../components/TextInput";
import Icon from "../../../../components/Icon";
import { CommonProps } from "../../../../components/commonProps";

export interface BulletPointInputProps extends CommonProps {
  onDelete: (e: React.MouseEvent) => void;
  onChange: TextInputProps["onChange"];
  onBlur: TextInputProps["onBlur"];
  value: TextInputProps["value"];
  id: TextInputProps["id"];
  valid: TextInputProps["valid"];
  errorInfo: TextInputProps["errorInfo"];
}

const BulletPointInput: React.FC<BulletPointInputProps> = ({
  onDelete,
  onChange,
  onBlur,
  value,
  id,
  valid = true,
  errorInfo = "",
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  return (
    <div
      {...(testId !== "" ? { "data-testid": testId } : {})}
      className={cn("flex", "items-start", "px-4", "py-6", "rounded", "shadow-md", "cursor-pointer", className)}
      {...passThroughProps}
    >
      <Icon variant="bulletpoint" size="small" className="mr-4 text-teal-300" />
      <TextInput
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        id={id}
        valid={valid}
        errorInfo={errorInfo}
        required={true}
        type="text"
        placeholder="Provide your highlights and results..."
        testId={testId ? `${testId}Input` : ""}
        className={cn("mr-4", "flex-1")}
      />
      <Icon
        variant="trash"
        size="medium"
        onClick={onDelete}
        className={cn("text-red-500", "hover:text-red-700", "cursor-pointer")}
        id={id}
        testId={testId ? `${testId}DeleteIcon` : ""}
      />
    </div>
  );
};

export default BulletPointInput;
