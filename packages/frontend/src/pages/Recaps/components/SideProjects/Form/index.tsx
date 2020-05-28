import React, { useEffect, useState } from "react";
import cn from "classnames";
import { reach } from "yup";
import { isBefore } from "date-fns";
import TextInput from "../../../../../components/TextInput";
import Checkbox from "../../../../../components/Checkbox";
import DatePicker from "../../../../../components/DatePicker";
import BulletPointInputList from "../../BulletPointInputList";
import Button from "../../../../../components/Button";
import { RecapsCreateErrorAlert, RecapsUpdateErrorAlert } from "../../RecapsAlerts";
import { CommonProps } from "../../../../../components/commonProps";
import { RecapSideProjects, RecapCreate, RecapKind } from "../../../recaps.interface";
import { useBulletPointInputList } from "../../../hooks/useBulletPointInputList";
import { createRecap, updateRecap } from "../../../recaps.service";
import { RecapSideProjectsSchema, recapBaseErrors, RecapFields } from "../../../recaps.schema";

export interface SideProjectsFormProps extends CommonProps {
  initialRecap: RecapSideProjects | null;
  onSaveSuccess: (savedRecap: RecapSideProjects) => void;
  isShowing: boolean;
  onHide: () => void;
}

const SideProjectsForm: React.FC<SideProjectsFormProps> = ({
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
      reach(RecapSideProjectsSchema, "title").validateSync(currentTitle);
      setTitleError("");
    } catch (err) {
      setTitleError(err.message);
    }
  };

  const [creators, setCreators] = useState("");
  const [creatorsError, setCreatorsError] = useState("");
  const onChangeCreators = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreators(e.currentTarget.value);
  };
  const onBlurCreators = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentCreators = e.currentTarget.value;
    try {
      reach(RecapSideProjectsSchema, "creators").validateSync(currentCreators);
      setCreatorsError("");
    } catch (err) {
      setCreatorsError(err.message);
    }
  };

  const [isCurrentWork, setIsCurrentWork] = useState(false);
  const onChangeCurrentWorkCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    setIsCurrentWork(checked);
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

    // No end date, so it's valid if there is a start date
    if (isCurrentWork) {
      setStartDateError("");
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

  useEffect(() => {
    // Since there will be no end date when it is to the present, clear out any pre-existing end date errors/input
    if (isCurrentWork) {
      setEndDate(null);
      setEndDateError("");

      if (startDateError === recapBaseErrors.dateRangeInvalid) {
        setStartDateError("");
      }
    }
  }, [isCurrentWork]);

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
    idPrefix: "sideProjectsBulletPoint",
  });

  const clearOutInputs = () => {
    setTitle("");
    setTitleError("");
    setCreators("");
    setCreatorsError("");
    setIsCurrentWork(false);
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
      setCreators(initialRecap.creators);
      setCreatorsError("");
      setStartDate(new Date(initialRecap.startDate));
      setStartDateError("");
      if (initialRecap.endDate) {
        setEndDate(new Date(initialRecap.endDate));
      } else {
        setIsCurrentWork(true);
      }
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
    const updatedSideProjectsRecap: RecapSideProjects = {
      _id,
      userId,
      kind,
      bulletPoints: updatedBulletPoints,
      title,
      creators,
      startDate: (startDate as Date).toISOString(),
      ...(isCurrentWork ? { endDate: undefined } : { endDate: (endDate as Date).toISOString() }),
    };

    setIsSubmitting(true);
    updateRecap(updatedSideProjectsRecap)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitUpdateError(false);
        onSaveSuccess(savedRecap as RecapSideProjects);
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
      kind: RecapKind.SideProjects,
      bulletPoints: updatedBulletPoints,
      title,
      creators,
      startDate: (startDate as Date).toISOString(),
      ...(isCurrentWork ? { endDate: undefined } : { endDate: (endDate as Date).toISOString() }),
    };

    setIsSubmitting(true);
    createRecap(recapToCreate)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitCreateError(false);
        onSaveSuccess(savedRecap as RecapSideProjects);
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
    creators &&
    !creatorsError &&
    startDate &&
    !startDateError &&
    (isCurrentWork || (!isCurrentWork && endDate && !endDateError)) &&
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
        kind={RecapKind.SideProjects}
        isShowing={isSubmitCreateError}
        onHide={onHideSubmitCreateError}
        className="mb-4"
      />
      <RecapsUpdateErrorAlert
        kind={RecapKind.SideProjects}
        isShowing={isSubmitUpdateError}
        onHide={onHideSubmitUpdateError}
        className="mb-4"
      />
      <form onSubmit={onSubmit}>
        <div className="w-full mb-4">
          <TextInput
            id="title"
            placeholder="What was your side project called?"
            value={title}
            onChange={onChangeTitle}
            onBlur={onBlurTitle}
            type="text"
            required={true}
            label={RecapFields.sideProjectsTitle}
            valid={!titleError}
            errorInfo={titleError}
            className="mr-4"
          />
        </div>

        <div className="w-full mb-4">
          <TextInput
            id="creators"
            placeholder="Who did you create this with? i.e. Independent/Solo Founder, Cofounders"
            value={creators}
            onChange={onChangeCreators}
            onBlur={onBlurCreators}
            type="text"
            required={true}
            label={RecapFields.sideProjectsCreators}
            valid={!creatorsError}
            errorInfo={creatorsError}
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
            placeholder="When did you start working on this?"
            dateFormat="MM/yyyy"
            showMonthYearPicker={true}
          />
          {!isCurrentWork && (
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={onChangeEndDate}
              onBlur={onBlurEndDate}
              label={RecapFields.endDate}
              required={true}
              valid={!endDateError}
              errorInfo={endDateError}
              placeholder="When did you finish working on this?"
              dateFormat="MM/yyyy"
              showMonthYearPicker={true}
              className="w-1/2"
            />
          )}
        </div>

        <Checkbox
          id="currentWorkCheckbox"
          onChange={onChangeCurrentWorkCheckbox}
          checked={isCurrentWork}
          label="I am currently working on this"
          className="mb-4"
        />

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
            testId="sideProjectsSaveButton"
          >
            {isSubmitting && <>Saving Recap...</>}
            {!isSubmitting && <>Save Recap</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SideProjectsForm;
