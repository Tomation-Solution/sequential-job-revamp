export type TestCutOffMark = {
  not_suitable: number;
  end_not_suitable: number;

  partially_suitable: number;
  end_partially_suitable: number;

  suitable: number;
  end_suitable: number;
};

export type JobType = {
  id: number;
  job_title: string;
  is_active: boolean;
  location: string;
  job_type: string;
  salary: string;
  currency: string;
  job_required_document: string;
  description: any;
  job_filter: number;
  description_content: string;
  job_variant: string;
  job_test: any;
  country: string;
  org_name: string;
  job_categories: string;
  employement_type: string;
  money_sign: string;
  required_experience: string;
  generic_skills: string;
  technical_skills: string;
  professional_path: string;
  created_at: string;
  updated_at: string;
};

export type JobInvitationLetterType = {
  id: number;
  job: number;
  company: number;
  letter_content: string;
};
