import React from "react";
import { render, cleanup } from "react-testing-library";
import Recap, { RecapProps } from "./index";

afterEach(cleanup);

describe("<Recap />", () => {
  const sampleRecapProps: RecapProps = {
    title: "Sandia National Labs",
    subtitle: "Subtitle: some position",
    bulletPoints: ["Web Developer Intern", "Worked on graphing prototype"],
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

  test("should display bullet points in a list given some bullet points", () => {
    const { getAllByTestId } = render(<Recap {...sampleRecapProps} />);
    const bulletPoints = getAllByTestId("bulletPoint");

    bulletPoints.forEach((bulletPoint, idx) => {
      expect(bulletPoint.textContent).toContain(sampleRecapProps.bulletPoints[idx]);
    });
  });

  test("should not display a list given no bullet points", () => {
    const sampleRecapPropsWithoutBulletPoints = {
      ...sampleRecapProps,
      bulletPoints: [],
    };
    const { queryByTestId } = render(<Recap {...sampleRecapPropsWithoutBulletPoints} />);

    expect(queryByTestId("bulletPoint")).toBeNull();
  });
});
