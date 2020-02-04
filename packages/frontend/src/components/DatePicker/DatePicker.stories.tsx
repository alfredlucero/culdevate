import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import DatePicker from "./index";

const StatefulDefaultDatePicker: React.FC = () => {
  const [dateValue, setDateValue] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setDateValue(date);
  };

  return <DatePicker id="defaultDatePicker" selected={dateValue} onChange={handleDateChange} autoComplete="off" />;
};

storiesOf("Common/Date Picker", module)
  .add("Default Stateful Example", () => <StatefulDefaultDatePicker />)
  .add("Label + Text Info + Placeholder", () => (
    <DatePicker
      id="labelTextPlaceholder"
      selected={null}
      onChange={() => {}}
      label="Start Date"
      textInfo="When did you start this job?"
      placeholder="Job Start Date"
    />
  ))
  .add("Required + Error Info + Selected", () => (
    <DatePicker
      id="requiredErrorSelected"
      selected={null}
      onChange={() => {}}
      label="Start Date"
      errorInfo="Start Date is required"
      valid={false}
    />
  ))
  .add("Disabled + Selected", () => (
    <DatePicker id="disabledSelected" selected={new Date()} onChange={() => {}} label="Start Date" disabled={true} />
  ))
  .add("Month Year Picker", () => (
    <DatePicker
      id="monthYear"
      selected={new Date()}
      onChange={() => {}}
      showMonthYearPicker={true}
      dateFormat="MM/yyyy"
    />
  ))
  .add("Quarter Picker", () => (
    <DatePicker
      id="quarter"
      selected={new Date()}
      onChange={() => {}}
      showQuarterYearPicker={true}
      dateFormat="yyyy QQQ"
    />
  ));
