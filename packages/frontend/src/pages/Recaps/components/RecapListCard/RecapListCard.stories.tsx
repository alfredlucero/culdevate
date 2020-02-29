import React from "react";
import { storiesOf } from "@storybook/react";
import * as RecapListCard from "./index";

storiesOf("RecapsPage/RecapListCard", module).add("Default", () => (
  <RecapListCard.ListCard>
    <RecapListCard.Icon kind="Work Experience" className="mb-6 flex justify-center" />
    <RecapListCard.Kind kind="Work Experience" className="mb-4 text-center" />
    <RecapListCard.Actions onClickAdd={() => {}} onClickView={() => {}} className="mb-4" />
    <div className="flex justify-end">
      <RecapListCard.Count count={10} />
    </div>
  </RecapListCard.ListCard>
));
