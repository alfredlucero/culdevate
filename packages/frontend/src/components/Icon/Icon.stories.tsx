import React from "react";
import { storiesOf } from "@storybook/react";
import Icon, { IconVariant } from "./index";

const onClick = () => {
  console.log("Icon clicked!");
};

const iconVariants: IconVariant[] = [
  "work",
  "education",
  "accomplishments",
  "publications",
  "skills",
  "projects",
  "organizations",
  "references",
  "other",
  "bulletpoint",
  "x",
  "trash",
  "plus",
];

storiesOf("Common/Icon", module)
  .add("All Small Icons", () => (
    <div>
      {iconVariants.map((iconVariant, idx) => {
        return (
          <div key={idx}>
            <p>Icon Variant: {iconVariant}</p>
            <Icon variant={iconVariant} size="small" onClick={onClick} />
          </div>
        );
      })}
    </div>
  ))
  .add("All Medium Icons", () => (
    <div>
      {iconVariants.map((iconVariant, idx) => {
        return (
          <div key={idx}>
            <p>Icon Variant: {iconVariant}</p>
            <Icon variant={iconVariant} size="medium" onClick={onClick} />
          </div>
        );
      })}
    </div>
  ))
  .add("All Large Icons", () => (
    <div>
      {iconVariants.map((iconVariant, idx) => {
        return (
          <div key={idx}>
            <p>Icon Variant: {iconVariant}</p>
            <Icon variant={iconVariant} size="large" onClick={onClick} />
          </div>
        );
      })}
    </div>
  ));
