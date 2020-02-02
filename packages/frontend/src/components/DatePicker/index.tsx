import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { CommonProps } from "../commonProps";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

interface DatePickerProps extends ReactDatePickerProps, CommonProps {
  required?: boolean;
  valid?: boolean;
  errorInfo?: string;
  textInfo?: string;
  label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <div>
      <ReactDatePicker selected={selected} onChange={onChange} />
    </div>
  );
};

export default DatePicker;
