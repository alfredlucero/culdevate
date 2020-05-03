export interface RecapBase {
  _id: string;
  bulletPoints: string[];
  userId: string;
}

export enum RecapKind {
  WorkExperience = "Work Experience",
  Education = "Education",
  Accomplishments = "Accomplishments",
  Publications = "Publications",
  Skills = "Skills",
  SideProjects = "Side Projects",
  Organizations = "Organizations",
  References = "References",
  Other = "Other",
}

export interface RecapWorkExperience extends RecapBase {
  title: string;
  location: string;
  company: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate?: string;
  kind: RecapKind.WorkExperience;
}

export type EmploymentType =
  | "Part-Time"
  | "Full-Time"
  | "Self-Employed"
  | "Freelance"
  | "Contract"
  | "Internship"
  | "Apprenticeship"
  | "Volunteer";

export interface RecapEducation extends RecapBase {
  school: string;
  location: string;
  degree: string;
  fieldOfStudy: string;
  grade: string;
  startDate: string;
  endDate?: string;
  kind: RecapKind.Education;
}

export type AccomplishmentsType =
  | "Personal" // Mentorship, Health, Fitness, Learning, etc.
  | "Service" // Volunteer, Community Service, Philanthropy, etc.
  | "Featured" // Presentations, Conferences, TV Shows, Public Interviews, Podcasts, Radio, etc.
  | "School" // Test Score, Scholarship, Honor Roll, Clubs, Organizations, etc.
  | "Career" // Promotion, Work Awards, etc.
  | "Other";

export interface RecapAccomplishments extends RecapBase {
  title: string;
  type: AccomplishmentsType;
  startDate: string;
  kind: RecapKind.Accomplishments;
}

export interface RecapPublications extends RecapBase {
  title: string;
  type: PublicationType;
  coauthors: string;
  publisher: string;
  url: string;
  startDate: string;
  kind: RecapKind.Publications;
}

type PublicationType = "Book" | "Journal" | "Newspaper" | "Magazine" | "Blog" | "Other";

export interface RecapSkills extends RecapBase {
  title: string;
  proficiency: SkillsProficiency;
  kind: RecapKind.Skills;
}

type SkillsProficiency = "Novice" | "Intermediate" | "Advanced" | "Expert";

export interface RecapSideProjects extends RecapBase {
  title: string;
  creators: string;
  startDate: string;
  endDate?: string;
  kind: RecapKind.SideProjects;
}

export interface RecapOrganizations extends RecapBase {
  organizationName: string;
  location: string;
  positions: string;
  startDate: string;
  endDate?: string;
  kind: RecapKind.Organizations;
}

export interface RecapReferences extends RecapBase {
  company: string;
  title: string;
  phoneNumber: string;
  email: string;
  kind: RecapKind.References;
}

export interface RecapOther extends RecapBase {
  title: string;
  startDate: string;
  endDate: string;
  kind: RecapKind.Other;
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

export type RecapCreate =
  | Omit<RecapWorkExperience, "userId" | "_id">
  | Omit<RecapEducation, "userId" | "_id">
  | Omit<RecapAccomplishments, "userId" | "_id">
  | Omit<RecapPublications, "userId" | "_id">
  | Omit<RecapSkills, "userId" | "_id">
  | Omit<RecapSideProjects, "userId" | "_id">
  | Omit<RecapOrganizations, "userId" | "_id">
  | Omit<RecapReferences, "userId" | "_id">
  | Omit<RecapOther, "userId" | "_id">;
