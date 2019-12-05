import mongoose from "mongoose";
import { MAX_BULLETPOINT_LENGTH, MAX_BULLETPOINTS, MAX_GENERAL_LENGTH } from "./recaps.validation";

export interface RecapBase {
  kind: RecapKind;
  startDate?: Date;
  endDate?: Date;
  bulletPoints: string[];
}

export type RecapKind =
  | "WorkExperience"
  | "Education"
  | "Accomplishments"
  | "Skills"
  | "SideProjects"
  | "Organizations"
  | "References"
  | "Other";

const recapBaseOptions = {
  discriminatorKey: "kind",
  collection: "recaps",
};

const recapBaseSchema = new mongoose.Schema(
  {
    startDate: { type: Date },
    endDate: { type: Date },
    bulletPoints: {
      type: [
        {
          type: String,
          maxlength: MAX_BULLETPOINT_LENGTH,
        },
      ],
      required: true,
      maxlength: MAX_BULLETPOINTS,
    },
  },
  recapBaseOptions,
);

export interface RecapBaseModel extends RecapBase, mongoose.Document {}

// Base Recap model from which other Recap models will inherit from based on the
// the value of the "kind" discriminator
export const RecapBaseModel = mongoose.model<RecapBaseModel>("Recap", recapBaseSchema);

// Work Experience

export interface RecapWorkExperience {
  title: string;
  location: string;
  company: string;
  employmentType: EmploymentType;
}

export type EmploymentType = "Part-Time" | "Full-Time";

const recapWorkExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  location: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  company: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  employmentType: { type: String, required: true, enum: ["Part-Time", "Full-Time"] },
});

export interface RecapWorkExperienceModel extends RecapBaseModel, RecapWorkExperience {}

const RecapWorkExperience = RecapBaseModel.discriminator("WorkExperience", recapWorkExperienceSchema);

export const RecapWorkExperienceModel = mongoose.model<RecapWorkExperienceModel>("WorkExperience");

// Education

export interface RecapEducation {
  school: string;
  location: string;
  degree: string;
  fieldOfStudy: string;
  grade: string;
}

const recapEducationSchema = new mongoose.Schema({
  school: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  location: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  degree: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  fieldOfStudy: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  grade: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
});

export interface RecapEducationModel extends RecapBaseModel, RecapEducation {}

const RecapEducation = RecapBaseModel.discriminator("Education", recapEducationSchema);

export const RecapEducationModel = mongoose.model<RecapEducationModel>("Education");

// Accomplishments

export interface RecapAccomplishments {
  title: string;
  type: AccomplishmentsType;
}

export type AccomplishmentsType =
  | "Personal" // Mentorship, Health, Fitness, Learning, etc.
  | "Service" // Volunteer, Community Service, Philanthropy, etc.
  | "Featured" // Presentations, Conferences, TV Shows, Public Interviews, Podcasts, Radio, etc.
  | "School" // Test Score, Scholarship, Honor Roll, Clubs, Organizations, etc.
  | "Career"; // Promotion, Work Awards, etc.

const recapAccomplishmentsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: MAX_GENERAL_LENGTH,
  },
  type: {
    type: String,
    required: true,
    enum: ["Personal", "Service", "Featured", "School", "Career"],
  },
});

export interface RecapAccomplishmentsModel extends RecapBaseModel, RecapAccomplishments {}

const RecapAccomplishments = RecapBaseModel.discriminator("Accomplishments", recapAccomplishmentsSchema);

export const RecapAccomplishmentsModel = mongoose.model<RecapAccomplishmentsModel>("Accomplishments");

// Publications
// type: Book, Scholarly Journal, Blog, Online Article, Newspaper, Magazine, Self-Publication, Other

// Skills

export interface RecapSkills {
  title: string;
  proficiency: SkillsProficiency;
}

export type SkillsProficiency = "Novice" | "Intermediate" | "Advanced" | "Expert";

const recapSkillsSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  proficiency: { type: String, required: true, enum: ["Novice", "Intermediate", "Advanced", "Expert"] },
});

export interface RecapSkillsModel extends RecapBaseModel, RecapSkills {}

const RecapSkills = RecapBaseModel.discriminator("Skills", recapSkillsSchema);

export const RecapSkillsModel = mongoose.model<RecapSkillsModel>("Skills");

// Side Projects

export interface RecapSideProjects {
  title: string;
  creators: string;
}

const recapSideProjectsSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  creators: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
});

export interface RecapSideProjectsModel extends RecapBaseModel, RecapSideProjects {}

const RecapSideProjects = RecapBaseModel.discriminator("SideProjects", recapSideProjectsSchema);

export const RecapSideProjectsModel = mongoose.model<RecapSideProjectsModel>("SideProjects");

// Organizations

export interface RecapOrganizations {
  organizationName: string;
  location: string;
  positions: string;
}

const recapOrganizationsSchema = new mongoose.Schema({
  organizationName: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  location: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  positions: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
});

export interface RecapOrganizationsModel extends RecapBaseModel, RecapOrganizations {}

const RecapOrganizations = RecapBaseModel.discriminator("Organizations", recapOrganizationsSchema);

export const RecapOrganizationsModel = mongoose.model<RecapOrganizationsModel>("Organizations");

// References

export interface RecapReferences {
  company: string;
  title: string;
  phoneNumber: string;
  email: string;
}

export const recapReferencesSchema = new mongoose.Schema({
  company: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  title: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  phoneNumber: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  email: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
});

export interface RecapReferencesModel extends RecapBaseModel, RecapReferences {}

const RecapReferences = RecapBaseModel.discriminator("References", recapReferencesSchema);

export const RecapReferencesModel = mongoose.model<RecapReferencesModel>("References");

// Other

export interface RecapOther {
  title: string;
}

const recapOtherSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
});

export interface RecapOtherModel extends RecapBaseModel, RecapOther {}

const RecapOther = RecapBaseModel.discriminator("Other", recapOtherSchema);

export const RecapOtherModel = mongoose.model<RecapOtherModel>("Other");
