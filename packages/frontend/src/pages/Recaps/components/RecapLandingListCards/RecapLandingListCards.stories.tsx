import React from "react";
import { storiesOf } from "@storybook/react";
import RecapLandingListCards, { RecapLandingListCardsProps } from "./index";

const defaultProps: RecapLandingListCardsProps = {
  onRetryFetchRecaps: () => {
    console.log("Retry fetch!");
  },
  onGoToRecapKindLayout: kindLayout => {
    console.log(`Going to ${kindLayout}!`);
  },
  isFetchingRecaps: false,
  isFetchRecapsError: false,
};

storiesOf("RecapsPage/RecapLandingListCards", module)
  .add("Fetching Recaps", () => <RecapLandingListCards {...defaultProps} isFetchingRecaps={true} />)
  .add("Fetch Recaps Error", () => <RecapLandingListCards {...defaultProps} isFetchRecapsError={true} />)
  .add("List Cards", () => <RecapLandingListCards {...defaultProps} />);
