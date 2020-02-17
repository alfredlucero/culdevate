import * as yup from "yup";
import { formRequiredError, formMaxLengthError } from "./formErrorMessages";

export const MAX_BULLETPOINT_LENGTH = 1000;
export const MAX_BULLETPOINTS = 20;
export const MAX_GENERAL_LENGTH = 254;
export const MAX_URL_LENGTH = 2048;

export enum RecapFields {
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
        "Work Experience",
        "Education",
        "Accomplishments",
        "Publications",
        "Skills",
        "Side Projects",
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
  employmentTypeInvalid: `${RecapFields.workEmploymentType} is invalid.`,
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
    .oneOf(
      ["Part-Time", "Full-Time", "Self-Employed", "Freelance", "Contract", "Internship", "Apprenticeship", "Volunteer"],
      recapWorkExperienceErrors.employmentTypeInvalid,
    )
    .required(recapWorkExperienceErrors.employmentTypeRequired),
});

export const recapEducationErrors = {
  ...recapBaseErrors,
  schoolMaxLength: formMaxLengthError({ field: RecapFields.educationSchool, maxLength: MAX_GENERAL_LENGTH }),
  schoolRequired: formRequiredError({ field: RecapFields.educationSchool }),
  locationMaxLength: formMaxLengthError({ field: RecapFields.educationLocation, maxLength: MAX_GENERAL_LENGTH }),
  locationRequired: formRequiredError({ field: RecapFields.educationLocation }),
  degreeMaxLength: formMaxLengthError({ field: RecapFields.educationDegree, maxLength: MAX_GENERAL_LENGTH }),
  fieldOfStudyMaxLength: formMaxLengthError({
    field: RecapFields.educationFieldOfStudy,
    maxLength: MAX_GENERAL_LENGTH,
  }),
  fieldOfStudyRequired: formRequiredError({ field: RecapFields.educationFieldOfStudy }),
  gradeMaxLength: formMaxLengthError({ field: RecapFields.educationGrade, maxLength: MAX_GENERAL_LENGTH }),
};

const RecapEducationSchema = yup.object({
  school: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapEducationErrors.schoolMaxLength)
    .required(recapEducationErrors.schoolRequired),
  location: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapEducationErrors.locationMaxLength)
    .required(recapEducationErrors.locationRequired),
  degree: yup.string().max(MAX_GENERAL_LENGTH, recapEducationErrors.degreeMaxLength),
  fieldOfStudy: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapEducationErrors.fieldOfStudyMaxLength)
    .required(recapEducationErrors.fieldOfStudyRequired),
  grade: yup.string().max(MAX_GENERAL_LENGTH, recapEducationErrors.gradeMaxLength),
});

export const recapAccomplishmentsErrors = {
  ...recapBaseErrors,
  titleMaxLength: formMaxLengthError({ field: RecapFields.accomplishmentsTitle, maxLength: MAX_GENERAL_LENGTH }),
  titleRequired: formRequiredError({ field: RecapFields.accomplishmentsTitle }),
  typeInvalid: `${RecapFields.accomplishmentsType} is invalid.`,
  typeRequired: formRequiredError({ field: RecapFields.accomplishmentsType }),
};

const RecapAccomplishmentsSchema = yup.object({
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapAccomplishmentsErrors.titleMaxLength)
    .required(recapAccomplishmentsErrors.titleRequired),
  type: yup
    .string()
    .oneOf(["Personal", "Service", "Featured", "School", "Career", "Other"], recapAccomplishmentsErrors.typeInvalid)
    .required(recapAccomplishmentsErrors.typeRequired),
});

export const recapPublicationsErrors = {
  ...recapBaseErrors,
  titleMaxLength: formMaxLengthError({ field: RecapFields.publicationsTitle, maxLength: MAX_GENERAL_LENGTH }),
  titleRequired: formRequiredError({ field: RecapFields.publicationsTitle }),
  typeInvalid: `${RecapFields.publicationsType} is invalid.`,
  typeRequired: formRequiredError({ field: RecapFields.publicationsType }),
  coauthorsMaxLength: formMaxLengthError({ field: RecapFields.publicationsCoauthors, maxLength: MAX_GENERAL_LENGTH }),
  coauthorsRequired: formRequiredError({ field: RecapFields.publicationsCoauthors }),
  publisherMaxLength: formMaxLengthError({ field: RecapFields.publicationsPublisher, maxLength: MAX_GENERAL_LENGTH }),
  publisherRequired: formRequiredError({ field: RecapFields.publicationsPublisher }),
  urlMaxLength: formMaxLengthError({ field: RecapFields.publicationsUrl, maxLength: MAX_URL_LENGTH }),
  urlInvalid: `${RecapFields.publicationsUrl} must have valid syntax.`,
};

const RecapPublicationsSchema = yup.object({
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapPublicationsErrors.titleMaxLength)
    .required(recapPublicationsErrors.titleRequired),
  type: yup
    .string()
    .oneOf(["Book", "Journal", "Newspaper", "Magazine", "Blog", "Other"], recapPublicationsErrors.typeInvalid)
    .required(recapPublicationsErrors.typeRequired),
  coauthors: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapPublicationsErrors.coauthorsMaxLength)
    .required(recapPublicationsErrors.coauthorsRequired),
  publisher: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapPublicationsErrors.publisherMaxLength)
    .required(recapPublicationsErrors.publisherRequired),
  url: yup
    .string()
    .max(MAX_URL_LENGTH, recapPublicationsErrors.urlMaxLength)
    .url(recapPublicationsErrors.urlInvalid),
});

export const recapSkillsErrors = {
  ...recapBaseErrors,
  titleMaxLength: formMaxLengthError({ field: RecapFields.skillsTitle, maxLength: MAX_GENERAL_LENGTH }),
  titleRequired: formRequiredError({ field: RecapFields.skillsTitle }),
  proficiencyInvalid: `${RecapFields.skillsProficiency} is invalid.`,
  proficiencyRequired: formRequiredError({ field: RecapFields.skillsProficiency }),
};

const RecapSkillsSchema = yup.object({
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapSkillsErrors.titleMaxLength)
    .required(recapSkillsErrors.titleRequired),
  proficiency: yup
    .string()
    .oneOf(["Novice", "Intermediate", "Advanced", "Expert"], recapSkillsErrors.proficiencyInvalid)
    .required(recapSkillsErrors.proficiencyRequired),
});

export const recapSideProjectsErrors = {
  ...recapBaseErrors,
  titleMaxLength: formMaxLengthError({ field: RecapFields.sideProjectsTitle, maxLength: MAX_GENERAL_LENGTH }),
  titleRequired: formRequiredError({ field: RecapFields.sideProjectsTitle }),
  creatorsMaxLength: formMaxLengthError({ field: RecapFields.sideProjectsCreators, maxLength: MAX_GENERAL_LENGTH }),
  creatorsRequired: formRequiredError({ field: RecapFields.sideProjectsCreators }),
};

const RecapSideProjectsSchema = yup.object({
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapSideProjectsErrors.titleMaxLength)
    .required(recapSideProjectsErrors.titleRequired),
  creators: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapSideProjectsErrors.creatorsMaxLength)
    .required(recapSideProjectsErrors.creatorsRequired),
});

export const recapOrganizationsErrors = {
  ...recapBaseErrors,
  nameMaxLength: formMaxLengthError({ field: RecapFields.organizationsName, maxLength: MAX_GENERAL_LENGTH }),
  nameRequired: formRequiredError({ field: RecapFields.organizationsName }),
  locationMaxLength: formMaxLengthError({ field: RecapFields.organizationsLocation, maxLength: MAX_GENERAL_LENGTH }),
  locationRequired: formRequiredError({ field: RecapFields.organizationsLocation }),
  positionsMaxLength: formMaxLengthError({ field: RecapFields.organizationsPositions, maxLength: MAX_GENERAL_LENGTH }),
  positionsRequired: formRequiredError({ field: RecapFields.organizationsPositions }),
};

const RecapOrganizationsSchema = yup.object({
  organizationName: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapOrganizationsErrors.nameMaxLength)
    .required(recapOrganizationsErrors.nameRequired),
  location: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapOrganizationsErrors.locationMaxLength)
    .required(recapOrganizationsErrors.locationRequired),
  positions: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapOrganizationsErrors.positionsMaxLength)
    .required(recapOrganizationsErrors.positionsRequired),
});

export const recapReferencesErrors = {
  ...recapBaseErrors,
  companyMaxLength: formMaxLengthError({ field: RecapFields.referencesCompany, maxLength: MAX_GENERAL_LENGTH }),
  companyRequired: formRequiredError({ field: RecapFields.referencesCompany }),
  titleMaxLength: formMaxLengthError({ field: RecapFields.referencesTitle, maxLength: MAX_GENERAL_LENGTH }),
  titleRequired: formRequiredError({ field: RecapFields.referencesTitle }),
  phoneNumberMaxLength: formMaxLengthError({ field: RecapFields.referencesPhoneNumber, maxLength: MAX_GENERAL_LENGTH }),
  emailMaxLength: formMaxLengthError({ field: RecapFields.referencesEmail, maxLength: MAX_GENERAL_LENGTH }),
  emailInvalid: `${RecapFields.referencesEmail} must have a valid syntax.`,
};

const RecapReferencesSchema = yup.object({
  company: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapReferencesErrors.companyMaxLength)
    .required(recapReferencesErrors.companyRequired),
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapReferencesErrors.titleMaxLength)
    .required(recapReferencesErrors.titleRequired),
  phoneNumber: yup.string().max(MAX_GENERAL_LENGTH, recapReferencesErrors.phoneNumberMaxLength),
  email: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapReferencesErrors.emailMaxLength)
    .email(recapReferencesErrors.emailMaxLength),
});

export const recapOtherErrors = {
  ...recapBaseErrors,
  titleMaxLength: formMaxLengthError({ field: RecapFields.otherTitle, maxLength: MAX_GENERAL_LENGTH }),
  titleRequired: formRequiredError({ field: RecapFields.otherTitle }),
};

const RecapOtherSchema = yup.object({
  title: yup
    .string()
    .max(MAX_GENERAL_LENGTH, recapOtherErrors.titleMaxLength)
    .required(recapOtherErrors.titleRequired),
});

export const RecapSchema = RecapBaseSchema.when("kind", { is: "Work Experience", then: RecapWorkExperienceSchema })
  .when("kind", { is: "Education", then: RecapEducationSchema })
  .when("kind", { is: "Accomplishments", then: RecapAccomplishmentsSchema })
  .when("kind", { is: "Publications", then: RecapPublicationsSchema })
  .when("kind", { is: "Skills", then: RecapSkillsSchema })
  .when("kind", { is: "Side Projects", then: RecapSideProjectsSchema })
  .when("kind", { is: "Organizations", then: RecapOrganizationsSchema })
  .when("kind", { is: "References", then: RecapReferencesSchema })
  .when("kind", { is: "Other", then: RecapOtherSchema });
