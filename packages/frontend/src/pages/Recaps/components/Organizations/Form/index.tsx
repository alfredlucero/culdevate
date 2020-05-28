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
import { RecapOrganizations, RecapCreate, RecapKind } from "../../../recaps.interface";
import { useBulletPointInputList } from "../../../hooks/useBulletPointInputList";
import { createRecap, updateRecap } from "../../../recaps.service";
import { RecapOrganizationsSchema, recapBaseErrors, RecapFields } from "../../../recaps.schema";

export interface OrganizationsFormProps extends CommonProps {
  initialRecap: RecapOrganizations | null;
  onSaveSuccess: (savedRecap: RecapOrganizations) => void;
  isShowing: boolean;
  onHide: () => void;
}

const OrganizationsForm: React.FC<OrganizationsFormProps> = ({
  initialRecap,
  onSaveSuccess,
  isShowing,
  onHide,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationNameError, setOrganizationNameError] = useState("");
  const onChangeOrganizationName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizationName(e.currentTarget.value);
  };
  const onBlurOrganizationName = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentOrganizationName = e.currentTarget.value;
    try {
      reach(RecapOrganizationsSchema, "organizationName").validateSync(currentOrganizationName);
      setOrganizationNameError("");
    } catch (err) {
      setOrganizationNameError(err.message);
    }
  };

  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.currentTarget.value);
  };
  const onBlurLocation = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentLocation = e.currentTarget.value;
    try {
      reach(RecapOrganizationsSchema, "location").validateSync(currentLocation);
      setLocationError("");
    } catch (err) {
      setLocationError(err.message);
    }
  };

  const [positions, setPositions] = useState("");
  const [positionsError, setPositionsError] = useState("");
  const onChangePositions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPositions(e.currentTarget.value);
  };
  const onBlurPositions = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentPositions = e.currentTarget.value;
    try {
      reach(RecapOrganizationsSchema, "positions").validateSync(currentPositions);
      setPositionsError("");
    } catch (err) {
      setPositionsError(err.message);
    }
  };

  const [isCurrentlyActive, setIsCurrentlyActive] = useState(false);
  const onChangeIsCurrentlyActiveCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    setIsCurrentlyActive(checked);
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
    if (isCurrentlyActive) {
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
    if (isCurrentlyActive) {
      setEndDate(null);
      setEndDateError("");

      if (startDateError === recapBaseErrors.dateRangeInvalid) {
        setStartDateError("");
      }
    }
  }, [isCurrentlyActive]);

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
    idPrefix: "organizationsBulletPoint",
  });

  const clearOutInputs = () => {
    setOrganizationName("");
    setOrganizationNameError("");
    setLocation("");
    setLocationError("");
    setPositions("");
    setPositionsError("");
    setIsCurrentlyActive(false);
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
      setOrganizationName(initialRecap.organizationName);
      setOrganizationNameError("");
      setLocation(initialRecap.location);
      setLocationError("");
      setPositions(initialRecap.positions);
      setPositionsError("");
      setStartDate(new Date(initialRecap.startDate));
      setStartDateError("");
      if (initialRecap.endDate) {
        setEndDate(new Date(initialRecap.endDate));
      } else {
        setIsCurrentlyActive(true);
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
    const updatedOrganizationsRecap: RecapOrganizations = {
      _id,
      userId,
      kind,
      bulletPoints: updatedBulletPoints,
      organizationName,
      location,
      positions,
      startDate: (startDate as Date).toISOString(),
      ...(isCurrentlyActive ? { endDate: undefined } : { endDate: (endDate as Date).toISOString() }),
    };

    setIsSubmitting(true);
    updateRecap(updatedOrganizationsRecap)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitUpdateError(false);
        onSaveSuccess(savedRecap as RecapOrganizations);
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
      kind: RecapKind.Organizations,
      bulletPoints: updatedBulletPoints,
      organizationName,
      location,
      positions,
      startDate: (startDate as Date).toISOString(),
      ...(isCurrentlyActive ? { endDate: undefined } : { endDate: (endDate as Date).toISOString() }),
    };

    setIsSubmitting(true);
    createRecap(recapToCreate)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitCreateError(false);
        onSaveSuccess(savedRecap as RecapOrganizations);
        onHide();
      })
      .catch(() => {
        setIsSubmitting(false);
        setIsSubmitCreateError(true);
      });
  };

  const hasValidInputs =
    organizationName &&
    !organizationNameError &&
    location &&
    !locationError &&
    positions &&
    !positionsError &&
    startDate &&
    !startDateError &&
    (isCurrentlyActive || (!isCurrentlyActive && endDate && !endDateError)) &&
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
        kind={RecapKind.Organizations}
        isShowing={isSubmitCreateError}
        onHide={onHideSubmitCreateError}
        className="mb-4"
      />
      <RecapsUpdateErrorAlert
        kind={RecapKind.Organizations}
        isShowing={isSubmitUpdateError}
        onHide={onHideSubmitUpdateError}
        className="mb-4"
      />
      <form onSubmit={onSubmit}>
        <div className="w-full mb-4">
          <TextInput
            id="organizationName"
            placeholder="What was the name of your organization?"
            value={organizationName}
            onChange={onChangeOrganizationName}
            onBlur={onBlurOrganizationName}
            type="text"
            required={true}
            label={RecapFields.organizationsName}
            valid={!organizationNameError}
            errorInfo={organizationNameError}
          />
        </div>

        <div className="w-full mb-4">
          <TextInput
            id="location"
            placeholder="Where was the organization primarily located?"
            value={location}
            onChange={onChangeLocation}
            onBlur={onBlurLocation}
            type="text"
            required={true}
            label={RecapFields.organizationsLocation}
            valid={!locationError}
            errorInfo={locationError}
          />
        </div>

        <div className="w-full mb-4">
          <TextInput
            id="positions"
            placeholder="What positions have you held? i.e. General Member, President, Social Chair"
            value={positions}
            onChange={onChangePositions}
            onBlur={onBlurPositions}
            type="text"
            required={true}
            label={RecapFields.organizationsPositions}
            valid={!positionsError}
            errorInfo={positionsError}
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
            placeholder="When did you join this organization?"
            dateFormat="MM/yyyy"
            showMonthYearPicker={true}
          />
          {!isCurrentlyActive && (
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={onChangeEndDate}
              onBlur={onBlurEndDate}
              label={RecapFields.endDate}
              required={true}
              valid={!endDateError}
              errorInfo={endDateError}
              placeholder="When were you no longer active with this organization?"
              dateFormat="MM/yyyy"
              showMonthYearPicker={true}
              className="w-1/2"
            />
          )}
        </div>

        <Checkbox
          id="currentActiveCheckbox"
          onChange={onChangeIsCurrentlyActiveCheckbox}
          checked={isCurrentlyActive}
          label="I am currently an active member"
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
            testId="organizationsSaveButton"
          >
            {isSubmitting && <>Saving Recap...</>}
            {!isSubmitting && <>Save Recap</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationsForm;
