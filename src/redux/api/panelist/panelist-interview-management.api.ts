import { AxiosError } from "axios";
import api from "../axios";

export const getAllPanelistJobs = async () => {
  try {
    const res = await api.get(`/interview/panelist_view_jobs/`);
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};
