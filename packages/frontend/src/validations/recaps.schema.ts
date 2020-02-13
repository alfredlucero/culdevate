import * as yup from "yup";
import { formRequiredError, formMaxLengthError, formMinLengthError } from "./formErrorMessages";

export const MAX_BULLETPOINT_LENGTH = 1000;
export const MAX_BULLETPOINTS = 20;
export const MAX_GENERAL_LENGTH = 254;
export const MAX_URL_LENGTH = 2048;

enum RecapFields {
  startDate = "Start Date",
  endDate = "End Date",
  bulletPoint = "Bullet Point",
  bulletPoints = "Bullet Points",
  kind = "Kind",

  workTitle = "Title/Role",
  workLocation = "Location",
  workCompany = "Company",
  workEmploymentType = "Employment Type",

  educationSchool = "School",
  educationLocation = "Location",
  educationDegree = "Degree",
  educationFieldOfStudy = "Field of Study/Major",
  educationGrade = "Grade",

  accomplishmentsTitle = "Title",
  accomplishmentsType = "Type",

  publicationsTitle = "Title",
  publicationsType = "Type",
  publicationsCoauthors = "Coauthors",
  publicationsPublisher = "Publisher",
  publicationsUrl = "Publication URL",

  skillsTitle = "Title",
  skillsProficiency = "Proficiency",

  sideProjectsTitle = "Title",
  sideProjectsCreators = "Creators",

  organizationsName = "Organization Name",
  organizationsLocation = "Location",
  organizationsPositions = "Positions Held",

  referencesCompany = "Company",
  referencesTitle = "Reference Name/Title",
  referencesPhoneNumber = "Phone Number",
  referencesEmail = "Email",

  otherTitle = "Title",
}

export const recapBaseErrors = {
  startDateInvalid: `${RecapFields.startDate} must be a valid date.`,
  endDateInvalid: `${RecapFields.endDate} must be a valid date.`,
  bulletPointMaxLength: formMaxLengthError({ field: RecapFields.bulletPoint, maxLength: MAX_BULLETPOINT_LENGTH }),
  bulletPointsMax: `There must be at most ${MAX_BULLETPOINTS} ${RecapFields.bulletPoints}.`,
  bulletPointsRequired: formRequiredError({ field: RecapFields.bulletPoints }),
  kindInvalid: "Kind must be a valid type.",
  kindRequired: formRequiredError({ field: RecapFields.kind }),
};

export const RecapBaseSchema = yup.object({
  startDate: yup.date().notRequired(),
  endDate: yup.date().notRequired(),
  bulletPoints: yup
    .array()
    .of(yup.string().max(MAX_BULLETPOINT_LENGTH, recapBaseErrors.bulletPointMaxLength))
    .max(MAX_BULLETPOINTS, recapBaseErrors.bulletPointsMax)
    .required(recapBaseErrors.bulletPointsRequired),
  kind: yup
    .string()
    .oneOf(
      [
        "WorkExperience",
        "Education",
        "Accomplishments",
        "Publications",
        "Skills",
        "SideProjects",
        "Organizations",
        "References",
        "Other",
      ],
      recapBaseErrors.kindInvalid,
    )
    .required(recapBaseErrors.kindRequired),
});

export const recapWorkExperienceErrors = {
  ...recapBaseErrors,
  titleMaxLength: formMaxLengthError({ field: RecapFields.workTitle, maxLength: MAX_GENERAL_LENGTH }),
  titleRequired: formRequiredError({ field: RecapFields.workTitle }),
  locationMaxLength: formMaxLengthError({ field: RecapFields.workLocation, maxLength: MAX_GENERAL_LENGTH }),
  locationRequired: formRequiredError({ field: RecapFields.workLocation }),
  companyMaxLength: formMaxLengthError({ field: RecapFields.workCompany, maxLength: MAX_GENERAL_LENGTH }),
  companyRequired: formRequiredError({ field: RecapFields.workCompany }),
  employmentTypeInvalid: `${RecapFields.workEmploymentType} must be a valid type.`,
  employmentTypeRequired: formRequiredError({ field: RecapFields.workEmploymentType }),
};

const RecapWorkExperienceSchema = yup.object({
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapWorkExperienceErrors.titleMaxLength)
    .required(recapWorkExperienceErrors.titleRequired),
  location: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapWorkExperienceErrors.locationMaxLength)
    .required(recapWorkExperienceErrors.locationRequired),
  company: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapWorkExperienceErrors.companyMaxLength)
    .required(recapWorkExperienceErrors.companyRequired),
  employmentType: yup
    .string()
    .oneOf(["Part-Time", "Full-Time"], recapWorkExperienceErrors.employmentTypeInvalid)
    .required(recapWorkExperienceErrors.employmentTypeRequired),
});

export const recapEducationErrors = {
  ...recapBaseErrors,
  schoolMaxLength: "",
  schoolRequired: "",
  locationMaxLength: "",
  locationRequired: "",
  degreeMaxLength: "",
  fieldOfStudyMaxLength: "",
  fieldOfStudyRequired: "",
  gradeMaxLength: "",
};

const RecapEducationSchema = yup.object({
  school: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  location: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  degree: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .notRequired(),
  fieldOfStudy: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  grade: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .notRequired(),
});

export const recapAccomplishmentsErrors = {
  ...recapBaseErrors,
  titleMaxLength: "",
  titleRequired: "",
  typeInvalid: "",
  typeRequired: "",
};

const RecapAccomplishmentsSchema = yup.object({
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  type: yup
    .string()
    .oneOf(["Personal", "Service", "Featured", "School", "Career"])
    .required(),
});

export const recapPublicationsErrors = {
  ...recapBaseErrors,
  titleMaxLength: "",
  titleRequired: "",
  typeInvalid: "",
  typeRequired: "",
  coauthorsMaxLength: "",
  coauthorsRequired: "",
  publisherMaxLength: "",
  publisherRequired: "",
  urlMaxLength: "",
  urlInvalid: "",
};

const RecapPublicationsSchema = yup.object({
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  type: yup
    .string()
    .oneOf(["Book", "Journal", "Newspaper", "Magazine", "Blog"])
    .required(),
  coauthors: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  publisher: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  url: yup
    .string()
    .max(MAX_URL_LENGTH)
    .url()
    .notRequired(),
});

export const recapSkillsErrors = {
  ...recapBaseErrors,
  titleMaxLength: "",
  titleRequired: "",
  proficiencyInvalid: "",
  proficiencyRequired: "",
};

const RecapSkillsSchema = yup.object({
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  proficiency: yup
    .string()
    .oneOf(["Novice", "Intermediate", "Advanced", "Expert"])
    .required(),
});

export const recapSideProjectsErrors = {
  ...recapBaseErrors,
  titleMaxLength: "",
  titleRequired: "",
  creatorsMaxLength: "",
  creatorsRequired: "",
};

const RecapSideProjectsSchema = yup.object({
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  creators: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
});

export const recapOrganizationsErrors = {
  ...recapBaseErrors,
  nameMaxLength: "",
  nameRequired: "",
  locationMaxLength: "",
  locationRequired: "",
  positionsMaxLength: "",
  positionsRequired: "",
};

const RecapOrganizationsSchema = yup.object({
  organizationName: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  location: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  positions: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
});

export const recapReferencesErrors = {
  ...recapBaseErrors,
  companyMaxLength: "",
  companyRequired: "",
  titleMaxLength: "",
  titleRequired: "",
  phoneNumberMaxLength: "",
  emailMaxLength: "",
  emailInvalid: "",
};

const RecapReferencesSchema = yup.object({
  company: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  phoneNumber: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .notRequired(),
  email: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .notRequired()
    .email(),
});

export const recapOtherErrors = {
  ...recapBaseErrors,
  titleMaxLength: "",
  titleRequired: "",
};

const RecapOtherSchema = yup.object({
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
});

export const RecapSchema = yup
  .object({
    startDate: yup.date().notRequired(),
    endDate: yup.date().notRequired(),
    bulletPoints: yup
      .array()
      .of(yup.string().max(MAX_BULLETPOINT_LENGTH))
      .max(MAX_BULLETPOINTS)
      .required(),
    kind: yup
      .string()
      .oneOf([
        "WorkExperience",
        "Education",
        "Accomplishments",
        "Publications",
        "Skills",
        "SideProjects",
        "Organizations",
        "References",
        "Other",
      ])
      .required(),
  })
  .when("kind", { is: "WorkExperience", then: RecapWorkExperienceSchema })
  .when("kind", { is: "Education", then: RecapEducationSchema })
  .when("kind", { is: "Accomplishments", then: RecapAccomplishmentsSchema })
  .when("kind", { is: "Publications", then: RecapPublicationsSchema })
  .when("kind", { is: "Skills", then: RecapSkillsSchema })
  .when("kind", { is: "SideProjects", then: RecapSideProjectsSchema })
  .when("kind", { is: "Organizations", then: RecapOrganizationsSchema })
  .when("kind", { is: "References", then: RecapReferencesSchema })
  .when("kind", { is: "Other", then: RecapOtherSchema });
