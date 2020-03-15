import React from "react";
import { storiesOf } from "@storybook/react";
import * as RecapListCard from "./index";

storiesOf("RecapsPage/RecapListCard", module).add("Default", () => (
  <RecapListCard.ListCard onClick={() => {}}>
    <RecapListCard.Icon kind="Work Experience" className="mb-6 flex justify-center" />
    <RecapListCard.Kind kind="Work Experience" className="text-center" />
  </RecapListCard.ListCard>
));
