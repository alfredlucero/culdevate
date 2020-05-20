import React from "react";
import { storiesOf } from "@storybook/react";
import AllRecapsEmptyCard from "./EmptyCard";

const onClickAdd = () => {
  console.log("Add clicked!");
};

storiesOf("RecapsPage/All Recaps", module)
  .add("Empty Card", () => <AllRecapsEmptyCard onClickAdd={onClickAdd} />)
  .add("Layout - Empty", () => <div>Empty Layout</div>)
  .add("Layout - With Data", () => <div>Layout with data</div>);
