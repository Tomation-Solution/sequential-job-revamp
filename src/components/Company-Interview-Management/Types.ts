export type CompanyCreateInterview = {
  list_of_available_dates: {
    available_dates: string;
  }[];
  list_of_available_time: {
    available_time: string;
  }[];
  rating_sheet: {
    name: string;
    cut_off: number;
  }[];
  list_of_email: {
    email: string;
  }[];
  panelist_invitation_letter: string;
  interview_link: string;
};

export type CompanyGetInterview = {
  id: number;
  list_of_available_dates: {
    available_dates: string;
  }[];
  list_of_available_time: {
    available_time: string;
  }[];
  rating_sheet: {
    name: string;
    cut_off: number;
  }[];
  list_of_email: {
    email: string;
  }[];
  panelist_invitation_letter: string;
  interview_link: string;
  company: number;
  job: number;
};
