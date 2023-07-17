import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  jobId: any;
  jobTestQuestionId: any;
};

type Actions = {
  setJobId: (data?: any) => void;
  setTestQuestionId: (data?: any) => void;
  clearAll: () => void;
};

export const useJobTestDetailsStore = create<Store & Actions>()(
  persist(
    (set) => ({
      jobId: null,
      jobTestQuestionId: null,
      setJobId: (data: any) =>
        set((oldState) => ({
          ...oldState,
          jobId: data,
        })),
      setTestQuestionId: (data: any) =>
        set((oldState) => ({
          ...oldState,
          jobTestQuestionId: data,
        })),
      clearAll: () => set(() => ({ jobId: null, jobTestQuestionId: null })),
    }),
    {
      name: "post-test",
    }
  )
);
