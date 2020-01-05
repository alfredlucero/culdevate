import mongoose from "mongoose";
import { UserDocument } from "../users/users.model";
import { MAX_BULLETPOINT_LENGTH, MAX_BULLETPOINTS, MAX_GENERAL_LENGTH, MAX_URL_LENGTH } from "./recaps.validation";

export interface RecapBase {
  kind: RecapKind;
  startDate?: Date;
  endDate?: Date;
  bulletPoints: string[];
  userId: UserDocument["_id"];
}

export type RecapKind =
  | "WorkExperience"
  | "Education"
  | "Accomplishments"
  | "Publications"
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
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  recapBaseOptions,
);

interface RecapBaseDocument extends RecapBase, mongoose.Document {}

// Base Recap model from which other Recap models will inherit from based on the
// the value of the "kind" discriminator
export const RecapBaseModel = mongoose.model<RecapBaseDocument>("Recap", recapBaseSchema);

// Work Experience

interface RecapWorkExperienceKind {
  title: string;
  location: string;
  company: string;
  employmentType: EmploymentType;
}

type EmploymentType = "Part-Time" | "Full-Time";

const recapWorkExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  location: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  company: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  employmentType: { type: String, required: true, enum: ["Part-Time", "Full-Time"] },
});

interface RecapWorkExperienceDocument extends RecapBaseDocument, RecapWorkExperienceKind {}

export const RecapWorkExperienceModel = RecapBaseModel.discriminator<RecapWorkExperienceDocument>(
  "WorkExperience",
  recapWorkExperienceSchema,
);

export interface RecapWorkExperience extends RecapBase, RecapWorkExperienceKind {
  kind: "WorkExperience";
}

// Education

interface RecapEducationKind {
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

interface RecapEducationDocument extends RecapBaseDocument, RecapEducationKind {}

export const RecapEducationModel = RecapBaseModel.discriminator<RecapEducationDocument>(
  "Education",
  recapEducationSchema,
);

export interface RecapEducation extends RecapBase, RecapEducationKind {
  kind: "Education";
}

// Accomplishments

interface RecapAccomplishmentsKind {
  title: string;
  type: AccomplishmentsType;
}

type AccomplishmentsType =
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

interface RecapAccomplishmentsDocument extends RecapBaseDocument, RecapAccomplishmentsKind {
  kind: "Accomplishments";
}

export const RecapAccomplishmentsModel = RecapBaseModel.discriminator<RecapAccomplishmentsDocument>(
  "Accomplishments",
  recapAccomplishmentsSchema,
);

export interface RecapAccomplishments extends RecapBase, RecapAccomplishmentsKind {}

// Publications

interface RecapPublicationsKind {
  title: string;
  type: PublicationType;
  coauthors: string;
  publisher: string;
  url: string;
}

type PublicationType = "Book" | "Journal" | "Newspaper" | "Magazine" | "Blog";

const recapPublicationsSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  type: { type: String, required: true, enum: ["Book", "Journal", "Newspaper", "Magazine", "Blog"] },
  coauthors: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  publisher: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  url: { type: String, required: true, maxlength: MAX_URL_LENGTH },
});

interface RecapPublicationsDocument extends RecapBaseDocument, RecapPublicationsKind {}

export const RecapPublicationsModel = RecapBaseModel.discriminator<RecapPublicationsDocument>(
  "Publications",
  recapPublicationsSchema,
);

export interface RecapPublications extends RecapBase, RecapPublicationsKind {
  kind: "Publications";
}

// Skills

interface RecapSkillsKind {
  title: string;
  proficiency: SkillsProficiency;
}

type SkillsProficiency = "Novice" | "Intermediate" | "Advanced" | "Expert";

const recapSkillsSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  proficiency: { type: String, required: true, enum: ["Novice", "Intermediate", "Advanced", "Expert"] },
});

interface RecapSkillsDocument extends RecapBaseDocument, RecapSkillsKind {}

export const RecapSkillsModel = RecapBaseModel.discriminator<RecapSkillsDocument>("Skills", recapSkillsSchema);

export interface RecapSkills extends RecapBase, RecapSkillsKind {
  kind: "Skills";
}

// Side Projects

interface RecapSideProjectsKind {
  title: string;
  creators: string;
}

const recapSideProjectsSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  creators: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
});

interface RecapSideProjectsDocument extends RecapBaseDocument, RecapSideProjectsKind {}

export const RecapSideProjectsModel = RecapBaseModel.discriminator<RecapSideProjectsDocument>(
  "SideProjects",
  recapSideProjectsSchema,
);

export interface RecapSideProjects extends RecapBase, RecapSideProjectsKind {
  kind: "SideProjects";
}

// Organizations

interface RecapOrganizationsKind {
  organizationName: string;
  location: string;
  positions: string;
}

const recapOrganizationsSchema = new mongoose.Schema({
  organizationName: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  location: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  positions: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
});

interface RecapOrganizationsDocument extends RecapBaseDocument, RecapOrganizationsKind {}

export const RecapOrganizationsModel = RecapBaseModel.discriminator<RecapOrganizationsDocument>(
  "Organizations",
  recapOrganizationsSchema,
);

export interface RecapOrganizations extends RecapBase, RecapOrganizationsKind {
  kind: "Organizations";
}

// References

interface RecapReferencesKind {
  company: string;
  title: string;
  phoneNumber: string;
  email: string;
}

const recapReferencesSchema = new mongoose.Schema({
  company: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  title: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  phoneNumber: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
  email: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
});

interface RecapReferencesDocument extends RecapBaseDocument, RecapReferencesKind {}

export const RecapReferencesModel = RecapBaseModel.discriminator<RecapReferencesDocument>(
  "References",
  recapReferencesSchema,
);

export interface RecapReferences extends RecapBase, RecapReferencesKind {
  kind: "References";
}

// Other

interface RecapOtherKind {
  title: string;
}

const recapOtherSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: MAX_GENERAL_LENGTH },
});

interface RecapOtherDocument extends RecapBaseDocument, RecapOtherKind {}

export const RecapOtherModel = RecapBaseModel.discriminator<RecapOtherDocument>("Other", recapOtherSchema);

export interface RecapOther extends RecapBase, RecapOtherKind {
  kind: "Other";
}

export type Recap =
  | RecapWorkExperience
  | RecapEducation
  | RecapAccomplishments
  | RecapPublications
  | RecapSkills
  | RecapSideProjects
  | RecapOrganizations
  | RecapReferences
  | RecapOther;
