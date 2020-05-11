import React, { useEffect, useState } from "react";
import cn from "classnames";
import { reach } from "yup";
import TextInput from "../../../../../components/TextInput";
import Select, { SelectOption } from "../../../../../components/Select";
import DatePicker from "../../../../../components/DatePicker";
import BulletPointInputList from "../../BulletPointInputList";
import Button from "../../../../../components/Button";
import { RecapsCreateErrorAlert, RecapsUpdateErrorAlert } from "../../RecapsAlerts";
import { CommonProps } from "../../../../../components/commonProps";
import { RecapPublications, RecapCreate, PublicationType, RecapKind } from "../../../recaps.interface";
import { useBulletPointInputList } from "../../../hooks/useBulletPointInputList";
import { createRecap, updateRecap } from "../../../recaps.service";
import { RecapPublicationsSchema, recapBaseErrors, RecapFields, recapPublicationsErrors } from "../../../recaps.schema";

const publicationTypes: PublicationType[] = ["Book", "Journal", "Newspaper", "Magazine", "Blog", "Other"];
const publicationTypeSelectOptions: SelectOption[] = publicationTypes.map(publicationType => ({
  label: publicationType,
  value: publicationType,
}));

export interface PublicationsFormProps extends CommonProps {
  initialRecap: RecapPublications | null;
  onSaveSuccess: (savedRecap: RecapPublications) => void;
  isShowing: boolean;
  onHide: () => void;
}

const PublicationsForm: React.FC<PublicationsFormProps> = ({
  initialRecap,
  onSaveSuccess,
  isShowing,
  onHide,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onBlurTitle = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentTitle = e.currentTarget.value;
    try {
      reach(RecapPublicationsSchema, "title").validateSync(currentTitle);
      setTitleError("");
    } catch (err) {
      setTitleError(err.message);
    }
  };

  const [publicationType, setPublicationType] = useState("Book");
  const onChangePublicationType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPublicationType(e.currentTarget.value);
  };

  const [coauthors, setCoauthors] = useState("");
  const [coauthorsError, setCoauthorsError] = useState("");
  const onChangeCoauthors = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoauthors(e.currentTarget.value);
  };
  const onBlurCoauthors = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentCoauthors = e.currentTarget.value;
    try {
      reach(RecapPublicationsSchema, "coauthors").validateSync(currentCoauthors);
      setCoauthorsError("");
    } catch (err) {
      setCoauthorsError(err.message);
    }
  };

  const [publisher, setPublisher] = useState("");
  const [publisherError, setPublisherError] = useState("");
  const onChangePublisher = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublisher(e.currentTarget.value);
  };
  const onBlurPublisher = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentPublisher = e.currentTarget.value;
    try {
      reach(RecapPublicationsSchema, "publisher").validateSync(currentPublisher);
      setPublisherError("");
    } catch (err) {
      setPublisherError(err.message);
    }
  };

  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };
  const onBlurUrl = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentUrl = e.currentTarget.value;
    try {
      reach(RecapPublicationsSchema, "url").validateSync(currentUrl);
      setUrlError("");
    } catch (err) {
      setUrlError(err.message);
    }
  };

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startDateError, setStartDateError] = useState("");
  const onChangeStartDate = (date: Date | null) => {
    setStartDate(date);
  };

  const onBlurStartDate = () => {
    if (!startDate) {
      setStartDateError(recapPublicationsErrors.dateRequired);
      return;
    }

    setStartDateError("");
  };

  const {
    bulletPointInputList,
    onDragEnd,
    onChangeBulletPointInput,
    onBlurBulletPointInput,
    onAddBulletPointInput,
    onDeleteBulletPointInput,
    isAddBulletPointInputDisabled,
    resetBulletPointInputList,
  } = useBulletPointInputList({
    initialBulletPoints: [],
    idPrefix: "publicationsBulletPoint",
  });

  const clearOutInputs = () => {
    setTitle("");
    setTitleError("");
    setPublicationType("Book");
    setCoauthors("");
    setCoauthorsError("");
    setPublisher("");
    setPublisherError("");
    setStartDate(null);
    setStartDateError("");
    resetBulletPointInputList([]);
  };

  useEffect(() => {
    // Upon closing out the modal/swapping forms, clear out all the inputs to their default empty values
    if (!isShowing) {
      clearOutInputs();
      return;
    }

    // Upon showing the form/modal to edit a recap, set the inputs to match the recap's initial values
    if (initialRecap !== null) {
      setTitle(initialRecap.title);
      setTitleError("");
      setPublicationType(initialRecap.type);
      setCoauthors(initialRecap.coauthors);
      setCoauthorsError("");
      setPublisher(initialRecap.publisher);
      setPublisherError("");
      setStartDate(new Date(initialRecap.startDate));
      setStartDateError("");
      resetBulletPointInputList(initialRecap.bulletPoints);
    } else {
      // Otherwise, for creating a modal, clear out all the inputs to their default empty values
      clearOutInputs();
    }
  }, [initialRecap, isShowing]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitCreateError, setIsSubmitCreateError] = useState(false);
  const [isSubmitUpdateError, setIsSubmitUpdateError] = useState(false);
  const onHideSubmitCreateError = () => {
    setIsSubmitCreateError(false);
  };
  const onHideSubmitUpdateError = () => {
    setIsSubmitUpdateError(false);
  };

  const triggerUpdateRecap = () => {
    if (!initialRecap) {
      return;
    }

    const { _id, userId, kind } = initialRecap;
    const updatedBulletPoints = bulletPointInputList
      .filter(bulletPoint => bulletPoint.value !== "")
      .map(bulletPoint => bulletPoint.value);
    const updatedPublicationsRecap: RecapPublications = {
      _id,
      userId,
      kind,
      bulletPoints: updatedBulletPoints,
      title,
      type: publicationType as PublicationType,
      coauthors,
      publisher,
      url,
      startDate: (startDate as Date).toISOString(),
    };

    setIsSubmitting(true);
    updateRecap(updatedPublicationsRecap)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitUpdateError(false);
        onSaveSuccess(savedRecap as RecapPublications);
        onHide();
      })
      .catch(() => {
        setIsSubmitting(false);
        setIsSubmitUpdateError(true);
      });
  };

  const triggerCreateRecap = () => {
    const updatedBulletPoints = bulletPointInputList
      .filter(bulletPoint => bulletPoint.value !== "")
      .map(bulletPoint => bulletPoint.value);
    const recapToCreate: RecapCreate = {
      kind: RecapKind.Publications,
      bulletPoints: updatedBulletPoints,
      title,
      type: publicationType as PublicationType,
      coauthors,
      publisher,
      url,
      startDate: (startDate as Date).toISOString(),
    };

    setIsSubmitting(true);
    createRecap(recapToCreate)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitCreateError(false);
        onSaveSuccess(savedRecap as RecapPublications);
        onHide();
      })
      .catch(() => {
        setIsSubmitting(false);
        setIsSubmitCreateError(true);
      });
  };

  const hasValidInputs =
    title &&
    !titleError &&
    publicationType &&
    coauthors &&
    !coauthorsError &&
    publisher &&
    !publisherError &&
    !urlError &&
    startDate &&
    !startDateError &&
    bulletPointInputList.every(bulletPointInput => bulletPointInput.valid);
  const isSaveButtonDisabled = isSubmitting || !hasValidInputs;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSaveButtonDisabled) {
      return;
    }

    const isEditingRecap = initialRecap !== null;
    if (isEditingRecap) {
      triggerUpdateRecap();
    } else {
      triggerCreateRecap();
    }
  };

  return (
    <div className={cn("mt-4", className)} {...(testId !== "" ? { "data-testid": testId } : {})} {...passThroughProps}>
      <RecapsCreateErrorAlert
        kind={RecapKind.Publications}
        isShowing={isSubmitCreateError}
        onHide={onHideSubmitCreateError}
      />
      <RecapsUpdateErrorAlert
        kind={RecapKind.Publications}
        isShowing={isSubmitUpdateError}
        onHide={onHideSubmitUpdateError}
      />
      <form onSubmit={onSubmit}>
        <div className="flex w-full mb-4">
          <TextInput
            id="title"
            placeholder="What is the title of your publication?"
            value={title}
            onChange={onChangeTitle}
            onBlur={onBlurTitle}
            type="text"
            required={true}
            label={RecapFields.publicationsTitle}
            valid={!titleError}
            errorInfo={titleError}
            className="w-1/2 mr-4"
          />
          <Select
            id="publicationType"
            value={publicationType}
            options={publicationTypeSelectOptions}
            onChange={onChangePublicationType}
            label={RecapFields.publicationsType}
            required={true}
            className="w-1/2"
          />
        </div>

        <div className="flex w-full mb-4">
          <TextInput
            id="coauthors"
            placeholder="Who were the authors?"
            value={coauthors}
            onChange={onChangeCoauthors}
            onBlur={onBlurCoauthors}
            type="text"
            required={true}
            label={RecapFields.publicationsCoauthors}
            valid={!coauthorsError}
            errorInfo={coauthorsError}
            className="w-1/2 mr-4"
          />
          <TextInput
            id="publisher"
            placeholder="Who published it?"
            value={publisher}
            onChange={onChangePublisher}
            onBlur={onBlurPublisher}
            type="text"
            required={true}
            label={RecapFields.publicationsPublisher}
            valid={!publisherError}
            errorInfo={publisherError}
            className="w-1/2"
          />
        </div>

        <div className="w-full mb-4">
          <TextInput
            id="url"
            placeholder="Is there a URL link to this publication somewhere?"
            value={url}
            onChange={onChangeUrl}
            onBlur={onBlurUrl}
            type="text"
            required={false}
            label={RecapFields.publicationsUrl}
            valid={!urlError}
            errorInfo={urlError}
            className="mr-4"
          />
        </div>

        <div className="flex w-full mb-4">
          <DatePicker
            id="publishDate"
            selected={startDate}
            onChange={onChangeStartDate}
            onBlur={onBlurStartDate}
            label={RecapFields.publicationsDate}
            required={true}
            valid={!startDateError}
            errorInfo={startDateError}
            className="mr-4 w-1/2"
            placeholder="When was it published?"
            dateFormat="MM/yyyy"
            showMonthYearPicker={true}
          />
        </div>

        <BulletPointInputList
          bulletPointInputList={bulletPointInputList}
          onDragEnd={onDragEnd}
          onChangeBulletPointInput={onChangeBulletPointInput}
          onBlurBulletPointInput={onBlurBulletPointInput}
          onDeleteBulletPointInput={onDeleteBulletPointInput}
          onAddBulletPointInput={onAddBulletPointInput}
          isAddBulletPointInputDisabled={isAddBulletPointInputDisabled}
          className="mb-6"
        />
        <div className="flex justify-end">
          <Button type="button" variant="secondary" onClick={onHide} className="mr-2">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSaveButtonDisabled}
            testId="publicationsSaveButton"
          >
            {isSubmitting && <>Saving Recap...</>}
            {!isSubmitting && <>Save Recap</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PublicationsForm;
