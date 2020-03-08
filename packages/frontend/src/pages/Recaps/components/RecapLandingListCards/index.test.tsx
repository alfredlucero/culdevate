import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RecapLandingListCards, { RecapLandingListCardsProps } from "./index";

const defaultProps: RecapLandingListCardsProps = {
  onRetryFetchRecaps: () => {},
  onGoToRecapKindLayout: () => {},
  isFetchingRecaps: false,
  isFetchRecapsError: false,
};

describe("<RecapLandingListCards />", () => {
  test("should render without error", () => {
    const { container } = render(
      <RecapLandingListCards
        {...defaultProps}
        testId="landingListCardsTestId"
        className="extra-landing-list-cards-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show loading state when fetching recaps", () => {
    const { queryByText } = render(<RecapLandingListCards {...defaultProps} isFetchingRecaps={true} />);

    expect(queryByText("Retry")).toBeNull();
    expect(queryByText("Work Experience")).toBeNull();
    expect(queryByText("View All")).toBeNull();

    expect(queryByText("Recapping all the things you did...")).toBeTruthy();
  });

  test("should show error state when failed to fetch recaps", () => {
    const { queryByText } = render(<RecapLandingListCards {...defaultProps} isFetchRecapsError={true} />);

    expect(queryByText("Work Experience")).toBeNull();
    expect(queryByText("Recapping all the things you did...")).toBeNull();
    expect(queryByText("View All")).toBeNull();

    expect(queryByText("Retry")).toBeTruthy();
  });

  test("should show list cards when successfully fetched recaps", () => {
    const { queryByText } = render(<RecapLandingListCards {...defaultProps} />);

    expect(queryByText("Recapping all the things you did...")).toBeNull();
    expect(queryByText("Retry")).toBeNull();

    expect(queryByText("View All")).toBeTruthy();
    expect(queryByText("Work Experience")).toBeTruthy();
  });

  test("should attempt to go to all recaps layout when clicking view all button", () => {
    const onGoToRecapKindLayoutMock = jest.fn();
    const { getByText } = render(
      <RecapLandingListCards {...defaultProps} onGoToRecapKindLayout={onGoToRecapKindLayoutMock} />,
    );

    fireEvent.click(getByText("View All"));

    expect(onGoToRecapKindLayoutMock).toHaveBeenCalledWith("all");
  });

  test("should attempt to go to work experience layout when clicking work experience card", () => {
    const onGoToRecapKindLayoutMock = jest.fn();
    const { getByText } = render(
      <RecapLandingListCards {...defaultProps} onGoToRecapKindLayout={onGoToRecapKindLayoutMock} />,
    );

    fireEvent.click(getByText("Work Experience"));

    expect(onGoToRecapKindLayoutMock).toHaveBeenCalledWith("Work Experience");
  });

  test("should attempt to go to education recap layout when clicking education card", () => {
    const onGoToRecapKindLayoutMock = jest.fn();
    const { getByText } = render(
      <RecapLandingListCards {...defaultProps} onGoToRecapKindLayout={onGoToRecapKindLayoutMock} />,
    );

    fireEvent.click(getByText("Education"));

    expect(onGoToRecapKindLayoutMock).toHaveBeenCalledWith("Education");
  });

  test("should attempt to go to accomplishments recap layout when clicking accomplishments card", () => {
    const onGoToRecapKindLayoutMock = jest.fn();
    const { getByText } = render(
      <RecapLandingListCards {...defaultProps} onGoToRecapKindLayout={onGoToRecapKindLayoutMock} />,
    );

    fireEvent.click(getByText("Accomplishments"));

    expect(onGoToRecapKindLayoutMock).toHaveBeenCalledWith("Accomplishments");
  });

  test("should attempt to go to skills recap layout when clicking skills card", () => {
    const onGoToRecapKindLayoutMock = jest.fn();
    const { getByText } = render(
      <RecapLandingListCards {...defaultProps} onGoToRecapKindLayout={onGoToRecapKindLayoutMock} />,
    );

    fireEvent.click(getByText("Skills"));

    expect(onGoToRecapKindLayoutMock).toHaveBeenCalledWith("Skills");
  });

  test("should attempt to go to organizations recap layout when clicking organizations card", () => {
    const onGoToRecapKindLayoutMock = jest.fn();
    const { getByText } = render(
      <RecapLandingListCards {...defaultProps} onGoToRecapKindLayout={onGoToRecapKindLayoutMock} />,
    );

    fireEvent.click(getByText("Organizations"));

    expect(onGoToRecapKindLayoutMock).toHaveBeenCalledWith("Organizations");
  });

  test("should attempt to go to side projects recap layout when clicking side projects card", () => {
    const onGoToRecapKindLayoutMock = jest.fn();
    const { getByText } = render(
      <RecapLandingListCards {...defaultProps} onGoToRecapKindLayout={onGoToRecapKindLayoutMock} />,
    );

    fireEvent.click(getByText("Side Projects"));

    expect(onGoToRecapKindLayoutMock).toHaveBeenCalledWith("Side Projects");
  });

  test("should attempt to go to publications recap layout when clicking publications card", () => {
    const onGoToRecapKindLayoutMock = jest.fn();
    const { getByText } = render(
      <RecapLandingListCards {...defaultProps} onGoToRecapKindLayout={onGoToRecapKindLayoutMock} />,
    );

    fireEvent.click(getByText("Publications"));

    expect(onGoToRecapKindLayoutMock).toHaveBeenCalledWith("Publications");
  });

  test("should attempt to go to references recap layout when clicking references card", () => {
    const onGoToRecapKindLayoutMock = jest.fn();
    const { getByText } = render(
      <RecapLandingListCards {...defaultProps} onGoToRecapKindLayout={onGoToRecapKindLayoutMock} />,
    );

    fireEvent.click(getByText("References"));

    expect(onGoToRecapKindLayoutMock).toHaveBeenCalledWith("References");
  });

  test("should attempt to go to other recap layout when clicking other card", () => {
    const onGoToRecapKindLayoutMock = jest.fn();
    const { getByText } = render(
      <RecapLandingListCards {...defaultProps} onGoToRecapKindLayout={onGoToRecapKindLayoutMock} />,
    );

    fireEvent.click(getByText("Other"));

    expect(onGoToRecapKindLayoutMock).toHaveBeenCalledWith("Other");
  });
});
