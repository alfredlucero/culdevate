import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import DatePicker from "./index";

const StatefulDefaultDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return <DatePicker selected={selectedDate} onChange={handleDateChange} />;
};

storiesOf("Common/Date Picker", module).add("Default Stateful Example", () => <StatefulDefaultDatePicker />);
