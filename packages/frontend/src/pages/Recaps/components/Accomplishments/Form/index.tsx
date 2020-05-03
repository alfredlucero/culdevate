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
import { RecapAccomplishments, RecapCreate, RecapKind, AccomplishmentsType } from "../../../recaps.interface";
import { useBulletPointInputList } from "../../../hooks/useBulletPointInputList";
import { createRecap, updateRecap } from "../../../recaps.service";
import { RecapAccomplishmentsSchema, recapBaseErrors, RecapFields } from "../../../recaps.schema";

const accomplishmentsTypes: AccomplishmentsType[] = [
  "Personal", // Mentorship, Health, Fitness, Learning, etc.
  "Service", // Volunteer, Community Service, Philanthropy, etc.
  "Featured", // Presentations, Conferences, TV Shows, Public Interviews, Podcasts, Radio, etc.
  "School", // Test Score, Scholarship, Honor Roll, Clubs, Organizations, etc.
  "Career", // Promotion, Work Awards, etc.
  "Other",
];
const accomplishmentsTypeSelectOptions: SelectOption[] = accomplishmentsTypes.map(accomplishmentsType => ({
  label: accomplishmentsType,
  value: accomplishmentsType,
}));

export interface AccomplishmentsFormProps extends CommonProps {
  initialRecap: RecapAccomplishments | null;
  onSaveSuccess: (savedRecap: RecapAccomplishments) => void;
  isShowing: boolean;
  onHide: () => void;
}

const AccomplishmentsForm: React.FC<AccomplishmentsFormProps> = ({
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
      reach(RecapAccomplishmentsSchema, "title").validateSync(currentTitle);
      setTitleError("");
    } catch (err) {
      setTitleError(err.message);
    }
  };

  const [accomplishmentsType, setAccomplishmentsType] = useState("Career");
  const onChangeAccomplishmentsType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccomplishmentsType(e.currentTarget.value);
  };

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startDateError, setStartDateError] = useState("");
  const onChangeStartDate = (date: Date | null) => {
    setStartDate(date);
  };
  const onBlurStartDate = () => {
    if (!startDate) {
      setStartDateError(recapBaseErrors.dateInvalid);
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
    idPrefix: "accomplishmentsBulletPoint",
  });

  const clearOutInputs = () => {
    setTitle("");
    setTitleError("");
    setAccomplishmentsType("Career");
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
      setAccomplishmentsType(initialRecap.type);
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
    const updatedAccomplishmentsRecap: RecapAccomplishments = {
      _id,
      userId,
      kind,
      bulletPoints: updatedBulletPoints,
      title,
      type: accomplishmentsType as AccomplishmentsType,
      startDate: (startDate as Date).toISOString(),
    };

    setIsSubmitting(true);
    updateRecap(updatedAccomplishmentsRecap)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitUpdateError(false);
        onSaveSuccess(savedRecap as RecapAccomplishments);
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
      kind: RecapKind.Accomplishments,
      bulletPoints: updatedBulletPoints,
      title,
      type: accomplishmentsType as AccomplishmentsType,
      startDate: (startDate as Date).toISOString(),
    };

    setIsSubmitting(true);
    createRecap(recapToCreate)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitCreateError(false);
        onSaveSuccess(savedRecap as RecapAccomplishments);
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
    accomplishmentsType &&
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
        kind={RecapKind.Accomplishments}
        isShowing={isSubmitCreateError}
        onHide={onHideSubmitCreateError}
      />
      <RecapsUpdateErrorAlert
        kind={RecapKind.Accomplishments}
        isShowing={isSubmitUpdateError}
        onHide={onHideSubmitUpdateError}
      />
      <form onSubmit={onSubmit}>
        <div className="flex w-full mb-4">
          <TextInput
            id="title"
            placeholder="What did you accomplish?"
            value={title}
            onChange={onChangeTitle}
            onBlur={onBlurTitle}
            type="text"
            required={true}
            label={RecapFields.accomplishmentsTitle}
            valid={!titleError}
            errorInfo={titleError}
            className="w-1/2 mr-4"
          />
          <Select
            id="accomplishmentsType"
            value={accomplishmentsType}
            options={accomplishmentsTypeSelectOptions}
            onChange={onChangeAccomplishmentsType}
            label={RecapFields.accomplishmentsType}
            required={true}
            className="w-1/2"
          />
        </div>

        <div className="flex w-full mb-4">
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={onChangeStartDate}
            onBlur={onBlurStartDate}
            label={RecapFields.accomplishmentsDate}
            required={true}
            valid={!startDateError}
            errorInfo={startDateError}
            className="mr-4 w-1/2"
            placeholder="When did you accomplish this?"
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
            testId="accomplishmentsSaveButton"
          >
            {isSubmitting && <>Saving Recap...</>}
            {!isSubmitting && <>Save Recap</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccomplishmentsForm;
