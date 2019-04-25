import React from "react";
import { storiesOf } from "@storybook/react";
import StoryFrame from "../StoryFrame";
import Icon, { CuldevateIcon } from "./index";

const allCuldevateIcons: CuldevateIcon[] = [
  "suitcase",
  "school",
  "award",
  "target",
  "pen",
  "checkDouble",
  "userFriends",
  "trophy",
  "levelUp",
];

storiesOf("Icon", module).add("All Icon Types", () => (
  <StoryFrame>
    {allCuldevateIcons.map((culdevateIcon, idx) => (
      <div key={idx}>
        <Icon icon={culdevateIcon} />
      </div>
    ))}
  </StoryFrame>
));
