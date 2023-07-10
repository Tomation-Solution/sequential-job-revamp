import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  jobId: any;
  jobFilterQuestionId: any;
};

type Actions = {
  setJobId: (data?: any) => void;
  setFilterQuestionId: (data?: any) => void;
  clearAll: () => void;
};

export const useJobPostDetailsStore = create<Store & Actions>()(
  persist(
    (set) => ({
      jobId: null,
      jobFilterQuestionId: null,
      setJobId: (data: any) =>
        set((oldState) => ({
          ...oldState,
          jobId: data,
        })),
      setFilterQuestionId: (data: any) =>
        set((oldState) => ({
          ...oldState,
          jobFilterQuestionId: data,
        })),
      clearAll: () => set(() => ({ jobId: null, jobFilterQuestionId: null })),
    }),
    {
      name: "post-jobs",
    }
  )
);
