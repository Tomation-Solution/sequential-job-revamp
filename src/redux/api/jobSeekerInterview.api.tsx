import api from "./axios";
import { JobType } from "./jobs.api";

export type JobSeerkerInterviewType = {
  job_seeker: number;
  interview: {
    job_title: string;
    interview_id: number;
    company: string;
  };
  id: number;
  date_picked: string;
  time_picked: string;
};

export const get_interviews = async ({
  filter_by_scheduled = "unscheduled",
}: {
  filter_by_scheduled?: "unscheduled" | "scheduled";
}): Promise<JobSeerkerInterviewType[]> => {
  const resp = await api.get(
    "interview/job_seeker_manage_invites/" +
      `?filter_by_scheduled=${filter_by_scheduled}`
  );
  return resp.data.data;
};

export type JobSeekerInterviewType = {
  job_seeker: number;
  interview: {
    job: JobType;
    interview_id: number;
    dates_related_data: {
      dates: { available_dates: string; is_selected?: boolean }[];
      times: {
        available_time: string;
        is_selected?: boolean;
      }[];
    };
    interview_link: string;
    is_time_for_interview: boolean;
    has_picked_invitation: boolean;
  };
  date_picked: string;
  time_picked: string;
};
export const get_interviewDetail = async (
  job_id: number
): Promise<JobSeekerInterviewType> => {
  const resp = await api.get(
    "/interview/job_seeker_manage_invites/" + job_id + "/"
  );
  return resp.data.data;
};

type PropPickInterviewDate = {
  available_time: string;
  available_dates: string;
  interview_id: number;
};

export const pick_interview_date = async (data: PropPickInterviewDate) => {
  const resp = await api.post(
    "/interview/job_seeker_manage_invites/pick_date/",
    data
  );
  return resp.data.data;
};

type getJobAppliedForResponse = {
  id: number;
  job: {
    company_name: string;
    position: string;
    id: number;
  };
  final_selection_state: "selected" | "in_view" | "not_selected" | "idle";
};
export const get_jobs_applied_for = async (): Promise<
  getJobAppliedForResponse[]
> => {
  const resp = await api.get("/jobs/job-seeker-dashboard/jobs_applied_for/");
  return resp.data.data;
};

export const getInterviewAttendedApi = async () => {
  const resp = await api.get("/jobs/job-seeker-dashboard/interviews_attended/");
  return resp.data.data;
};

export const jobsTestScheduledApi = async () => {
  const resp = await api.get("/jobs/job-seeker-dashboard/jobs_test_scheduled/");
  return resp.data.data;
};

export const jobsTestTakenApi = async (): Promise<
  getJobAppliedForResponse[]
> => {
  const resp = await api.get("/jobs/job-seeker-dashboard/jobs_test_taken/");
  return resp.data.data;
};
type InterviewScgeduledResponseType = {
  id: number;
  interview: number;
  date_picked: string;
  time_picked: string;
  has_mail_sent: boolean;
  has_picked_invitation: boolean;
  job_seeker: {
    full_name: string;
    email: string;
    cv: string;
  };
  candidates_applied: number;
  job: {
    company_name: string;
    position: string;
  };
};
export const getInterviewScheduledApi = async (): Promise<
  InterviewScgeduledResponseType[]
> => {
  const resp = await api.get("/jobs/job-seeker-dashboard/interview_scheduled/");
  return resp.data.data;
};
//

type jobDasboardSummaryApiResponseType = {
  jobs_applied_for: number;
  interviews_attended: number;
  jobs_test_taken: number;
  jobs_test_scheduled: number;
  interview_scheduled: number;
  job_offers: number;
};
export const jobDasboardSummaryApi =
  async (): Promise<jobDasboardSummaryApiResponseType> => {
    const resp = await api.get("/jobs/job-seeker-dashboard/dashboard_summary/");
    return resp.data.data;
  };
