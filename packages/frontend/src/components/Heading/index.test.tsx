import React from "react";
import { render } from "@testing-library/react";
import Heading from "./index";

describe("<Heading />", () => {
  const headingTestId = "headingTestId";

  test("should render header one variant without error", () => {
    const { container } = render(
      <Heading variant="h1" testId={headingTestId} className="extra-heading-class">
        Header One Content
      </Heading>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render header two variant without error", () => {
    const { container } = render(
      <Heading variant="h2" testId={headingTestId} className="extra-heading-class">
        Header Two Content
      </Heading>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render header three variant without error", () => {
    const { container } = render(
      <Heading variant="h3" testId={headingTestId} className="extra-heading-class">
        Header Three Content
      </Heading>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render header four variant without error", () => {
    const { container } = render(
      <Heading variant="h4" testId={headingTestId} className="extra-heading-class">
        Header Four Content
      </Heading>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render italic class when italic", () => {
    const { getByTestId } = render(
      <Heading variant="h1" testId={headingTestId} italic={true}>
        Header One Content
      </Heading>,
    );

    expect(getByTestId(headingTestId)).toHaveClass("heading-italic");
  });
});
