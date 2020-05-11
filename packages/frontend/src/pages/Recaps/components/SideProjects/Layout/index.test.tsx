import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import SideProjectsLayout, { SideProjectsLayoutProps } from "./index";
import { RecapSideProjects, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const sampleRecapSideProjects: RecapSideProjects = {
  title: "Zeta Mu Beta Website",
  creators: "Alfred Lucero and Regine Deguzman",
  startDate: new Date("2016/11/01").toISOString(),
  endDate: new Date("2016/12/31").toISOString(),
  kind: RecapKind.SideProjects,
  userId: "userId",
  _id: "sideProjectsId",
  bulletPoints: ["Created fraternity website on www.zetamubeta.org with MEAN stack"],
};
const defaultProps: SideProjectsLayoutProps = {
  recaps: [sampleRecapSideProjects],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<SideProjectsLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <SideProjectsLayout
        {...defaultProps}
        testId="sideProjectsLayoutTestId"
        className="extra-side-projects-layout-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<SideProjectsLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("sideProjectsRecap")).toBeNull();

    expect(getByTestId("sideProjectsEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<SideProjectsLayout {...defaultProps} />);

    expect(queryByTestId("sideProjectsEmptyCard")).toBeNull();

    expect(getByTestId("sideProjectsRecap")).toBeVisible();
  });

  test("should show the success alert after deleting a recap successfully", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <SideProjectsLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapSideProjects));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).toHaveBeenCalled();
    const successAlert = await findByText("You have successfully deleted the Side Projects Recap!");
    expect(successAlert).toBeVisible();
  });

  test("should show the error alert after failing to delete a recap", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <SideProjectsLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).not.toHaveBeenCalled();
    const errorAlert = await findByText("Something went wrong with deleting the Side Projects Recap!", {
      exact: false,
    });
    expect(errorAlert).toBeVisible();
  });

  test("should show the success alert after creating a recap successfully", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId, queryByText } = render(
      <SideProjectsLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Side Projects Recap");
    expect(createModal).toBeVisible();

    const recap: RecapSideProjects = {
      kind: RecapKind.SideProjects,
      title: "Side Projects Title",
      creators: "Creators",
      startDate: new Date("2016/11/01").toISOString(),
      endDate: new Date("2016/12/31").toISOString(),
      userId: "userId",
      _id: "sideProjectsId",
      bulletPoints: [],
    };

    fireEvent.change(getByLabelText(RecapFields.sideProjectsTitle), { target: { value: recap.title } });
    fireEvent.blur(getByLabelText(RecapFields.sideProjectsTitle));

    fireEvent.change(getByLabelText(RecapFields.sideProjectsCreators), { target: { value: recap.creators } });
    fireEvent.blur(getByLabelText(RecapFields.sideProjectsCreators));

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    expect(getByTestId("sideProjectsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.resolve(recap));

    fireEvent.click(getByTestId("sideProjectsSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Create a Side Projects Recap"));

    expect(onCreateRecapSuccessMock).toHaveBeenCalled();
    expect(queryByText("You have successfully created a Side Projects Recap!")).toBeVisible();
  });

  test("should show the error alert after failing to create a recap", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId } = render(
      <SideProjectsLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Side Projects Recap");
    expect(createModal).toBeVisible();

    const recap: RecapSideProjects = {
      kind: RecapKind.SideProjects,
      title: "Side Projects Title",
      creators: "Creators",
      startDate: new Date("2016/11/01").toISOString(),
      endDate: new Date("2016/12/31").toISOString(),
      userId: "userId",
      _id: "sideProjectsId",
      bulletPoints: [],
    };

    fireEvent.change(getByLabelText(RecapFields.sideProjectsTitle), { target: { value: recap.title } });
    fireEvent.blur(getByLabelText(RecapFields.sideProjectsTitle));

    fireEvent.change(getByLabelText(RecapFields.sideProjectsCreators), { target: { value: recap.creators } });
    fireEvent.blur(getByLabelText(RecapFields.sideProjectsCreators));

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    expect(getByTestId("sideProjectsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("sideProjectsSaveButton"));

    const createErrorAlert = await findByText("Something went wrong with adding a Side Projects Recap!", {
      exact: false,
    });

    expect(createErrorAlert).toBeVisible();
    expect(getByText("Create a Side Projects Recap")).toBeVisible();
    expect(onCreateRecapSuccessMock).not.toHaveBeenCalled();
  });

  test("should show the success alert after updating a recap successfully", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <SideProjectsLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Side Projects Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("sideProjectsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapSideProjects));

    fireEvent.click(getByTestId("sideProjectsSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Edit your Side Projects Recap"));

    expect(queryByText("You have successfully updated a Side Projects Recap!")).toBeVisible();
    expect(onUpdateRecapSuccessMock).toHaveBeenCalled();
  });

  test("should show the error alert after failing to update a recap", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <SideProjectsLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Side Projects Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("sideProjectsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("sideProjectsSaveButton"));

    const updateErrorAlert = await findByText("Something went wrong with updating a Side Projects Recap!", {
      exact: false,
    });
    expect(updateErrorAlert).toBeVisible();

    expect(queryByText("Edit your Side Projects Recap")).toBeVisible();
    expect(onUpdateRecapSuccessMock).not.toHaveBeenCalled();
  });
});
