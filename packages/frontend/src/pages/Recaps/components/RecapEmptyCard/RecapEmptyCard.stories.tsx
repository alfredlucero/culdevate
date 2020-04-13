import React from "react";
import { storiesOf } from "@storybook/react";
import * as RecapEmptyCard from "./index";
import { RecapKind } from "../../recaps.interface";

storiesOf("RecapsPage/RecapEmptyCard", module).add("Default", () => (
  <RecapEmptyCard.EmptyCard>
    <RecapEmptyCard.Icon kind={RecapKind.WorkExperience} className="mb-6 flex justify-center" />
    <RecapEmptyCard.Kind kind={RecapKind.WorkExperience} className="mb-4 text-center" />
    <RecapEmptyCard.Description className="mb-6">
      Recap everything about your career from internships to full-time jobs and opportunities.
    </RecapEmptyCard.Description>
    <RecapEmptyCard.Actions onClickAdd={() => {}} />
  </RecapEmptyCard.EmptyCard>
));
