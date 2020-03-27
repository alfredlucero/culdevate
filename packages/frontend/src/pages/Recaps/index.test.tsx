import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import Recaps from "./index";
import * as RecapsService from "./recaps.service";

describe("<Recaps />", () => {
  test("should render the loading state when fetching recaps", () => {
    const { getByTestId } = render(<Recaps />);

    expect(getByTestId("recapsPageLoading")).toBeVisible();
  });

  test("should show the error state after failing to fetch recaps", async () => {
    jest.spyOn(RecapsService, "getRecaps").mockImplementationOnce(() => Promise.reject({}));

    const { getByTestId } = render(<Recaps />);

    await waitForElement(() => getByTestId("recapsPageError"));
  });

  test("should show the landing list cards after successfully fetching recaps", async () => {
    jest.spyOn(RecapsService, "getRecaps").mockImplementationOnce(() => Promise.reject({}));

    const { getByTestId } = render(<Recaps />);

    await waitForElement(() => getByTestId("recapsPageError"));
  });

  test("should go to the Work Experience layout and be able to go back after clicking the Work Experience card", async () => {
    jest.spyOn(RecapsService, "getRecaps").mockImplementationOnce(() => Promise.resolve([]));

    const { getByTestId, getByText, getAllByText, findByText } = render(<Recaps />);

    await waitForElement(() => getByTestId("recapsPage"));

    fireEvent.click(getByText("Work Experience"));

    const addRecapButton = await findByText("Add a Recap");
    expect(addRecapButton).toBeVisible();
    expect(getAllByText("Work Experience")).toBeTruthy();

    fireEvent.click(getByText("Back to Recaps"));
    const viewAllButton = await findByText("View All");
    expect(viewAllButton).toBeVisible();
    expect(getByText("Recaps")).toBeVisible();
  });

  test("should go to the Education layout and be able to go back after clicking Education card", async () => {
    jest.spyOn(RecapsService, "getRecaps").mockImplementationOnce(() => Promise.resolve([]));

    const { getByTestId, getByText, getAllByText, findByText } = render(<Recaps />);

    await waitForElement(() => getByTestId("recapsPage"));

    fireEvent.click(getByText("Education"));

    const addRecapButton = await findByText("Add a Recap");
    expect(addRecapButton).toBeVisible();
    expect(getAllByText("Education")).toBeTruthy();

    fireEvent.click(getByText("Back to Recaps"));
    const viewAllButton = await findByText("View All");
    expect(viewAllButton).toBeVisible();
    expect(getByText("Recaps")).toBeVisible();
  });

  test("should go to Accomplishments layout and be able to go back after clicking the Accomplishments card", async () => {
    jest.spyOn(RecapsService, "getRecaps").mockImplementationOnce(() => Promise.resolve([]));

    const { getByTestId, getByText, getAllByText, findByText } = render(<Recaps />);

    await waitForElement(() => getByTestId("recapsPage"));

    fireEvent.click(getByText("Accomplishments"));

    const addRecapButton = await findByText("Add a Recap");
    expect(addRecapButton).toBeVisible();
    expect(getAllByText("Accomplishments")).toBeTruthy();

    fireEvent.click(getByText("Back to Recaps"));
    const viewAllButton = await findByText("View All");
    expect(viewAllButton).toBeVisible();
    expect(getByText("Recaps")).toBeVisible();
  });

  test("should go to the Skills layout and be able to go back after clicking the Skills card", async () => {
    jest.spyOn(RecapsService, "getRecaps").mockImplementationOnce(() => Promise.resolve([]));

    const { getByTestId, getByText, getAllByText, findByText } = render(<Recaps />);

    await waitForElement(() => getByTestId("recapsPage"));

    fireEvent.click(getByText("Skills"));

    const addRecapButton = await findByText("Add a Recap");
    expect(addRecapButton).toBeVisible();
    expect(getAllByText("Skills")).toBeTruthy();

    fireEvent.click(getByText("Back to Recaps"));
    const viewAllButton = await findByText("View All");
    expect(viewAllButton).toBeVisible();
    expect(getByText("Recaps")).toBeVisible();
  });

  test("should go to the Organizations layout and be able to go back after clicking the Organizations card", async () => {
    jest.spyOn(RecapsService, "getRecaps").mockImplementationOnce(() => Promise.resolve([]));

    const { getByTestId, getByText, getAllByText, findByText } = render(<Recaps />);

    await waitForElement(() => getByTestId("recapsPage"));

    fireEvent.click(getByText("Organizations"));

    const addRecapButton = await findByText("Add a Recap");
    expect(addRecapButton).toBeVisible();
    expect(getAllByText("Organizations")).toBeTruthy();

    fireEvent.click(getByText("Back to Recaps"));
    const viewAllButton = await findByText("View All");
    expect(viewAllButton).toBeVisible();
    expect(getByText("Recaps")).toBeVisible();
  });

  test("should go to the Side Projects layout and be able to go back after clicking the Side Projects card", async () => {
    jest.spyOn(RecapsService, "getRecaps").mockImplementationOnce(() => Promise.resolve([]));

    const { getByTestId, getByText, getAllByText, findByText } = render(<Recaps />);

    await waitForElement(() => getByTestId("recapsPage"));

    fireEvent.click(getByText("Side Projects"));

    const addRecapButton = await findByText("Add a Recap");
    expect(addRecapButton).toBeVisible();
    expect(getAllByText("Side Projects")).toBeTruthy();

    fireEvent.click(getByText("Back to Recaps"));
    const viewAllButton = await findByText("View All");
    expect(viewAllButton).toBeVisible();
    expect(getByText("Recaps")).toBeVisible();
  });

  test("should go to the Publications layout and be able to go back after clicking the Publications card", async () => {
    jest.spyOn(RecapsService, "getRecaps").mockImplementationOnce(() => Promise.resolve([]));

    const { getByTestId, getByText, getAllByText, findByText } = render(<Recaps />);

    await waitForElement(() => getByTestId("recapsPage"));

    fireEvent.click(getByText("Publications"));

    const addRecapButton = await findByText("Add a Recap");
    expect(addRecapButton).toBeVisible();
    expect(getAllByText("Publications")).toBeTruthy();

    fireEvent.click(getByText("Back to Recaps"));
    const viewAllButton = await findByText("View All");
    expect(viewAllButton).toBeVisible();
    expect(getByText("Recaps")).toBeVisible();
  });

  test("should go to the References layout and be able to go back after clicking the References card", async () => {
    jest.spyOn(RecapsService, "getRecaps").mockImplementationOnce(() => Promise.resolve([]));

    const { getByTestId, getByText, getAllByText, findByText } = render(<Recaps />);

    await waitForElement(() => getByTestId("recapsPage"));

    fireEvent.click(getByText("References"));

    const addRecapButton = await findByText("Add a Recap");
    expect(addRecapButton).toBeVisible();
    expect(getAllByText("References")).toBeTruthy();

    fireEvent.click(getByText("Back to Recaps"));
    const viewAllButton = await findByText("View All");
    expect(viewAllButton).toBeVisible();
    expect(getByText("Recaps")).toBeVisible();
  });

  test("should go to the Other layout and be able to go back after clicking the Other card", async () => {
    jest.spyOn(RecapsService, "getRecaps").mockImplementationOnce(() => Promise.resolve([]));

    const { getByTestId, getAllByText, getByText, findByText } = render(<Recaps />);

    await waitForElement(() => getByTestId("recapsPage"));

    fireEvent.click(getByText("Other"));

    const addRecapButton = await findByText("Add a Recap");
    expect(addRecapButton).toBeVisible();
    expect(getAllByText("Other")).toBeTruthy();

    fireEvent.click(getByText("Back to Recaps"));
    const viewAllButton = await findByText("View All");
    expect(viewAllButton).toBeVisible();
    expect(getByText("Recaps")).toBeVisible();
  });
});
