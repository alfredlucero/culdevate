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
import { RecapEducation, RecapCreate, RecapKind } from "../../../recaps.interface";
import { useBulletPointInputList } from "../../../hooks/useBulletPointInputList";
import { createRecap, updateRecap } from "../../../recaps.service";
import { RecapEducationSchema, recapBaseErrors, RecapFields } from "../../../recaps.schema";

export interface EducationFormProps extends CommonProps {
  initialRecap: RecapEducation | null;
  onSaveSuccess: (savedRecap: RecapEducation) => void;
  isShowing: boolean;
  onHide: () => void;
}

const EducationForm: React.FC<EducationFormProps> = ({
  initialRecap,
  onSaveSuccess,
  isShowing,
  onHide,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  const [school, setSchool] = useState("");
  const [schoolError, setSchoolError] = useState("");
  const onChangeSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchool(e.currentTarget.value);
  };
  const onBlurSchool = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentSchool = e.currentTarget.value;
    try {
      reach(RecapEducationSchema, "school").validateSync(currentSchool);
      setSchoolError("");
    } catch (err) {
      setSchoolError(err.message);
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
      reach(RecapEducationSchema, "location").validateSync(currentLocation);
      setLocationError("");
    } catch (err) {
      setLocationError(err.message);
    }
  };

  const [degree, setDegree] = useState("");
  const [degreeError, setDegreeError] = useState("");
  const onChangeDegree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDegree(e.currentTarget.value);
  };
  const onBlurDegree = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentDegree = e.currentTarget.value;
    try {
      reach(RecapEducationSchema, "degree").validateSync(currentDegree);
      setDegreeError("");
    } catch (err) {
      setDegreeError(err.message);
    }
  };

  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [fieldOfStudyError, setFieldOfStudyError] = useState("");
  const onChangeFieldOfStudy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldOfStudy(e.currentTarget.value);
  };
  const onBlurFieldOfStudy = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentFieldOfStudy = e.currentTarget.value;
    try {
      reach(RecapEducationSchema, "fieldOfStudy").validateSync(currentFieldOfStudy);
      setFieldOfStudyError("");
    } catch (err) {
      setFieldOfStudyError(err.message);
    }
  };

  const [grade, setGrade] = useState("");
  const [gradeError, setGradeError] = useState("");
  const onChangeGrade = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(e.currentTarget.value);
  };
  const onBlurGrade = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentGrade = e.currentTarget.value;
    try {
      reach(RecapEducationSchema, "grade").validateSync(currentGrade);
      setGradeError("");
    } catch (err) {
      setGradeError(err.message);
    }
  };

  const [isCurrentEducation, setIsCurrentEducation] = useState(false);
  const onChangeCurrentEducationCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    setIsCurrentEducation(checked);
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
    if (isCurrentEducation) {
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
    if (isCurrentEducation) {
      setEndDate(null);
      setEndDateError("");

      if (startDateError === recapBaseErrors.dateRangeInvalid) {
        setStartDateError("");
      }
    }
  }, [isCurrentEducation]);

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
    idPrefix: "educationBulletPoint",
  });

  const clearOutInputs = () => {
    setSchool("");
    setSchoolError("");
    setLocation("");
    setLocationError("");
    setDegree("");
    setDegreeError("");
    setFieldOfStudy("");
    setFieldOfStudyError("");
    setGrade("");
    setGradeError("");
    setIsCurrentEducation(false);
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
      setSchool(initialRecap.school);
      setSchoolError("");
      setLocation(initialRecap.location);
      setLocationError("");
      setDegree(initialRecap.degree);
      setDegreeError("");
      setFieldOfStudy(initialRecap.fieldOfStudy);
      setFieldOfStudyError("");
      setGrade(initialRecap.grade);
      setGradeError("");
      setStartDate(new Date(initialRecap.startDate));
      setStartDateError("");
      if (initialRecap.endDate) {
        setEndDate(new Date(initialRecap.endDate));
      } else {
        setIsCurrentEducation(true);
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
    const updatedEducationRecap: RecapEducation = {
      _id,
      userId,
      kind,
      bulletPoints: updatedBulletPoints,
      school,
      location,
      degree,
      fieldOfStudy,
      grade,
      startDate: (startDate as Date).toISOString(),
      ...(isCurrentEducation ? { endDate: undefined } : { endDate: (endDate as Date).toISOString() }),
    };

    setIsSubmitting(true);
    updateRecap(updatedEducationRecap)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitUpdateError(false);
        onSaveSuccess(savedRecap as RecapEducation);
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
      kind: RecapKind.Education,
      bulletPoints: updatedBulletPoints,
      school,
      location,
      degree,
      fieldOfStudy,
      grade,
      startDate: (startDate as Date).toISOString(),
      ...(isCurrentEducation ? { endDate: undefined } : { endDate: (endDate as Date).toISOString() }),
    };

    setIsSubmitting(true);
    createRecap(recapToCreate)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitCreateError(false);
        onSaveSuccess(savedRecap as RecapEducation);
        onHide();
      })
      .catch(() => {
        setIsSubmitting(false);
        setIsSubmitCreateError(true);
      });
  };

  const hasValidInputs =
    school &&
    !schoolError &&
    location &&
    !locationError &&
    degree &&
    !degreeError &&
    fieldOfStudy &&
    !fieldOfStudyError &&
    grade &&
    !gradeError &&
    startDate &&
    !startDateError &&
    (isCurrentEducation || (!isCurrentEducation && endDate && !endDateError)) &&
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
        kind={RecapKind.Education}
        isShowing={isSubmitCreateError}
        onHide={onHideSubmitCreateError}
        className="mb-4"
      />
      <RecapsUpdateErrorAlert
        kind={RecapKind.Education}
        isShowing={isSubmitUpdateError}
        onHide={onHideSubmitUpdateError}
        className="mb-4"
      />
      <form onSubmit={onSubmit}>
        <div className="flex w-full mb-4">
          <TextInput
            id="school"
            placeholder="What school did you go to?"
            value={school}
            onChange={onChangeSchool}
            onBlur={onBlurSchool}
            type="text"
            required={true}
            label={RecapFields.educationSchool}
            valid={!schoolError}
            errorInfo={schoolError}
            className="w-1/2 mr-4"
          />
          <TextInput
            id="location"
            placeholder="Where was the school located?"
            value={location}
            onChange={onChangeLocation}
            onBlur={onBlurLocation}
            type="text"
            required={true}
            label={RecapFields.educationLocation}
            valid={!locationError}
            errorInfo={locationError}
            className="w-1/2 mr-4"
          />
        </div>

        <div className="flex w-full mb-4">
          <TextInput
            id="degree"
            placeholder="What degree/certification did you work toward?"
            value={degree}
            onChange={onChangeDegree}
            onBlur={onBlurDegree}
            type="text"
            required={true}
            label={RecapFields.educationDegree}
            valid={!degreeError}
            errorInfo={degreeError}
            className="w-1/2 mr-4"
          />
          <TextInput
            id="fieldOfStudy"
            placeholder="What major or study did you focus on?"
            value={fieldOfStudy}
            onChange={onChangeFieldOfStudy}
            onBlur={onBlurFieldOfStudy}
            type="text"
            required={true}
            label={RecapFields.educationFieldOfStudy}
            valid={!fieldOfStudyError}
            errorInfo={fieldOfStudyError}
            className="w-1/2"
          />
        </div>

        <div className="flex w-full mb-4">
          <TextInput
            id="grade"
            placeholder="What year or grade are you in this school? i.e. Alumnus, Fourth Year"
            value={grade}
            onChange={onChangeGrade}
            onBlur={onBlurGrade}
            type="text"
            required={true}
            label={RecapFields.educationGrade}
            valid={!gradeError}
            errorInfo={gradeError}
            className="w-1/2 mr-4"
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
            placeholder="When did you start studying here?"
            dateFormat="MM/yyyy"
            showMonthYearPicker={true}
          />
          {!isCurrentEducation && (
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={onChangeEndDate}
              onBlur={onBlurEndDate}
              label={RecapFields.endDate}
              required={true}
              valid={!endDateError}
              errorInfo={endDateError}
              placeholder="When did you finish studying here?"
              dateFormat="MM/yyyy"
              showMonthYearPicker={true}
              className="w-1/2"
            />
          )}
        </div>

        <Checkbox
          id="currentEducationCheckbox"
          onChange={onChangeCurrentEducationCheckbox}
          checked={isCurrentEducation}
          label="I currently study here"
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
            testId="educationSaveButton"
          >
            {isSubmitting && <>Saving Recap...</>}
            {!isSubmitting && <>Save Recap</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;
