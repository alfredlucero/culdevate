import React from "react";
import { BrowserRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import Link from "./index";

storiesOf("Common/Link", module)
  .add("Internal", () => (
    <BrowserRouter>
      <Link href="#" type="internal">
        Internal Link
      </Link>
    </BrowserRouter>
  ))
  .add("External", () => (
    <Link href="#" type="external">
      External Link
    </Link>
  ));
