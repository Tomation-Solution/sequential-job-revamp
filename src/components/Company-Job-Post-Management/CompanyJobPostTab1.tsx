import { useForm } from "react-hook-form";
import { CompanyJobPostManagementContainer } from "./CompanyJobPostManagement.styles";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import Switches from "../../globals/Switch/Switches";
import { FlexBox } from "../../globals/styles/FlexBox";
import { FormError, FormSelect } from "../../globals/styles/forms.styles";
import {
  CompanyJobPostValidationType,
  companyJobPostValidationSchema,
} from "./company-job-post.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../Button/Button";
import TextEditor from "../../globals/TextEditor/TextEditor";
import { useEffect, useRef, useState } from "react";
import { SavedTabs } from "./types";
import { useMutation, useQueryClient } from "react-query";
import {
  companyCreateJobs,
  companyGetJob,
  companyUpdateJobDetails,
} from "../../redux/api/company/jobs-post-management.api";
import useToast from "../../hooks/useToastify";
import Preloader from "../Preloader/Preloader";
import { useJobPostDetailsStore } from "../../zustand-store/jobPost";
import { useCustomFetcher } from "../../utils/fetcher";
import EmptyState from "../EmptyState/EmptyState";

// type Props = {
//   register: UseFormRegister<CompanyJobPostValidationType>;
//   errors: FieldErrors<CompanyJobPostValidationType>;
//   watch: UseFormWatch<CompanyJobPostValidationType>;
//   setValue: UseFormSetValue<CompanyJobPostValidationType>;
//   onSubmitFn: () => void;
// };
type Props = {
  selectedJobId: any;
  setSavedTabs: React.Dispatch<React.SetStateAction<SavedTabs>>;
};

function CompanyJobPostTab1({ setSavedTabs, selectedJobId }: Props) {
  const [jobDescriptionSave, setJobDescriptionSave] = useState(false);
  const jobPostDetailsCtrl = useJobPostDetailsStore((state) => state);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CompanyJobPostValidationType>({
    //@ts-ignore
    resolver: yupResolver(companyJobPostValidationSchema),
    defaultValues: {
      is_active: false,
      description_content: "<h1>Job Description</h1>",
    },
  });

  const { loadingState, isError, data } = useCustomFetcher<
    CompanyJobPostValidationType & { job_filter: any; job_test: any }
  >(`job-details-${selectedJobId}`, () => companyGetJob(selectedJobId));

  useEffect(() => {
    if (data) {
      const updateData = {
        job_title: data?.job_title || "",
        is_active: data?.is_active || false,
        location: data?.location || "",
        job_type: data.job_type || "on_site",
        salary: data?.salary || 0,
        currency: data?.currency || "",
        job_required_document: data?.job_required_document || "",
        description_content:
          data?.description_content || "<h1>Job Description</h1>",
        job_variant: data?.job_variant || "filter_only",
        job_categories: data?.job_categories || "",
        employement_type: data?.employement_type || "full_time",
        money_sign: data?.money_sign || "₦",
        required_experience: data?.required_experience || "",
        generic_skills: data?.generic_skills || "",
        technical_skills: data?.technical_skills || "",
        professional_path: data?.professional_path || "",
      };

      reset(updateData);
    }
  }, [data, reset, selectedJobId]);

  const { notify } = useToast();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(companyCreateJobs, {
    onSuccess: (res) => {
      setSavedTabs((oldState) => ({ ...oldState, tab1: true }));

      setJobDescriptionSave(false);

      queryClient.invalidateQueries(`all-jobs`);

      queryClient.invalidateQueries(`job-details-${selectedJobId}`);

      jobPostDetailsCtrl.setJobId(res?.data?.id);
      notify("job created successfully", "success");
    },
    onError: () => {
      setJobDescriptionSave(false);
      notify("failed to create job", "error");
    },
  });

  const updateJobMutation = useMutation(companyUpdateJobDetails, {
    onSuccess: (res) => {
      setSavedTabs((oldState) => ({ ...oldState, tab1: true }));

      queryClient.invalidateQueries(`all-jobs`);

      queryClient.invalidateQueries(`job-details-${selectedJobId}`);

      setJobDescriptionSave(false);

      jobPostDetailsCtrl.setJobId(res?.data?.id);
      notify("job updated successfully", "success");
    },
    onError: () => {
      setJobDescriptionSave(false);
      notify("failed to update job", "error");
    },
  });

  const editorRef = useRef<any>();

  const onSubmitButton = () => {
    setJobDescriptionSave(true);
    const data = editorRef.current.getContent();
    setValue("description_content", data);
  };

  const onSubmitHandler = (inputData: CompanyJobPostValidationType) => {
    if (!jobDescriptionSave) {
      return notify("save the job description to proceed", "error");
    }

    let currency = "naira";
    if (inputData.money_sign === "$") {
      currency = "dollar";
    }

    const payload = { ...inputData, currency };

    const formData = new FormData();
    //@ts-ignore
    Object.keys(payload).forEach((key) => formData.append(key, payload[key]));

    if (selectedJobId === "create_mode") {
      mutate(formData);
    } else {
      if (
        data?.job_variant === "filter_and_test" &&
        (data?.job_test === null || data?.job_filter === null)
      ) {
        notify(
          `Tests & CV sorting questions need to be set for jobs with the variant type of "Filter & Test" before you can update it`,
          "error"
        );
        return;
      }

      if (data?.job_variant === "filter_only" && data?.job_filter === null) {
        notify(
          `CV sorting questions need to be set for this job before you can update it`,
          "error"
        );
        return;
      }

      updateJobMutation.mutate({ jobId: selectedJobId, formData });
    }
  };

  if (isError) {
    return <EmptyState header="Failed to get data" />;
  }

  return (
    <>
      <Preloader
        loading={isLoading || updateJobMutation.isLoading || loadingState}
      />
      <CompanyJobPostManagementContainer>
        <main>
          <div className="left">
            <h2>Job Details</h2>

            <form>
              <InputWithLabel
                label="Job Title"
                register={register("job_title")}
                errorMessage={errors.job_title?.message}
              />

              <InputWithLabel
                label="Location"
                register={register("location")}
                errorMessage={errors.location?.message}
              />

              <div style={{ marginBottom: "10px" }}>
                <h4 style={{ margin: "5px 0px" }}>Is Active</h4>
                <Switches
                  checked={watch("is_active")}
                  onChangefn={() => setValue("is_active", !watch("is_active"))}
                />
              </div>

              <FormSelect>
                <label>Job Type</label>
                <select {...register("job_type")} defaultValue={"on_site"}>
                  <option disabled>Select Job Type</option>
                  <option value={"hybrid"}>Hybrid</option>
                  <option value={"on_site"}>On-Site</option>
                  <option value={"remote"}>Remote</option>
                </select>
                <FormError>{errors.job_type?.message}</FormError>
              </FormSelect>

              <FormSelect>
                <label>Employment Type</label>
                <select
                  {...register("employement_type")}
                  defaultValue={"full_time"}
                >
                  <option disabled>Select Employeement Type</option>
                  <option value={"full_time"}>Full Time</option>
                  <option value={"part_time"}>Part Time</option>
                  <option value={"contract"}>Contract</option>
                </select>
                <FormError>{errors.employement_type?.message}</FormError>
              </FormSelect>

              <h4>Salary</h4>

              <div className="parallel-input">
                <input
                  placeholder="amount"
                  type="number"
                  {...register("salary")}
                />

                <select defaultValue={"₦"} {...register("money_sign")}>
                  <option disabled>Select Currency</option>
                  <option value={"$"}>Dollar</option>
                  <option value={"₦"}>Naira</option>
                </select>
              </div>

              <small>
                <FormError>{errors.salary?.message}</FormError>
                <FormError>{errors.money_sign?.message}</FormError>
              </small>

              <FormSelect>
                <label>Job Variants</label>
                <small style={{ color: "", marginBottom: "5px" }}>
                  Filter Only :- applicants would be required to answer sorting
                  questions only
                </small>
                <small style={{ color: "", marginBottom: "5px" }}>
                  Filter & Test :- applicants would be required answer both
                  sorting questions and take application test.
                </small>

                <select
                  {...register("job_variant")}
                  defaultValue={"filter_only"}
                >
                  <option value={"filter_only"}>Filter Only</option>
                  <option value={"filter_and_test"}>Filter & Test</option>
                </select>

                <FormError>{errors.job_variant?.message}</FormError>
              </FormSelect>

              <InputWithLabel
                label="Required Documents, separate multiple documents with commas"
                register={register("job_required_document")}
                errorMessage={errors.job_required_document?.message}
              />

              <InputWithLabel
                label="Job Categories, e.g. Health information technician,Patient,Medical writer"
                register={register("job_categories")}
                errorMessage={errors.job_categories?.message}
              />

              <InputWithLabel
                label="Required Experience"
                register={register("required_experience")}
                errorMessage={errors.required_experience?.message}
              />
              <InputWithLabel
                label="Generic Skills"
                register={register("generic_skills")}
                errorMessage={errors.generic_skills?.message}
              />
              <InputWithLabel
                label="Technical Skills"
                register={register("technical_skills")}
                errorMessage={errors.technical_skills?.message}
              />
              <InputWithLabel
                label="Professional/Career Path"
                register={register("professional_path")}
                errorMessage={errors.professional_path?.message}
              />
            </form>
          </div>

          <div className="right">
            <h2>Job Description</h2>

            <FormError>{errors.description_content?.message}</FormError>
            <TextEditor
              editorRef={editorRef}
              initialValue={watch("description_content")}
            />
            <Button styleType="danger" onClick={onSubmitButton}>
              save changes
            </Button>
          </div>
        </main>

        <FlexBox justifyContent="flex-end">
          <Button onClick={handleSubmit(onSubmitHandler)}>Save</Button>
        </FlexBox>
      </CompanyJobPostManagementContainer>
    </>
  );
}

export default CompanyJobPostTab1;
