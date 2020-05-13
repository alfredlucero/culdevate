import React, { useEffect, useState } from "react";
import cn from "classnames";
import { reach } from "yup";
import { isBefore } from "date-fns";
import TextInput from "../../../../../components/TextInput";
import DatePicker from "../../../../../components/DatePicker";
import BulletPointInputList from "../../BulletPointInputList";
import Button from "../../../../../components/Button";
import { RecapsCreateErrorAlert, RecapsUpdateErrorAlert } from "../../RecapsAlerts";
import { CommonProps } from "../../../../../components/commonProps";
import { RecapOther, RecapCreate, RecapKind } from "../../../recaps.interface";
import { useBulletPointInputList } from "../../../hooks/useBulletPointInputList";
import { createRecap, updateRecap } from "../../../recaps.service";
import { RecapOtherSchema, recapBaseErrors, RecapFields } from "../../../recaps.schema";

export interface OtherFormProps extends CommonProps {
  initialRecap: RecapOther | null;
  onSaveSuccess: (savedRecap: RecapOther) => void;
  isShowing: boolean;
  onHide: () => void;
}

const OtherForm: React.FC<OtherFormProps> = ({
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
      reach(RecapOtherSchema, "title").validateSync(currentTitle);
      setTitleError("");
    } catch (err) {
      setTitleError(err.message);
    }
  };

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startDateError, setStartDateError] = useState("");
  const onChangeStartDate = (date: Date | null) => {
    setStartDate(date);
  };

  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endDateError, setEndDateError] = useState("");
  const onChangeEndDate = (date: Date | null) => {
    setEndDate(date);
  };

  const onBlurStartDate = () => {
    if (!startDate) {
      setStartDateError(recapBaseErrors.startDateInvalid);
      return;
    }

    if (endDate && !isBefore(startDate, endDate)) {
      setStartDateError(recapBaseErrors.dateRangeInvalid);
      setEndDateError(recapBaseErrors.dateRangeInvalid);
    } else {
      setStartDateError("");
      setEndDateError("");
    }
  };

  const onBlurEndDate = () => {
    if (!endDate) {
      setEndDateError(recapBaseErrors.endDateInvalid);
      return;
    }

    if (startDate && !isBefore(startDate, endDate)) {
      setStartDateError(recapBaseErrors.dateRangeInvalid);
      setEndDateError(recapBaseErrors.dateRangeInvalid);
    } else {
      setStartDateError("");
      setEndDateError("");
    }
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
    idPrefix: "otherBulletPoint",
  });

  const clearOutInputs = () => {
    setTitle("");
    setTitleError("");
    setStartDate(null);
    setStartDateError("");
    setEndDate(null);
    setEndDateError("");
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
      setStartDate(new Date(initialRecap.startDate));
      setStartDateError("");
      setEndDate(new Date(initialRecap.endDate));
      setEndDateError("");
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
    const updatedOtherRecap: RecapOther = {
      _id,
      userId,
      kind,
      bulletPoints: updatedBulletPoints,
      title,
      startDate: (startDate as Date).toISOString(),
      endDate: (endDate as Date).toISOString(),
    };

    setIsSubmitting(true);
    updateRecap(updatedOtherRecap)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitUpdateError(false);
        onSaveSuccess(savedRecap as RecapOther);
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
      kind: RecapKind.Other,
      bulletPoints: updatedBulletPoints,
      title,
      startDate: (startDate as Date).toISOString(),
      endDate: (endDate as Date).toISOString(),
    };

    setIsSubmitting(true);
    createRecap(recapToCreate)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitCreateError(false);
        onSaveSuccess(savedRecap as RecapOther);
        onHide();
      })
      .catch(() => {
        setIsSubmitting(false);
        setIsSubmitCreateError(true);
      });
  };

  const hasValidInputs = title && !titleError && startDate && !startDateError && endDate && !endDateError;
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
      <RecapsCreateErrorAlert kind={RecapKind.Other} isShowing={isSubmitCreateError} onHide={onHideSubmitCreateError} />
      <RecapsUpdateErrorAlert kind={RecapKind.Other} isShowing={isSubmitUpdateError} onHide={onHideSubmitUpdateError} />
      <form onSubmit={onSubmit}>
        <div className="w-full mb-4">
          <TextInput
            id="title"
            placeholder="What other thing would you like to recap?"
            value={title}
            onChange={onChangeTitle}
            onBlur={onBlurTitle}
            type="text"
            required={true}
            label={RecapFields.otherTitle}
            valid={!titleError}
            errorInfo={titleError}
            className="mr-4"
          />
        </div>

        <div className="flex w-full mb-4">
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={onChangeStartDate}
            onBlur={onBlurStartDate}
            label={RecapFields.startDate}
            required={true}
            valid={!startDateError}
            errorInfo={startDateError}
            className="mr-4 w-1/2"
            placeholder="When did it happen?"
            dateFormat="MM/yyyy"
            showMonthYearPicker={true}
          />

          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={onChangeEndDate}
            onBlur={onBlurEndDate}
            label={RecapFields.endDate}
            required={true}
            valid={!endDateError}
            errorInfo={endDateError}
            placeholder="When did it finish?"
            dateFormat="MM/yyyy"
            showMonthYearPicker={true}
            className="w-1/2"
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
            testId="otherSaveButton"
          >
            {isSubmitting && <>Saving Recap...</>}
            {!isSubmitting && <>Save Recap</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OtherForm;
