import React from "react";
import { render } from "@testing-library/react";
import Icon, { IconVariant } from "./index";

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
  "loadingFan",
  "editPencil",
];

describe("<Icon />", () => {
  const iconTestId = "iconTestId";

  test("should render all icon variants without error", () => {
    const { container } = render(
      <div>
        {iconVariants.map((iconVariant, idx) => {
          return (
            <div key={idx}>
              <p>Icon Variant: {iconVariant}</p>
              <Icon variant={iconVariant} size="small" testId={iconTestId} className="extra-icon-class" />
            </div>
          );
        })}
      </div>,
    );

    expect(container).toMatchSnapshot();
  });
});
