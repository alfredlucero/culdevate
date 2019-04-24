import React from "react";
import { render, cleanup } from "react-testing-library";
import Recap, { RecapProps } from "./index";

afterEach(cleanup);

describe("<Recap />", () => {
  const sampleRecapProps: RecapProps = {
    title: "Sandia National Labs",
    description: "Web Developer Intern",
    type: "work",
    startDate: "2016/06/20",
    endDate: "2017/06/10",
  };

  test("should render the component", () => {
    const { container } = render(<Recap {...sampleRecapProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should display to the present when there is no end date", () => {
    const sampleRecapPropsWithoutEndDate = {
      ...sampleRecapProps,
      endDate: null,
    };
    const { getByTestId } = render(<Recap {...sampleRecapPropsWithoutEndDate} />);

    expect(getByTestId("recapDateRange").textContent).toContain("- Present");
  });
});
