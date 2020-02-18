export interface RecapBase {
  _id: string;
  kind: RecapKind;
  startDate?: Date;
  endDate?: Date;
  bulletPoints: string[];
  userId: string;
}

export type RecapKind =
  | "Work Experience"
  | "Education"
  | "Accomplishments"
  | "Publications"
  | "Skills"
  | "Side Projects"
  | "Organizations"
  | "References"
  | "Other";

interface RecapWorkExperienceKind {
  title: string;
  location: string;
  company: string;
  employmentType: EmploymentType;
}

export interface RecapWorkExperience extends RecapBase, RecapWorkExperienceKind {
  startDate: Date;
  kind: "Work Experience";
}

type EmploymentType =
  | "Part-Time"
  | "Full-Time"
  | "Self-Employed"
  | "Freelance"
  | "Contract"
  | "Internship"
  | "Apprenticeship"
  | "Volunteer";

interface RecapEducationKind {
  school: string;
  location: string;
  degree: string;
  fieldOfStudy: string;
  grade: string;
}

export interface RecapEducation extends RecapBase, RecapEducationKind {
  kind: "Education";
}

interface RecapAccomplishmentsKind {
  title: string;
  type: AccomplishmentsType;
}

type AccomplishmentsType =
  | "Personal" // Mentorship, Health, Fitness, Learning, etc.
  | "Service" // Volunteer, Community Service, Philanthropy, etc.
  | "Featured" // Presentations, Conferences, TV Shows, Public Interviews, Podcasts, Radio, etc.
  | "School" // Test Score, Scholarship, Honor Roll, Clubs, Organizations, etc.
  | "Career" // Promotion, Work Awards, etc.
  | "Other";

export interface RecapAccomplishments extends RecapBase, RecapAccomplishmentsKind {
  kind: "Accomplishments";
}

interface RecapPublicationsKind {
  title: string;
  type: PublicationType;
  coauthors: string;
  publisher: string;
  url: string;
}

type PublicationType = "Book" | "Journal" | "Newspaper" | "Magazine" | "Blog" | "Other";

export interface RecapPublications extends RecapBase, RecapPublicationsKind {
  kind: "Publications";
}

interface RecapSkillsKind {
  title: string;
  proficiency: SkillsProficiency;
}

type SkillsProficiency = "Novice" | "Intermediate" | "Advanced" | "Expert";

export interface RecapSkills extends RecapBase, RecapSkillsKind {
  kind: "Skills";
}

interface RecapSideProjectsKind {
  title: string;
  creators: string;
}

export interface RecapSideProjects extends RecapBase, RecapSideProjectsKind {
  kind: "Side Projects";
}

interface RecapOrganizationsKind {
  organizationName: string;
  location: string;
  positions: string;
}

export interface RecapOrganizations extends RecapBase, RecapOrganizationsKind {
  kind: "Organizations";
}

interface RecapReferencesKind {
  company: string;
  title: string;
  phoneNumber: string;
  email: string;
}

export interface RecapReferences extends RecapBase, RecapReferencesKind {
  kind: "References";
}

interface RecapOtherKind {
  title: string;
}

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
