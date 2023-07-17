type ExperienceDetailsType = {
  role: string;
  company: string;
  end_year: string;
  start_year: string;
  responsibilities: string;
};

type EducationDetailsType = {
  end_year: string;
  start_year: string;
  degree_type: string;
  school_name: string;
  course_of_study: string;
};

type CertificationDetailsType = {
  issuer: string;
  start_year: string;
  certification: string;
};

export type CVSummaryType = {
  id: number;
  cv: any;
  notify_me_on: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  addresse: string;
  city: string;
  state: string;
  country_of_residence: string;
  linkdin: string;
  twitter: string;
  personal_statement: string;
  education: EducationDetailsType[];
  experience: ExperienceDetailsType[];
  certificaton: CertificationDetailsType[];
  refrences: any[];
  has_updated_cv: boolean;
  user: number;
};
