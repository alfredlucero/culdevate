import React from "react";
import { storiesOf } from "@storybook/react";
import BulletPointInput from "./index";

const onClickDelete = () => {
  console.log("Clicked delete bullet point!");
};
const onChange = () => {
  console.log("Changed bullet point input!");
};
const onBlur = () => {
  console.log("Blurred bullet point input!");
};

storiesOf("RecapsPage/BulletPointInput", module)
  .add("Default Empty", () => (
    <BulletPointInput
      onChange={onChange}
      onBlur={onBlur}
      onClickDelete={onClickDelete}
      id="bulletpoint1"
      value=""
      valid={true}
      errorInfo="Error info"
    />
  ))
  .add("Valid Input", () => (
    <BulletPointInput
      onChange={onChange}
      onBlur={onBlur}
      onClickDelete={onClickDelete}
      id="bulletpoint1"
      value="valid bullet point"
      valid={true}
      errorInfo="Error info"
    />
  ))
  .add("Invalid Input", () => (
    <BulletPointInput
      onChange={onChange}
      onBlur={onBlur}
      onClickDelete={onClickDelete}
      id="bulletpoint1"
      value="invalid bullet point"
      valid={false}
      errorInfo="Bullet point is invalid"
    />
  ))
  .add("Multiple Inputs", () => (
    <div className="p-4 bg-gray-300">
      <BulletPointInput
        onChange={onChange}
        onBlur={onBlur}
        onClickDelete={onClickDelete}
        id="bulletpoint1"
        value=""
        valid={true}
        errorInfo=""
        className="mb-2"
      />
      <BulletPointInput
        onChange={onChange}
        onBlur={onBlur}
        onClickDelete={onClickDelete}
        id="bulletpoint1"
        value="valid bullet point"
        valid={true}
        errorInfo=""
        className="mb-2"
      />
      <BulletPointInput
        onChange={onChange}
        onBlur={onBlur}
        onClickDelete={onClickDelete}
        id="bulletpoint1"
        value="invalid bullet point"
        valid={false}
        errorInfo="Bullet point is invalid"
      />
    </div>
  ));
