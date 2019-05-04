import React from "react";
import { render, cleanup } from "react-testing-library";
import Icon, { CuldevateIcon } from "./index";

afterEach(cleanup);

describe("<Icon />", () => {
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

  test("should render all the Icon component types", () => {
    const { container } = render(
      <div>
        {allCuldevateIcons.map((culdevateIcon, idx) => (
          <div key={idx}>
            <Icon icon={culdevateIcon} />
          </div>
        ))}
      </div>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
