import React from "react";
import { render } from "@testing-library/react";
import BulletPointInputList, { BulletPointInputListProps } from "./index";

describe("<BulletPointInputList />", () => {
  test("should render without error", () => {
    const bulletPointInputList = [
      {
        value: "",
        id: "bulletpoint-0",
        errorInfo: "",
        valid: true,
      },
    ];

    const { container } = render(
      <BulletPointInputList
        bulletPointInputList={bulletPointInputList}
        onDragEnd={() => {}}
        onChangeBulletPointInput={() => {}}
        onBlurBulletPointInput={() => {}}
        onDeleteBulletPointInput={() => {}}
        onAddBulletPointInput={() => {}}
        isAddBulletPointInputDisabled={false}
        className="extra-input-list-class"
        testId="bulletPointInputList"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
