import React from "react";
import { storiesOf } from "@storybook/react";
import RecapLandingListCards, { RecapLandingListCardsProps } from "./index";

const defaultProps: RecapLandingListCardsProps = {
  onGoToRecapKindLayout: kindLayout => {
    console.log(`Going to ${kindLayout}!`);
  },
};

storiesOf("RecapsPage/RecapLandingListCards", module).add("Default", () => <RecapLandingListCards {...defaultProps} />);
