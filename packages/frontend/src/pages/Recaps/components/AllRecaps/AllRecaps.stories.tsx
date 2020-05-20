import React from "react";
import { storiesOf } from "@storybook/react";
import AllRecapsEmptyCard from "./EmptyCard";
import AllRecapsForm from "./Form";
import { RecapKind } from "../../recaps.interface";

const onClickAdd = () => {
  console.log("Add clicked!");
};

storiesOf("RecapsPage/All Recaps", module)
  .add("Form", () => (
    <AllRecapsForm
      selectedKind={RecapKind.WorkExperience}
      initialRecap={null}
      isShowing={true}
      onHide={() => {}}
      onSaveSuccess={() => {}}
    />
  ))
  .add("Empty Card", () => <AllRecapsEmptyCard onClickAdd={onClickAdd} />)
  .add("Layout - Empty", () => <div>Empty Layout</div>)
  .add("Layout - With Data", () => <div>Layout with data</div>);
