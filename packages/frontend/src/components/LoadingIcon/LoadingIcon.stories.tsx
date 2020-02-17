import React from "react";
import { storiesOf } from "@storybook/react";
import LoadingIcon from "./index";

storiesOf("Common/LoadingIcon", module)
  .add("Button Loader (size=small/medium)", () => <LoadingIcon size="small" />)
  .add("Section Loader (size=large)", () => <LoadingIcon size="large" />)
  .add("Page Loader (size=xlarge)", () => <LoadingIcon size="xlarge" />);
