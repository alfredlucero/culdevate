import React from "react";
import { render, cleanup } from "react-testing-library";
import Page from "./index";

afterEach(cleanup);

describe("<Page />", () => {
  test("should render the Page and its children", () => {
    const { container } = render(
      <Page>
        <div>Some children</div>
      </Page>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
