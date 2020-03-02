import React from "react";
import { storiesOf } from "@storybook/react";
import * as RecapEmptyCard from "./index";

storiesOf("RecapsPage/RecapEmptyCard", module).add("Default", () => (
  <RecapEmptyCard.EmptyCard>
    <RecapEmptyCard.Icon kind="Work Experience" className="mb-6 flex justify-center" />
    <RecapEmptyCard.Kind kind="Work Experience" className="mb-4 text-center" />
    <RecapEmptyCard.Description className="mb-6">
      Recap everything about your career from internships to full-time jobs and opportunities.
    </RecapEmptyCard.Description>
    <RecapEmptyCard.Actions onClickAdd={() => {}} />
  </RecapEmptyCard.EmptyCard>
));
