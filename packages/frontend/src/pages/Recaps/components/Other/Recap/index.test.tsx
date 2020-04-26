import React from "react";
import { render } from "@testing-library/react";
import { RecapOther, RecapKind } from "../../../recaps.interface";
import OtherRecap from "./index";

const other: RecapOther = {
  title: "Finished reading Clean Code book!",
  kind: RecapKind.Other,
  userId: "userId",
  _id: "otherId",
  startDate: new Date("2017/10/20").toISOString(),
  endDate: new Date("2017/12/20").toISOString(),
  bulletPoints: ["Learned about how to write cleaner and more maintainable code", "Improved with code reviews"],
};
describe("<OtherRecap />", () => {
  const testId = "otherRecapTestId";

  test("should render without error", () => {
    const { container } = render(
      <OtherRecap other={other} onEdit={() => {}} onDelete={() => {}} testId={testId} className="extra-recap-class" />,
    );

    expect(container).toMatchSnapshot();
  });
});
