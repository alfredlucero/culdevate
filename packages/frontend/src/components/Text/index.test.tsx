import React from "react";
import { render } from "@testing-library/react";
import Text from "./index";

describe("<Text />", () => {
  const textTestId = "textTestId";

  test("should render paragraph variant without error", () => {
    const { container } = render(
      <Text variant="p" testId={textTestId} className="extra-text-class">
        Paragraph Content
      </Text>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render span variant without error", () => {
    const { container } = render(
      <Text variant="span" testId={textTestId} className="extra-text-class">
        Span Content
      </Text>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render small class when small", () => {
    const { getByTestId } = render(
      <Text variant="p" small={true} testId={textTestId}>
        Paragraph Content
      </Text>,
    );

    expect(getByTestId(textTestId)).toHaveClass("text-small");
  });

  test("should render bold class when bold", () => {
    const { getByTestId } = render(
      <Text variant="p" bold={true} testId={textTestId}>
        Paragraph Content
      </Text>,
    );

    expect(getByTestId(textTestId)).toHaveClass("text-bold");
  });

  test("should render italic class when italic", () => {
    const { getByTestId } = render(
      <Text variant="p" italic={true} testId={textTestId}>
        Paragraph Content
      </Text>,
    );

    expect(getByTestId(textTestId)).toHaveClass("text-italic");
  });
});
