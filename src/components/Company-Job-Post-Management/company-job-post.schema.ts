import * as yup from "yup";

export const companyJobPostValidationSchema = yup.object({
  job_title: yup.string().required("job title is required"),
  is_active: yup.boolean().required(),
  location: yup.string().required("location is required"),
  job_type: yup.string().oneOf(["remote", "on_site", "hybrid"]).required(),
  employement_type: yup
    .string()
    //backend addition
    .oneOf(["full_time", "part_time", "contract"])
    .required(),
  salary: yup
    .number()
    .typeError("invlaid salary")
    .required()
    .positive()
    .integer(),
  currency: yup.string().optional(),
  job_required_document: yup
    .string()
    .required("job required document is required"),
  description_content: yup.string().required(),
  job_variant: yup
    .string()
    .oneOf(["filter_only", "filter_and_test"])
    .required(),
  job_categories: yup.string().required("job categories is required"),

  //backend addition
  money_sign: yup.string().oneOf(["$", "₦"]).required(),

  //backend addition
  required_experience: yup
    .string()
    .required("required experience must be provided"),

  //backend addition
  generic_skills: yup.string().required("generic skills is required"),

  //backend addition
  technical_skills: yup.string().required("technical skills is required"),

  //backend addition
  professional_path: yup
    .string()
    .required("professional/career path is required"),
});

export type CompanyJobPostValidationType = yup.InferType<
  typeof companyJobPostValidationSchema
>;
