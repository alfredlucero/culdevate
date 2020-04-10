import React from "react";
import { storiesOf } from "@storybook/react";
import FullScreenModal from "./index";
import Text from "../Text";
import Heading from "../Heading";
import Button from "../Button";

const onHide = () => {
  console.log("Hide Full Screen Modal!");
};

storiesOf("Common/Full Screen Modal", module).add("Showing Example", () => (
  <FullScreenModal isShowing={true} onHide={onHide}>
    <Heading variant="h3">Full Screen Modal Title</Heading>
    <Text variant="p" className="py-4">
      Full Screen Description
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
  </FullScreenModal>
));
