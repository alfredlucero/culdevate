import React from "react";
import { storiesOf } from "@storybook/react";
import CenterModal from "./index";
import Text from "../Text";
import Heading from "../Heading";
import Button from "../Button";

const onHide = () => {
  console.log("Hide Center Modal!");
};

storiesOf("Common/Center Modal", module).add("Showing Example", () => (
  <CenterModal isShowing={true} onHide={onHide}>
    <Heading variant="h3">Center Modal Title</Heading>
    <Text variant="p" className="py-4">
      Center Modal Description
    </Text>
    <div className="flex justify-end pt-4">
      <Button type="button" variant="secondary" onClick={onHide} className="mr-2">
        Close
      </Button>
      <Button
        type="button"
        variant="primary"
        onClick={() => {
          console.log("Action!");
        }}
      >
        Action
      </Button>
    </div>
  </CenterModal>
));
