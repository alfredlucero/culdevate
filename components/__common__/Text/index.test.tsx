import React from "react";
import { render, cleanup } from "react-testing-library";
import { H1, H2, H3, P } from "./index";

afterEach(cleanup);

describe("Text (H1, H2, H3, P)", () => {
  test("should render all Text components", () => {
    const { container } = render(
      <div>
        <H1>Culdevate Header 1 Text</H1>
        <H2>Culdevate Header 2 Text</H2>
        <H3>Culdevate Header 3 Text</H3>
        <P>Culdevate Paragraph Text</P>
        <P small>Culdevate Paragraph Small Text</P>
      </div>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
