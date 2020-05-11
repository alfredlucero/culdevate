import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import PublicationsForm, { PublicationsFormProps } from "./index";
import { RecapPublications, RecapKind } from "../../../recaps.interface";
import {
  MAX_GENERAL_LENGTH,
  MAX_URL_LENGTH,
  recapPublicationsErrors as validationErrors,
} from "../../../recaps.schema";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const initialRecap: RecapPublications = {
  title: "Mindfulness-based Interventions for those with PTSD",
  kind: RecapKind.Publications,
  coauthors: "Gingin D.",
  userId: "userId",
  _id: "publicationsId",
  type: "Journal",
  bulletPoints: [],
  publisher: "UCI Psychology",
  startDate: new Date("2020/10/20").toISOString(),
  url: "http://psychology.journal.com",
};
const defaultProps: PublicationsFormProps = {
  initialRecap,
  onSaveSuccess: () => {},
  isShowing: true,
  onHide: () => {},
};

describe("<PublicationsForm />", () => {
  test("should render without error", () => {
    const { container } = render(
      <PublicationsForm {...defaultProps} testId="publicationsFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render pre-populated form inputs given initial recap", () => {
    const { container } = render(
      <PublicationsForm {...defaultProps} testId="publicationsFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show empty form inputs and disabled state given no initial recap", () => {
    const { container } = render(
      <PublicationsForm
        {...defaultProps}
        initialRecap={null}
        testId="publicationsFormTestId"
        className="extra-class-name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show title required error after blurring with no title", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsTitle), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsTitle));

    const requiredError = await findByText(validationErrors.titleRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("publicationsSaveButton")).toBeDisabled();
  });

  test("should show title max length error after blurring with title beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsTitle), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.publicationsTitle));

    const maxLengthError = await findByText(validationErrors.titleMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("publicationsSaveButton")).toBeDisabled();
  });

  test("should show title without inline error after blurring with valid title", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsTitle), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsTitle));

    const requiredError = await findByText(validationErrors.titleRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.publicationsTitle), { target: { value: "worktitle" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsTitle));

    expect(queryByText(validationErrors.titleRequired)).toBeNull();
  });

  test("should show coauthors required error after blurring with no coauthors", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsCoauthors), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsCoauthors));

    const requiredError = await findByText(validationErrors.coauthorsRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("publicationsSaveButton")).toBeDisabled();
  });

  test("should show coauthors max length error after blurring with coauthors beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsCoauthors), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.publicationsCoauthors));

    const maxLengthError = await findByText(validationErrors.coauthorsMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("publicationsSaveButton")).toBeDisabled();
  });

  test("should show coauthors without inline error after blurring with valid coauthors", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsCoauthors), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsCoauthors));

    const requiredError = await findByText(validationErrors.coauthorsRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.publicationsCoauthors), { target: { value: "coauthors" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsCoauthors));

    expect(queryByText(validationErrors.coauthorsRequired)).toBeNull();
  });

  test("should show publisher required error after blurring with no publisher", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsPublisher), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsPublisher));

    const requiredError = await findByText(validationErrors.publisherRequired);

    expect(requiredError).toBeVisible();
    expect(getByTestId("publicationsSaveButton")).toBeDisabled();
  });

  test("should show publisher max length error after blurring with publisher beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsPublisher), {
      target: { value: "a".repeat(MAX_GENERAL_LENGTH + 1) },
    });
    fireEvent.blur(getByLabelText(RecapFields.publicationsPublisher));

    const maxLengthError = await findByText(validationErrors.publisherMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("publicationsSaveButton")).toBeDisabled();
  });

  test("should show publisher without inline error after blurring with valid publisher", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsPublisher), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsPublisher));

    const requiredError = await findByText(validationErrors.publisherRequired);
    expect(requiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.publicationsPublisher), { target: { value: "publisher" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsPublisher));

    expect(queryByText(validationErrors.publisherRequired)).toBeNull();
  });

  test("should show url max length error after blurring with url beyond max length", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsUrl, { exact: false }), {
      target: { value: "www.blah.com" + "a".repeat(MAX_URL_LENGTH) },
    });
    fireEvent.blur(getByLabelText(RecapFields.publicationsUrl, { exact: false }));

    const maxLengthError = await findByText(validationErrors.urlMaxLength);

    expect(maxLengthError).toBeVisible();
    expect(getByTestId("publicationsSaveButton")).toBeDisabled();
  });

  test("should show invalid url error given url with invalid syntax", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsUrl, { exact: false }), {
      target: { value: "invalidurl" },
    });
    fireEvent.blur(getByLabelText(RecapFields.publicationsUrl, { exact: false }));

    const invalidUrlError = await findByText(validationErrors.urlInvalid);

    expect(invalidUrlError).toBeVisible();
    expect(getByTestId("publicationsSaveButton")).toBeDisabled();
  });

  test("should show url without inline error given valid url", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsUrl, { exact: false }), {
      target: { value: "invalidurl" },
    });
    fireEvent.blur(getByLabelText(RecapFields.publicationsUrl, { exact: false }));

    const invalidUrlError = await findByText(validationErrors.urlInvalid);
    expect(invalidUrlError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.publicationsUrl, { exact: false }), {
      target: { value: "https://www.validurl.com" },
    });
    fireEvent.blur(getByLabelText(RecapFields.publicationsUrl, { exact: false }));

    expect(queryByText(validationErrors.urlInvalid)).toBeNull();
  });

  test("should show publish date required error after blurring with no publish date", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsDate), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsDate));

    const publishDateRequiredError = await findByText(validationErrors.dateRequired);

    expect(publishDateRequiredError).toBeVisible();
    expect(getByTestId("publicationsSaveButton")).toBeDisabled();
  });

  test("should show publish date without inline error after blurring valid publish date", async () => {
    const { getByLabelText, findByText, queryByText } = render(
      <PublicationsForm {...defaultProps} initialRecap={null} />,
    );

    fireEvent.change(getByLabelText(RecapFields.publicationsDate), { target: { value: "" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsDate));

    const publishDateRequiredError = await findByText(validationErrors.dateRequired);
    expect(publishDateRequiredError).toBeVisible();

    fireEvent.change(getByLabelText(RecapFields.publicationsDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.publicationsDate));

    expect(queryByText(validationErrors.dateRequired)).toBeNull();
  });

  test("should call onHide after clicking Cancel button", () => {
    const onHideMock = jest.fn();
    const { getByText } = render(<PublicationsForm {...defaultProps} initialRecap={null} onHide={onHideMock} />);

    fireEvent.click(getByText("Cancel"));

    expect(onHideMock).toHaveBeenCalled();
  });

  test("should call onSaveSuccess after saving successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId } = render(<PublicationsForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />);

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(initialRecap));

    expect(getByTestId("publicationsSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("publicationsSaveButton"));

    await waitFor(() => {
      expect(onSaveSuccessMock).toHaveBeenCalled();
    });
  });

  test("should not call onSaveSuccess after failing to save successfully with valid fields", async () => {
    const onSaveSuccessMock = jest.fn();
    const { getByTestId, findByText } = render(
      <PublicationsForm {...defaultProps} onSaveSuccess={onSaveSuccessMock} />,
    );

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    expect(getByTestId("publicationsSaveButton")).not.toBeDisabled();
    fireEvent.click(getByTestId("publicationsSaveButton"));

    await findByText("Something went wrong with updating a Publications Recap!", { exact: false });
    expect(onSaveSuccessMock).not.toHaveBeenCalled();
  });
});
