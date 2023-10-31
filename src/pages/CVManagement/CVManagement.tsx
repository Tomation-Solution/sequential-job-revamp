import { useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FaTrash } from "react-icons/fa";
import {
  CVManagementHeader,
  CVManagemntContainer,
  CVManagemntFormContainer,
  CVManagemntPersonalStatement,
  CVManagemntSection,
} from "./CVManagement.styles";
import { Form } from "../../globals/styles/forms.styles";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useToast from "../../hooks/useToastify";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import Button from "../../components/Button/Button";
import { useMediaQuery } from "react-responsive";
import {
  get_jobseerker_profile,
  updateCvApi,
} from "../../redux/api/authentication.api";
import Preloader from "../../components/Preloader/Preloader";
import { getUser, isCorrectUrl } from "../../utils/extraFunction";

const schema = yup.object({
  personal_statement: yup.string().required(),
  phone_number: yup.string().required(),
  first_name: yup.string().required(),
  middle_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  addresse: yup.string().required(),
  city: yup.string().required(),

  state: yup.string().required(),
  country_of_residence: yup.string(),
  linkdin: yup.string(),
  twitter: yup.string(),
  education: yup.array().of(
    yup.object({
      degree_type: yup.string(),
      school_name: yup.string(),
      start_year: yup.string(),
      end_year: yup.string(),
      course_of_study: yup.string(),
    })
  ),
  experience: yup.array().of(
    yup.object({
      company: yup.string(),
      start_year: yup.string(),
      end_year: yup.string(),
      role: yup.string(),
      responsibilities: yup.string(),
    })
  ),
  certification: yup.array().of(
    yup.object({
      certification: yup.string(),
      issuer: yup.string(),
      start_year: yup.string(),
    })
  ),
  refrences: yup.array().of(
    yup.object({
      full_name: yup.string(),
      relationship: yup.string(),
      email: yup.string(),
      phone_number: yup.string(),
    })
  ),
});
export type CvManagementFormType = yup.InferType<typeof schema>;
const CVManagement = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const go = useNavigate();
  const { notify } = useToast();
  const user = getUser()
  const isBigScreen = useMediaQuery({
    query: "(min-width: 500px)",
  });

  const { isLoading: loadingcv, data: mydata } = useQuery(
    "mycv",
    get_jobseerker_profile
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CvManagementFormType>({
    //@ts-ignore
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useMutation(updateCvApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("mycv");
      let job = searchParams.get("job");
      // console.log({ job });
      notify("Update Success", "success");
      if (job) {
        go(`/job_detail/${job}`);
      }
    },
    onError: (err: any) => {
      notify("Update failed, something went wrong", "error");
      console.log({ "server eroor": err });
    },
  });

  const {
    fields: education__fields,
    append: education__append,
    remove: education__remove,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: experience__fields,
    append: experience__append,
    remove: experience__remove,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: certification__fields,
    append: certification__append,
    remove: certification__remove,
  } = useFieldArray({
    control,
    name: "certification",
  });

  const {
    fields: refrences__fields,
    append: refrences__append,
    remove: refrences__remove,
  } = useFieldArray({
    control,
    name: "refrences",
  });

  const onSubmit = (data: CvManagementFormType) => {
    // console.log({ "form submission": data });
    
    // if(!isCorrectUrl(data.linkdin) ){
    //   return notify('Please enter correct linkdin url','error')
    // }
    // if(!isCorrectUrl(data.twitter) ){
    //   return notify('Please enter correct twitter url','error')
    // }
    mutate(data);
  };

  useEffect(() => {
    const cvstructure = mydata?.user_extra.job_seakers;
    if (mydata) {
      setValue("phone_number", mydata.phone_number);
    }
    console.log({cvstructure})
    if (cvstructure) {
      setValue("personal_statement", cvstructure.cvStucture.personal_statement);
      if(cvstructure.cvStucture.first_name.length !==1){
      setValue("first_name", cvstructure.cvStucture.first_name);
      }else{
        setValue("first_name", user?.full_name??'');
      }


      
      setValue("middle_name", cvstructure.cvStucture.middle_name);
      setValue("last_name", cvstructure.cvStucture.last_name);
      if(cvstructure.cvStucture.email.length !==1){
        setValue("email", cvstructure.cvStucture.email);
        }else{
          setValue("email", user?.email??'');
        }

      setValue("city", cvstructure.cvStucture.addresse);
      setValue("state", cvstructure.cvStucture.state);
      setValue(
        "country_of_residence",
        cvstructure.cvStucture.country_of_residence
      );

      setValue("linkdin", cvstructure.cvStucture.linkdin);
      setValue("twitter", cvstructure.cvStucture.twitter);
      setValue("education", cvstructure.cvStucture.education);
      setValue("experience", cvstructure.cvStucture.experience);
      setValue("certification", cvstructure.cvStucture.certificaton);
      setValue("refrences", cvstructure.cvStucture.refrences);
      setValue("addresse", cvstructure.cvStucture.addresse);

      // 
      // setValue("email", user.email);
   
    } else {
      setValue("linkdin", "NiL");
      setValue("twitter", "NiL");
     
    }
  }, [mydata, setValue]);
  return (
    <>
      <CVManagemntContainer>
        <Preloader loading={isLoading || loadingcv} />
        <CVManagementHeader>
          <h1>My CV</h1>

          <button>
            <label htmlFor={"upload-cv-instead"}>Upload Instead</label>
            <input
              onChange={(e) => {}}
              style={{ display: "none" }}
              type="file"
              name="upload-cv-instead"
              id="upload-cv-instead"
            />
          </button>
          {/* onSubmit={handleSubmit(onSubmit)} */}
        </CVManagementHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CVManagemntPersonalStatement>
            <InputWithLabel
              isTextArea={true}
              register={register("personal_statement")}
              label={"Personal Statement"}
            />
          </CVManagemntPersonalStatement>
          {/* Personal info */}
          <CVManagemntFormContainer>
            {/* <SelectWithLabel 
                      label="CV Template"
                      options={[
                        {'label':'Template 1','value':'Template 1'},
                        {'label':'Template 1','value':'Template 1'},
                        {'label':'Template 1','value':'Template 1'},
                        {'label':'Template 1','value':'Template 1'},
                      ]}
                      setValue={setValue}
                      name={''}
                      /> */}
            <InputWithLabel
              label="First Name"
              register={register("first_name")}
            />

            <InputWithLabel
              label="Middle Name"
              register={register("middle_name")}
            />

            <InputWithLabel
              label={"Last Name"}
              register={register("last_name")}
            />

            <InputWithLabel
              label={"Phone Number"}
              register={register("phone_number")}
            />
            <InputWithLabel label={"Email"} register={register("email")} />
            <InputWithLabel label={"Address"} register={register("addresse")} />

            <InputWithLabel label={"City"} register={register("city")} />
            <InputWithLabel label={"State"} register={register("state")} />

            <InputWithLabel
              label={"Country of Residence"}
              register={register("country_of_residence")}
            />

            <InputWithLabel label="linkedin" register={register("linkdin")} />
            <InputWithLabel label="Twitter" register={register("twitter")} />

            {/* Sections  */}
          </CVManagemntFormContainer>
          {/* Personal info */}
          {/* Education info  */}
          <CVManagemntSection>
            <h2>Education</h2>
            {education__fields.map((field, index) => (
              <div key={field.id}>
                <InputWithLabel
                  label="School Name"
                  register={register(`education.${index}.school_name`)}
                  errorMessage={errors.education?.[index]?.school_name?.message}
                />
                <InputWithLabel
                  label="Start Year"
                  register={register(`education.${index}.start_year`)}
                  errorMessage={errors.education?.[index]?.start_year?.message}
                  placeholder={"Start Year"}
                  //  min="1900"
                  //  max="2099"
                />

                <InputWithLabel
                  label="End Year"
                  register={register(`education.${index}.end_year`)}
                  errorMessage={errors.education?.[index]?.end_year?.message}
                  placeholder={"End Year"}
                  //  min="1900"
                  //  max="2099"
                />

                <InputWithLabel
                  label="Course of Study"
                  register={register(`education.${index}.course_of_study`)}
                  errorMessage={
                    errors.education?.[index]?.course_of_study?.message
                  }
                  placeholder={"Course of Study"}
                />

                <InputWithLabel
                  label="Type of Degree"
                  register={register(`education.${index}.degree_type`)}
                  errorMessage={errors.education?.[index]?.degree_type?.message}
                  placeholder={"Type of Degree"}
                />

                {/* <FormSelect>
                          <label>Type of Degree</label>
                          <select name="degree">
                            <option value="1">Degree 1</option>
                            <option value="2">Degree 2</option>
                            <option value="3">Degree 3</option>
                          </select>
                        </FormSelect> */}
                <Button
                  styleType="danger"
                  style={{ padding: ".8rem", alignSelf: "center" }}
                  onClick={(e) => {
                    education__remove(index);
                  }}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
            <button
              onClick={(e) => {
                e.preventDefault();
                education__append({
                  start_year: "1990",
                  end_year: "2333",
                  school_name: "ffc",
                  degree_type: "HND",
                  course_of_study: "hello world",
                });
              }}
            >
              <AddCircleIcon />
            </button>
          </CVManagemntSection>{" "}
          {/* edn of  Education info  */}
          {/* ============================================= */}
          {/* Work Experience  */}
          <CVManagemntSection>
            <h2>Experience</h2>
            {experience__fields.map((field, index) => (
              <div key={field.id}>
                <InputWithLabel
                  label="Company"
                  placeholder="Company"
                  register={register(`experience.${index}.company`)}
                />
                <InputWithLabel
                  label="Start Year"
                  placeholder="start_year"
                  register={register(`experience.${index}.start_year`)}
                />

                <InputWithLabel
                  label="End Year"
                  placeholder="End Year"
                  register={register(`experience.${index}.end_year`)}
                />

                <InputWithLabel
                  label="Role"
                  placeholder="managing director"
                  register={register(`experience.${index}.role`)}
                />

                <InputWithLabel
                  label="Responsibilities"
                  placeholder="Responsibilities"
                  register={register(`experience.${index}.responsibilities`)}
                />

                <Button
                  styleType="danger"
                  style={{ padding: ".8rem", alignSelf: "center" }}
                  onClick={(e) => {
                    experience__remove(index);
                  }}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
            <button
              onClick={(e) => {
                e.preventDefault();

                experience__append({
                  company: "tomation",
                  start_year: "1991",
                  end_year: "2039",
                  role: "managing director",
                  responsibilities: "directed humans",
                });
              }}
            >
              <AddCircleIcon />
            </button>
          </CVManagemntSection>{" "}
          {/* end of  wrok experience info  */}
          {/* ============================================= */}
          {/* Certification  */}
          <CVManagemntSection>
            <h2>Certificaton</h2>
            {certification__fields.map((fields, index) => (
              <div key={fields.id}>
                <InputWithLabel
                  label="Certification"
                  placeholder="Certification"
                  register={register(`certification.${index}.certification`)}
                />

                <InputWithLabel
                  label="Year"
                  placeholder="Year"
                  register={register(`certification.${index}.start_year`)}
                />
                <InputWithLabel
                  label="Issuer"
                  placeholder="issuer"
                  register={register(`certification.${index}.issuer`)}
                />

                <Button
                  styleType="danger"
                  style={{ padding: ".8rem", alignSelf: "center" }}
                  onClick={(e) => {
                    certification__remove(index);
                  }}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}

            <button
              onClick={(e) => {
                e.preventDefault();

                certification__append({
                  certification: "HND",
                  issuer: "You Collegde",
                  start_year: "19191",
                });
              }}
            >
              <AddCircleIcon />
            </button>
          </CVManagemntSection>{" "}
          {/* end of  wrok certifications info  */}
          {/* ============================================= */}
          {/* Referencess  */}
          <CVManagemntSection>
            <h2>References</h2>

            {refrences__fields.map((field, index) => (
              <div key={field.id}>
                <InputWithLabel
                  label="Full Name"
                  placeholder="John Doe"
                  register={register(`refrences.${index}.full_name`)}
                />

                <InputWithLabel
                  label="Relationship"
                  placeholder="Relationship"
                  register={register(`refrences.${index}.relationship`)}
                />

                <InputWithLabel
                  label="Email"
                  placeholder="john@gmail.com"
                  register={register(`refrences.${index}.email`)}
                />
                <InputWithLabel
                  label="Phone Number"
                  placeholder="john@gmail.com"
                  register={register(`refrences.${index}.phone_number`)}
                />

                <Button
                  styleType="danger"
                  style={{ padding: ".8rem", alignSelf: "center" }}
                  onClick={(e) => {
                    refrences__remove(index);
                  }}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}

            <button
              onClick={(e) => {
                e.preventDefault();
                refrences__append({
                  full_name: "John Mary",
                  relationship: "..",
                  email: "mary.doe@gmail.com",
                  phone_number: "081620398448",
                });
              }}
            >
              <AddCircleIcon />
            </button>
          </CVManagemntSection>
          <br />
          <Button
            style={
              isBigScreen
                ? {
                    width: "200px",
                    margin: "40px auto",
                  }
                : { width: "100%", margin: "40px auto" }
            }
            type="submit"
          >
            Update
          </Button>
        </Form>
      </CVManagemntContainer>
    </>
  );
};

export default CVManagement;
