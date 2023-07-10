import { useEffect, useRef, useState } from "react";
import CutOffMarkSetter from "../../globals/CutOffMarkSetter/CutOffMarkSetter";
import { CompanyJobPostManagementContainer } from "./CompanyJobPostManagement.styles";
import { JobPostDetailsType, SavedTabs } from "./types";
import { TestCutOffMark } from "../Company-Job-Test-Management/types";
import Switches from "../../globals/Switch/Switches";
import { FormSelect, FormError } from "../../globals/styles/forms.styles";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import { useForm } from "react-hook-form";
import {
  CompanyJobPostValidationType,
  companyJobPostValidationSchema,
} from "./company-job-post.schema";
import {
  companyGetJob,
  companySetCutOffDetails,
  companyUpdateJobDetails,
} from "../../redux/api/company/jobs-post-management.api";
import { useCustomFetcher } from "../../utils/fetcher";
import TextEditor from "../../globals/TextEditor/TextEditor";
import Button from "../Button/Button";
import EmptyState from "../EmptyState/EmptyState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "react-query";
import useToast from "../../hooks/useToastify";
import Preloader from "../Preloader/Preloader";
import { useJobPostDetailsStore } from "../../zustand-store/jobPost";

function CompanyJobPostTab3() {
  const [testCutOffMark, setTestCutOffMark] = useState<TestCutOffMark>({
    not_suitable: 0,
    end_not_suitable: 0,

    partially_suitable: 0,
    end_partially_suitable: 0,

    suitable: 0,
    end_suitable: 0,
  });

  const jobPostDetailsCtrl = useJobPostDetailsStore((state) => state);

  const { notify } = useToast();

  const queryClient = useQueryClient();

  // jobPostDetails.jobId

  const { loadingState, isError, data } =
    useCustomFetcher<CompanyJobPostValidationType>(
      `job-details-${jobPostDetailsCtrl.jobId}`,
      () => companyGetJob(jobPostDetailsCtrl.jobId)
    );

  const {
    register,
    watch,
    reset,
    handleSubmit,
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

  useEffect(() => {
    if (data) {
      const updateData = {
        job_title: data?.job_title,
        is_active: data?.is_active,
        location: data?.location,
        job_type: data.job_type,
        salary: data?.salary,
        currency: data?.currency,
        job_required_document: data?.job_required_document,
        description_content: data?.description_content,
        job_variant: data?.job_variant,
        job_categories: data?.job_categories,
        employement_type: data?.employement_type,
        money_sign: data?.money_sign,
        required_experience: data?.required_experience,
        generic_skills: data?.generic_skills,
        technical_skills: data?.technical_skills,
        professional_path: data?.professional_path,
      };

      reset(updateData);
    }
  }, [data, reset]);

  const editorRef = useRef<any>();

  const onSubmitButton = () => {
    const data = editorRef.current.getContent();
    setValue("description_content", data);
  };

  const { isLoading, mutate } = useMutation(companyUpdateJobDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries(`job-details-${jobPostDetailsCtrl.jobId}`);
      notify("Job details updated", "success");
    },
    onError: () => {
      notify("Failed to update job details", "error");
    },
  });

  const setCutOffMutation = useMutation(companySetCutOffDetails, {
    onSuccess: () => {
      setTestCutOffMark({
        not_suitable: 0,
        end_not_suitable: 0,

        partially_suitable: 0,
        end_partially_suitable: 0,

        suitable: 0,
        end_suitable: 0,
      });
      notify("job application cutoff marks set successfully", "success");
    },
    onError: () => {
      notify("failed to set job cutoff marks", "error");
    },
  });

  const onFormUpdateHandler = (inputData: CompanyJobPostValidationType) => {
    let currency = "naira";
    if (inputData.money_sign === "$") {
      currency = "dollar";
    }

    const payload = { currency, ...inputData };

    const formData = new FormData();
    //@ts-ignore
    Object.keys(payload).forEach((key) => formData.append(key, payload[key]));

    mutate({ jobId: jobPostDetailsCtrl.jobId, formData });
  };

  const setCutOffHandler = () => {
    setCutOffMutation.mutate({
      id: jobPostDetailsCtrl.jobFilterQuestionId,
      ...testCutOffMark,
    });
  };

  return (
    <>
      <Preloader loading={isLoading || setCutOffMutation.isLoading} />
      <CompanyJobPostManagementContainer>
        <main>
          <div className="left">
            <h1>Applicant Sorting </h1>

            <p style={{ textAlign: "center" }}>
              In other to ease the recruiutment selection process, It is
              important that you set a pre-test that would help sort out
              qualified candidates during application submission.
            </p>

            <h3 style={{ fontWeight: 400 }}>Set Cut Off</h3>

            <CutOffMarkSetter
              title="Suitable min."
              value={testCutOffMark.suitable}
              itemKey="suitable"
              onStateChange={setTestCutOffMark}
            />

            <CutOffMarkSetter
              title="Suitable max."
              value={testCutOffMark.end_suitable}
              itemKey="end_suitable"
              onStateChange={setTestCutOffMark}
            />

            <CutOffMarkSetter
              title="Partially Suitable min."
              value={testCutOffMark.partially_suitable}
              itemKey="partially_suitable"
              onStateChange={setTestCutOffMark}
            />

            <CutOffMarkSetter
              title="Partially Suitable max."
              value={testCutOffMark.end_partially_suitable}
              itemKey="end_partially_suitable"
              onStateChange={setTestCutOffMark}
            />

            <CutOffMarkSetter
              title="Not Suitable min."
              value={testCutOffMark.not_suitable}
              itemKey="not_suitable"
              onStateChange={setTestCutOffMark}
            />

            <CutOffMarkSetter
              title="Not Suitable max."
              value={testCutOffMark.end_not_suitable}
              itemKey="end_not_suitable"
              onStateChange={setTestCutOffMark}
            />

            <Button onClick={setCutOffHandler}>Set Test CutOff</Button>
          </div>

          <div className="right">
            <h1>Job Summary</h1>

            <div className="right">
              {loadingState ? (
                <EmptyState header={"Loading Job Summary"} />
              ) : !isError ? (
                <>
                  <h2>Job Description</h2>

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
                        onChangefn={() =>
                          setValue("is_active", !watch("is_active"))
                        }
                      />
                    </div>

                    <FormSelect>
                      <label>Job Type</label>
                      <select
                        {...register("job_type")}
                        defaultValue={"on_site"}
                      >
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
                        Filter Only :- applicants would be required to answer
                        sorting questions only
                      </small>
                      <small style={{ color: "", marginBottom: "5px" }}>
                        Filter & Test :- applicants would be required answer
                        both sorting questions and take application test.
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

                  <FormError>{errors.description_content?.message}</FormError>
                  <TextEditor
                    editorRef={editorRef}
                    initialValue={watch("description_content")}
                  />
                  <Button styleType="danger" onClick={onSubmitButton}>
                    save changes
                  </Button>

                  <Button onClick={handleSubmit(onFormUpdateHandler)}>
                    Update Job Details
                  </Button>
                </>
              ) : (
                <EmptyState
                  header="Failed"
                  subHeader={"Failed to load Job Summary"}
                />
              )}
            </div>
          </div>
        </main>
      </CompanyJobPostManagementContainer>
    </>
  );
}

export default CompanyJobPostTab3;
