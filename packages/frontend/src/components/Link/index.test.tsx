import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Link from "./index";

describe("<Link />", () => {
  test("should render internal link without error", () => {
    const { container } = render(
      <BrowserRouter>
        <Link href="/login" type="internal" className="extra-link-class" testId="internalLinkId">
          Internal Link
        </Link>
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render external link without error", () => {
    const { container } = render(
      <BrowserRouter>
        <Link href="https://external.com" type="external" className="extra-link-class" testId="externalLinkId">
          External Link
        </Link>
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
