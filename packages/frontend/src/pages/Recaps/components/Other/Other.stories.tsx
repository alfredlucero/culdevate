import React from "react";
import { storiesOf } from "@storybook/react";
import OtherForm from "./Form";
import OtherRecap from "./Recap";
import { RecapOther } from "../../../../interfaces/recaps.interface";

const other: RecapOther = {
  title: "Finished reading Clean Code book!",
  kind: "Other",
  userId: "userId",
  _id: "otherId",
  startDate: new Date("2017/10/20"),
  endDate: new Date("2017/12/20"),
  bulletPoints: ["Learned about how to write cleaner and more maintainable code", "Improved with code reviews"],
};

const onEdit = () => {
  console.log("Edit clicked!");
};

const onDelete = () => {
  console.log("Delete clicked!");
};

storiesOf("RecapsPage/Other", module)
  .add("Form", () => <OtherForm />)
  .add("Recap", () => <OtherRecap other={other} onEdit={onEdit} onDelete={onDelete} />);
