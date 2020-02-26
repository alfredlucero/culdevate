import React from "react";
import { storiesOf } from "@storybook/react";
import RecapsErrorCard from "./index";

const retry = () => {
  console.log("Retry fetch!");
};

storiesOf("RecapsPage/RecapsErrorCard", module).add("Default", () => <RecapsErrorCard onRetry={retry} />);
