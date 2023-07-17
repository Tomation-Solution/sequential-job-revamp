import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CompanyJobPostManagementContainer } from "../../../../components/Company-Job-Post-Management/CompanyJobPostManagement.styles";
import InputWithLabel from "../../../../components/InputWithLabel/InputWithLabel";
import Switches from "../../../../globals/Switch/Switches";
import { FormError, FormSelect } from "../../../../globals/styles/forms.styles";
import { CompanyJobPostValidationType } from "../../../../components/Company-Job-Post-Management/company-job-post.schema";

type Props = { data: any };

function JobDetailsSummary({ data }: Props) {
  const {
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CompanyJobPostValidationType>({
    defaultValues: {
      is_active: false,
      description_content: "<h1>Job Description</h1>",
    },
  });

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
  }, [data, reset]);

  return (
    <CompanyJobPostManagementContainer>
      <main>
        <div className="left">
          <h2>Job Details</h2>

          <form>
            <InputWithLabel
              disabled
              label="Job Title"
              register={register("job_title")}
              errorMessage={errors.job_title?.message}
            />

            <InputWithLabel
              disabled
              label="Location"
              register={register("location")}
              errorMessage={errors.location?.message}
            />

            <div style={{ marginBottom: "10px" }}>
              <h4 style={{ margin: "5px 0px" }}>Is Active</h4>
              <Switches
                disabled
                checked={watch("is_active")}
                onChangefn={() => setValue("is_active", !watch("is_active"))}
              />
            </div>

            <FormSelect>
              <label>Job Type</label>
              <select
                {...register("job_type")}
                disabled
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
                disabled
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
                disabled
                placeholder="amount"
                type="number"
                {...register("salary")}
              />

              <select defaultValue={"₦"} disabled {...register("money_sign")}>
                <option disabled>Select Currency</option>
                <option value={"$"}>Dollar</option>
                <option value={"₦"}>Naira</option>
              </select>
            </div>

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
                disabled
                {...register("job_variant")}
                defaultValue={"filter_only"}
              >
                <option value={"filter_only"}>Filter Only</option>
                <option value={"filter_and_test"}>Filter & Test</option>
              </select>
            </FormSelect>

            <InputWithLabel
              disabled
              label="Required Documents, separate multiple documents with commas"
              register={register("job_required_document")}
              errorMessage={errors.job_required_document?.message}
            />

            <InputWithLabel
              disabled
              label="Job Categories, e.g. Health information technician,Patient,Medical writer"
              register={register("job_categories")}
              errorMessage={errors.job_categories?.message}
            />

            <InputWithLabel
              disabled
              label="Required Experience"
              register={register("required_experience")}
              errorMessage={errors.required_experience?.message}
            />
            <InputWithLabel
              disabled
              label="Generic Skills"
              register={register("generic_skills")}
              errorMessage={errors.generic_skills?.message}
            />
            <InputWithLabel
              disabled
              label="Technical Skills"
              register={register("technical_skills")}
              errorMessage={errors.technical_skills?.message}
            />
            <InputWithLabel
              disabled
              label="Professional/Career Path"
              register={register("professional_path")}
              errorMessage={errors.professional_path?.message}
            />
          </form>
        </div>

        <div className="right">
          <h2>Job Description</h2>
          <div
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              width: "100%",
              padding: "40px ",
            }}
          >
            <section>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${data.description_content}`,
                }}
              />
            </section>
          </div>
        </div>
      </main>
    </CompanyJobPostManagementContainer>
  );
}

export default JobDetailsSummary;
