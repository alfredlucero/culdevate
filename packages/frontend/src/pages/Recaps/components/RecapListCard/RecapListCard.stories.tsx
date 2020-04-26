import React from "react";
import { storiesOf } from "@storybook/react";
import * as RecapListCard from "./index";
import { RecapKind } from "../../recaps.interface";

storiesOf("RecapsPage/RecapListCard", module).add("Default", () => (
  <RecapListCard.ListCard onClick={() => {}}>
    <RecapListCard.Icon kind={RecapKind.WorkExperience} className="mb-6 flex justify-center" />
    <RecapListCard.Kind kind={RecapKind.WorkExperience} className="text-center" />
  </RecapListCard.ListCard>
));
