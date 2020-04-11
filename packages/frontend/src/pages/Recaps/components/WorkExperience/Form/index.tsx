import React, { useEffect, useState } from "react";
import cn from "classnames";
import { reach } from "yup";
import { isBefore, isEqual } from "date-fns";
import TextInput from "../../../../../components/TextInput";
import Select, { SelectOption } from "../../../../../components/Select";
import Checkbox from "../../../../../components/Checkbox";
import DatePicker from "../../../../../components/DatePicker";
import BulletPointInputList from "../../BulletPointInputList";
import Button from "../../../../../components/Button";
import { CommonProps } from "../../../../../components/commonProps";
import { RecapWorkExperience, EmploymentType } from "../../../recaps.interface";
import { useBulletPointInputList } from "../../../hooks/useBulletPointInputList";
import { createRecap, updateRecap } from "../../../recaps.service";
import { RecapWorkExperienceSchema, recapBaseErrors } from "../../../recaps.schema";

const employmentTypes: EmploymentType[] = [
  "Part-Time",
  "Full-Time",
  "Self-Employed",
  "Freelance",
  "Contract",
  "Internship",
  "Apprenticeship",
  "Volunteer",
];
const employmentTypeSelectOptions: SelectOption[] = employmentTypes.map(employmentType => ({
  label: employmentType,
  value: employmentType,
}));

interface WorkExperienceFormProps extends CommonProps {
  initialRecap: RecapWorkExperience | null;
  onSaveSuccess: (savedRecap: RecapWorkExperience) => void;
  isShowing: boolean;
  onHide: () => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  initialRecap,
  onSaveSuccess,
  isShowing,
  onHide,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  const [workTitle, setWorkTitle] = useState("");
  const [workTitleError, setWorkTitleError] = useState("");
  const onChangeWorkTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkTitle(e.currentTarget.value);
  };
  const onBlurWorkTitle = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentWorkTitle = e.currentTarget.value;
    try {
      reach(RecapWorkExperienceSchema, "title").validateSync(currentWorkTitle);
      setWorkTitleError("");
    } catch (err) {
      setWorkTitleError(err.message);
    }
  };

  const [employmentType, setEmploymentType] = useState("Full-Time");
  const onChangeEmploymentType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmploymentType(e.currentTarget.value);
  };

  const [company, setCompany] = useState("");
  const [companyError, setCompanyError] = useState("");
  const onChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(e.currentTarget.value);
  };
  const onBlurCompany = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentCompany = e.currentTarget.value;
    try {
      reach(RecapWorkExperienceSchema, "company").validateSync(currentCompany);
      setCompanyError("");
    } catch (err) {
      setCompanyError(err.message);
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
      reach(RecapWorkExperienceSchema, "location").validateSync(currentLocation);
      setLocationError("");
    } catch (err) {
      setLocationError(err.message);
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
    idPrefix: "workExperienceBulletPoint",
  });

  const clearOutInputs = () => {
    setWorkTitle("");
    setWorkTitleError("");
    setEmploymentType("Full-Time");
    setCompany("");
    setCompanyError("");
    setLocation("");
    setLocationError("");
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
      setWorkTitle(initialRecap.title);
      setWorkTitleError("");
      setEmploymentType(initialRecap.employmentType);
      setCompany(initialRecap.company);
      setCompanyError("");
      setLocation(initialRecap.location);
      setLocationError("");
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
  const [isSubmitError, setIsSubmitError] = useState(false);

  const triggerUpdateRecap = () => {
    // updateRecap();
  };

  const triggerCreateRecap = () => {
    // createRecap();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEditingRecap = initialRecap !== undefined;
    if (isEditingRecap) {
      triggerUpdateRecap();
    } else {
      triggerCreateRecap();
    }
  };

  return (
    <div className={cn("mt-4", className)} {...(testId !== "" ? { "data-testid": testId } : {})} {...passThroughProps}>
      <form onSubmit={onSubmit}>
        <div className="flex w-full mb-4">
          <TextInput
            id="workTitle"
            placeholder="What was your work title?"
            value={workTitle}
            onChange={onChangeWorkTitle}
            onBlur={onBlurWorkTitle}
            type="text"
            required={true}
            label="Work Title"
            valid={!workTitleError}
            errorInfo={workTitleError}
            className="w-1/2 mr-4"
          />
          <Select
            id="employmentType"
            value={employmentType}
            options={employmentTypeSelectOptions}
            onChange={onChangeEmploymentType}
            label="Employment Type"
            required={true}
            className="w-1/2"
          />
        </div>

        <div className="flex w-full mb-4">
          <TextInput
            id="company"
            placeholder="What was the company's name?"
            value={company}
            onChange={onChangeCompany}
            onBlur={onBlurCompany}
            type="text"
            required={true}
            label="Company"
            valid={!companyError}
            errorInfo={companyError}
            className="w-1/2 mr-4"
          />
          <TextInput
            id="location"
            placeholder="Where was your work place located?"
            value={location}
            onChange={onChangeLocation}
            onBlur={onBlurLocation}
            type="text"
            required={true}
            label="Location"
            valid={!locationError}
            errorInfo={locationError}
            className="w-1/2"
          />
        </div>

        <div className="flex w-full mb-4">
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={onChangeStartDate}
            onBlur={onBlurStartDate}
            label="Start Date"
            required={true}
            valid={!startDateError}
            errorInfo={startDateError}
            className="mr-4 w-1/2"
            placeholder="When did you start working here?"
            dateFormat="MM/yyyy"
            showMonthYearPicker={true}
          />
          {!isCurrentWork && (
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={onChangeEndDate}
              onBlur={onBlurEndDate}
              label="End Date"
              required={true}
              valid={!endDateError}
              errorInfo={endDateError}
              placeholder="When did you finish working here?"
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
          label="I currently work here"
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
          <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
            {isSubmitting && <>Saving Recap...</>}
            {!isSubmitting && <>Save Recap</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkExperienceForm;
