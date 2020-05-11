import Joi from "@hapi/joi";

// TODO: replace with yup for validation

export const MAX_BULLETPOINT_LENGTH = 1000;
export const MAX_BULLETPOINTS = 20;
export const MAX_GENERAL_LENGTH = 254;
export const MAX_URL_LENGTH = 2048;

const RecapWorkExperienceSchema = Joi.object({
  title: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  location: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  company: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  employmentType: Joi.string()
    .valid(
      "Part-Time",
      "Full-Time",
      "Self-Employed",
      "Freelance",
      "Contract",
      "Internship",
      "Apprenticeship",
      "Volunteer",
    )
    .required(),
});

const RecapEducationSchema = Joi.object({
  school: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  location: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  degree: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  fieldOfStudy: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  grade: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
});

const RecapAccomplishmentsSchema = Joi.object({
  title: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  type: Joi.string()
    .valid("Personal", "Service", "Featured", "School", "Career", "Other")
    .required(),
});

const RecapPublicationsSchema = Joi.object({
  title: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  type: Joi.string()
    .valid("Book", "Journal", "Newspaper", "Magazine", "Blog", "Other")
    .required(),
  coauthors: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  publisher: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  url: Joi.string()
    .allow("")
    .max(MAX_URL_LENGTH),
});

const RecapSkillsSchema = Joi.object({
  title: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  proficiency: Joi.string()
    .valid("Novice", "Intermediate", "Advanced", "Expert")
    .required(),
});

const RecapSideProjectsSchema = Joi.object({
  title: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  creators: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
});

const RecapOrganizationsSchema = Joi.object({
  organizationName: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  location: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  positions: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
});

const RecapReferencesSchema = Joi.object({
  company: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  title: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  phoneNumber: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
  email: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
});

const RecapOtherSchema = Joi.object({
  title: Joi.string()
    .max(MAX_GENERAL_LENGTH)
    .required(),
});

export const RecapSchema = Joi.object({
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  bulletPoints: Joi.array()
    .items(Joi.string().max(MAX_BULLETPOINT_LENGTH))
    .max(MAX_BULLETPOINTS)
    .required(),
  kind: Joi.string()
    .valid(
      "Work Experience",
      "Education",
      "Accomplishments",
      "Publications",
      "Skills",
      "Side Projects",
      "Organizations",
      "References",
      "Other",
    )
    .required(),
})
  .when(Joi.object({ kind: "Work Experience" }).unknown(), {
    then: RecapWorkExperienceSchema,
  })
  .when(Joi.object({ kind: "Education" }).unknown(), {
    then: RecapEducationSchema,
  })
  .when(Joi.object({ kind: "Accomplishments" }).unknown(), {
    then: RecapAccomplishmentsSchema,
  })
  .when(Joi.object({ kind: "Publications" }).unknown(), {
    then: RecapPublicationsSchema,
  })
  .when(Joi.object({ kind: "Skills" }).unknown(), {
    then: RecapSkillsSchema,
  })
  .when(Joi.object({ kind: "Side Projects" }).unknown(), {
    then: RecapSideProjectsSchema,
  })
  .when(Joi.object({ kind: "Organizations" }).unknown(), {
    then: RecapOrganizationsSchema,
  })
  .when(Joi.object({ kind: "References" }).unknown(), {
    then: RecapReferencesSchema,
  })
  .when(Joi.object({ kind: "Other" }).unknown(), {
    then: RecapOtherSchema,
  });
