import React from "react";
import cn from "classnames";
import TextInput from "../../../../../components/TextInput";
import Select, { SelectOption } from "../../../../../components/Select";
import Checkbox from "../../../../../components/Checkbox";
import DatePicker from "../../../../../components/DatePicker";
import BulletPointInputList from "../../BulletPointInputList";
import Button from "../../../../../components/Button";
import { CommonProps } from "../../../../../components/commonProps";
import { RecapWorkExperience, EmploymentType } from "../../../recaps.interface";

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

// eslint-disable-next-line
interface WorkExperienceFormProps extends CommonProps {}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  return (
    <div className={cn(className)} {...(testId !== "" ? { "data-testid": testId } : {})} {...passThroughProps}>
      <form onSubmit={() => {}}>
        <TextInput
          id="workTitle"
          placeholder="What was your work title?"
          value=""
          onChange={() => {}}
          type="text"
          required={true}
          label="Work Title"
        />
        <Select
          id="employmentType"
          value="Full-Time"
          options={employmentTypeSelectOptions}
          onChange={() => {}}
          label="Employment Type"
          required={true}
        />
        <TextInput
          id="company"
          placeholder="What is your company name?"
          value=""
          onChange={() => {}}
          type="text"
          required={true}
          label="Company"
        />
        <TextInput
          id="location"
          placeholder="Where was your work place located?"
          value=""
          onChange={() => {}}
          type="text"
          required={true}
          label="Location"
        />
        <Checkbox id="currentWorkStatus" onChange={() => {}} checked={false} label="I currently work here" />
        <DatePicker id="startDate" selected={null} onChange={() => {}} label="Start Date" required={true} />
        <DatePicker id="endDate" selected={null} onChange={() => {}} label="End Date" required={true} />
        <BulletPointInputList
          bulletPointInputList={[
            {
              value: "",
              id: "bulletpoint-0",
              errorInfo: "",
              valid: true,
            },
          ]}
          onDragEnd={() => {}}
          onChangeBulletPointInput={() => {}}
          onBlurBulletPointInput={() => {}}
          onDeleteBulletPointInput={() => {}}
          onAddBulletPointInput={() => {}}
          isAddBulletPointInputDisabled={false}
        />
        <Button type="submit" variant="primary">
          Save
        </Button>
      </form>
    </div>
  );
};

export default WorkExperienceForm;
