import api from "./axios";

export type getApplicationListApiResponse = {
  id: number;
  generated_panelist_total_score: number;
  company: {
    id: number;
    name: string;
    job_title: string;
  };
  docs_needed: string[];
  jobseekers: {
    name: string;
  };
  accept_application: boolean;
  final_selection_state: "selected" | "in_view" | "not_selected" | "idle";
};
export const getApplicationListApi = async ({
  status,
}: {
  status?: getApplicationListApiResponse["final_selection_state"];
}): Promise<getApplicationListApiResponse[]> => {
  const resp = await api.get(
    `/jobs/jobseeker-application-process/?final_selection_state=${
      status ? status : ""
    }`
  );
  return resp.data.data;
};

export const acceptJobApplication = async (data: {
  job_applicant_id: number;
}) => {
  const resp = await api.post(
    "/jobs/jobseeker-application-process/accept_offer/",
    data
  );

  return resp.data;
};

export const get_required_job_docs = async (
  job_id: number
): Promise<string[]> => {
  const resp = await api.get(`/jobs/job-seeker-handles-doc/?job_id=${job_id}`);

  return resp.data.data;
};

export const submitDocsApi = async (data: {
  job_id: number;
  data: any;
}): Promise<string[]> => {
  const resp = await api.post(
    `/jobs/job-seeker-handles-doc/?job_id=${data.job_id}`,
    data.data
  );
  return resp.data.data;
};
