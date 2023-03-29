import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {FaTrash} from 'react-icons/fa'
import {
  CVManagementHeader,
  CVManagemntContainer,
  CVManagemntFormContainer,
  CVManagemntPersonalStatement,
  CVManagemntSection,
} from "./CVManagement.styles";
import { Form, FormInput, FormSelect } from "../../globals/styles/forms.styles";
import { useForm ,useFieldArray} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import useToast from "../../hooks/useToastify";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import SelectWithLabel from "../../components/SelectWithLabel/SelectWithLabel";
import Button from "../../components/Button/Button";


const schema = yup.object({
  personal_statement:yup.string().required(),
  phone_number:yup.string().required(),
  first_name:yup.string().required(),
  middle_name:yup.string().required(),
  last_name:yup.string().required(),
  email:yup.string().email().required(),
  addresse:yup.string().required(),
  city:yup.string().required(),

  state:yup.string().required(),
  country_of_residence:yup.string().required(),
  linkdin:yup.string().required(),
  twitter:yup.string().required(),
  education:yup.array().of(yup.object({
    degree_type:yup.string(),
    school_name:yup.string(),
    start_year:yup.string(),
    end_year:yup.string(),
    course_of_study:yup.string(),
  })),
  experience:yup.array().of(yup.object({
    company:yup.string(),
    start_year:yup.string(),
    end_year:yup.string(),
    role:yup.string(),
    responsibilities:yup.string(),
  })),
  certification:yup.array().of(yup.object({
    certification:yup.string(),
    issuer:yup.string(),
    start_year:yup.string(),
  })),
  refrences:yup.array().of(yup.object({
    full_name:yup.string(),
    relationship:yup.string(),
    email:yup.string(),
    phone_number:yup.string(),
  }))


})
type CvManagementFormType =yup.InferType<typeof schema>;
const CVManagement = () => {
  const {notify} = useToast()


  const { register, handleSubmit,control, setValue,formState: { errors } } = useForm<CvManagementFormType>({
    resolver: yupResolver(schema)
  });


  const { fields:education__fields, append:education__append,remove:education__remove } = useFieldArray({
    control,
    name: "education", 
  });

  const { fields:experience__fields, append:experience__append,remove:experience__remove } = useFieldArray({
    control,
    name: "experience", 
  });


  const { fields:certification__fields, append:certification__append,remove:certification__remove } = useFieldArray({
    control,
    name: "certification", 
  });


  const { fields:refrences__fields, append:refrences__append,remove:refrences__remove } = useFieldArray({
    control,
    name: "refrences", 
  });


  const onSubmit = (data: CvManagementFormType) =>{
    console.log({'form submission':data});
  } 
  
  return (
    <>
      <CVManagemntContainer>
        <CVManagementHeader>
          <h1>My CV</h1>

          <button>
            <span>Upload Instead</span>
          </button>
          {/* onSubmit={handleSubmit(onSubmit)} */}
        </CVManagementHeader>
          <Form>
            <CVManagemntPersonalStatement>
                    <p>Personal Statement</p>
                    <textarea placeholder="Write your personal statement here" />
                  </CVManagemntPersonalStatement>
                  {/* Personal info */}
                  <CVManagemntFormContainer>
                    <FormSelect>
                      <label>CV Template</label>
                      <select>
                        <option value="1">Template 1</option>
                        <option value="2">Template 2</option>
                        <option value="3">Template 3</option>
                      </select>
                    </FormSelect>

                    <FormInput>
                      <label>First Name</label>
                      <input type="text" placeholder="First Name" />
                    </FormInput>

                    <FormInput>
                      <label>Middle Name</label>
                      <input type="text" placeholder="Middle Name" />
                    </FormInput>

                    <FormInput>
                      <label>Last Name</label>
                      <input type="text" placeholder="Last Name" />
                    </FormInput>

                    <FormInput>
                      <label>Phone Number</label>
                      <input type="text" placeholder="Phone Number" />
                    </FormInput>

                    <FormInput>
                      <label>Email</label>
                      <input type="text" placeholder="Email" />
                    </FormInput>

                    <FormInput>
                      <label>Address</label>
                      <input type="text" placeholder="Address" />
                    </FormInput>

                    <FormInput>
                      <label>City</label>
                      <input type="text" placeholder="City" />
                    </FormInput>

                    <FormInput>
                      <label>State</label>
                      <input type="text" placeholder="State" />
                    </FormInput>

                    <FormSelect>
                      <label>Country of Residence</label>
                      <select>
                        <option value="1">Country 1</option>
                        <option value="2">Country 2</option>
                        <option value="3">Country 3</option>
                      </select>
                    </FormSelect>

                    <FormInput>
                      <label>LinkedIn</label>
                      <input type="text" placeholder="LinkedIn" />
                    </FormInput>

                    <FormInput>
                      <label>Twitter</label>
                      <input type="text" placeholder="Twitter" />
                    </FormInput>

                    {/* Sections  */}
                  </CVManagemntFormContainer>
                  {/* Personal info */}
                  {/* Education info  */}
                  <CVManagemntSection>
                    <h2>Education</h2>
                    {
                      education__fields.map((field,index)=>(
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
                         placeholder={'Start Year'}
                        //  min="1900"
                        //  max="2099"
                         />
                        
                        <InputWithLabel 
                          label="End Year"
                          register={register(`education.${index}.end_year`)}
                         errorMessage={errors.education?.[index]?.end_year?.message}
                         placeholder={'End Year'}
                        //  min="1900"
                        //  max="2099"
                         />
                        <SelectWithLabel
                          label='Course of Study'
                          options={[
                            {label:'Course 1',value:'Course 1'},
                            {label:'Course 2',value:'Course 1'},
                            {label:'Course 3',value:'Course 3'},
                          ]}
                        setValue={setValue}
                        name={`education.${index}.course_of_study`}
                        />
                       
                        <SelectWithLabel
                        label="Type of Degree"
                        options={[
                          {label:'HND',value:'HND'},
                          {label:'BSC',value:'BSC'},
                          {label:'SSCE',value:'SSCE'},
                        ]}
                        setValue={setValue}
                        name={`education.${index}.degree_type`}
                        />
                        {/* <FormSelect>
                          <label>Type of Degree</label>
                          <select name="degree">
                            <option value="1">Degree 1</option>
                            <option value="2">Degree 2</option>
                            <option value="3">Degree 3</option>
                          </select>
                        </FormSelect> */}
                        <Button styleType="danger"
                        style={{'padding':'.8rem','alignSelf':'center'}}
                        onClick={e=>{
                          education__remove(index)
                        }}
                        >
                          <FaTrash />
                        </Button>
                      </div>

                      ))
                    }
                    <button  onClick={e=>{
                      e.preventDefault()
                      education__append({
                        'start_year':'1990',
                        'end_year':'2333',
                        'school_name':'ffc',
                        'degree_type':'HND',
                        'course_of_study':'hello world'
                      })
                    }}>
                      <AddCircleIcon />
                    </button>
                  </CVManagemntSection>{" "}
                  {/* edn of  Education info  */}
                  {/* ============================================= */}
                  {/* Work Experience  */}
                  <CVManagemntSection>
                    <h2>Experience</h2>
                    {
                      experience__fields.map((field,index)=>(
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
                      </div>
                      ))
                    }
                    <button onClick={e=>{
                      e.preventDefault()

                      experience__append({
                        company:'tomation',
                        start_year:'1991',
                        end_year:'2039',
                        role:'managing director',
                        responsibilities:'directed humans',
                      })
                    }}>
                      <AddCircleIcon />
                    </button>
                  </CVManagemntSection>{" "}
                  {/* end of  wrok experience info  */}
                  {/* ============================================= */}
                  {/* Certification  */}
                  <CVManagemntSection>
                    <h2>Certificaton</h2>
                    {
                      certification__fields.map((fields,index)=>(
                      <div key={fields.id}>
                        <InputWithLabel 
                        label="Certification"
                        placeholder="Certification"
                        register={register(`certification.${index}.certification`)}
                        />

                        <InputWithLabel 
                        label="Issuer"
                        placeholder="issuer"
                        register={register(`certification.${index}.issuer`)}
                        />
                        <InputWithLabel 
                        label="Issuer"
                        placeholder="issuer"
                        register={register(`certification.${index}.issuer`)}
                        />
                      </div>
                      ))
                    }
                    
                    <button onClick={e=>{
                      e.preventDefault()

                      certification__append({
                        certification:'HND',
                        issuer:'You Collegde',
                        start_year:'19191',
                      })
                    }}>
                      <AddCircleIcon />
                    </button>
                  </CVManagemntSection>{" "}
                  {/* end of  wrok certifications info  */}
                  {/* ============================================= */}
                  {/* Referencess  */}
                  <CVManagemntSection>
                    <h2>Refrences</h2>

                    {
                      refrences__fields.map((field,index)=>(
                      <div key={field.id}>
                        <InputWithLabel
                          label="Full Name"
                          placeholder="John Doe"
                          register={register(`refrences.${index}.full_name`)}
                        />

<SelectWithLabel
  label="Relationship"
  setValue={setValue}
  name={`refrences.${index}.relationship`}
  options={[
    {'label':'Relationship1','value':'Relationship1'},
    {'label':'Relationship2','value':'Relationship2'},
    {'label':'Relationship3','value':'Relationship3'},
    {'label':'Relationship4','value':'Relationship4'},
  ]}
/>
  <InputWithLabel
  label="Email"
  placeholder="john@gmail.com"
  register={register(`refrences.${index}.relationship`)}
  />    
    <InputWithLabel
  label="Phone Number"
  placeholder="john@gmail.com"
  register={register(`refrences.${index}.phone_number`)}
  />       

                     
                      </div>
                      ))
                    }
                    
                    <button onClick={e=>{
                      e.preventDefault()
                      refrences__append({
                        full_name:'John Mary',
                        relationship:'..',
                        email:'mary.doe@gmail.com',
                        phone_number:'081620398448',
                      })
                    }}>
                      <AddCircleIcon />
                    </button>
                  </CVManagemntSection>
            </Form>
      </CVManagemntContainer>
    </>
  );
};

export default CVManagement;
