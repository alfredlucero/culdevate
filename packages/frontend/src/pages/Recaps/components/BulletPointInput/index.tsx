import React from "react";
import cn from "classnames";
import TextInput, { TextInputProps } from "../../../../components/TextInput";
import Icon from "../../../../components/Icon";
import { CommonProps } from "../../../../components/commonProps";

interface BulletPointInputProps extends CommonProps {
  onClickDelete: (e: React.MouseEvent) => void;
  onChange: TextInputProps["onChange"];
  onBlur: TextInputProps["onBlur"];
  value: TextInputProps["value"];
  id: TextInputProps["id"];
  valid: TextInputProps["valid"];
  errorInfo: TextInputProps["errorInfo"];
}

const BulletPointInput: React.FC<BulletPointInputProps> = ({
  onClickDelete,
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
      className={cn(
        "flex",
        "items-start",
        "px-4",
        "py-6",
        "rounded",
        "hover:shadow-md",
        "hover:bg-blue-100",
        "cursor-pointer",
        className,
      )}
      {...passThroughProps}
    >
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
        className={cn("mr-4", "flex-1", "cursor-none")}
      />
      <Icon
        variant="trash"
        size="medium"
        onClick={onClickDelete}
        className={cn("text-red-700", "hover:text-red-900", "cursor-pointer")}
        testId={testId ? `${testId}DeleteIcon` : ""}
      />
    </div>
  );
};

export default BulletPointInput;
