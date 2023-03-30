import React, { useEffect } from "react";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import useToast from "../../hooks/useToastify";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import SelectWithLabel from "../../components/SelectWithLabel/SelectWithLabel";
import Button from "../../components/Button/Button";
import { useMediaQuery } from 'react-responsive'
import { get_jobseerker_profile, updateCvApi } from "../../redux/api/authentication.api";
import Preloader from "../../components/Preloader/Preloader";

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
export type CvManagementFormType =yup.InferType<typeof schema>;
const CVManagement = () => {
  const queryClient = useQueryClient();

  const {notify} = useToast()
  const isBigScreen = useMediaQuery({
    query: '(min-width: 500px)'
  })

  const { isLoading:loadingcv,data:mydata } = useQuery('mycv',get_jobseerker_profile)


  const { register, handleSubmit,control, setValue,formState: { errors } } = useForm<CvManagementFormType>({
    resolver: yupResolver(schema)
  });


  const { mutate,isLoading} = useMutation(updateCvApi,{
    'onSuccess':(data)=>{
      console.log({'UpdateSuccess response':data})
      queryClient.invalidateQueries("mycv")

      notify('Update Success','success')
    },
    'onError':(err:any)=>{
      console.log({'server eroor':err})
    }
  })

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
    mutate(data)
  } 
  console.log({'form errors':errors})
  
  useEffect(()=>{
    console.log(mydata)
    const cvstructure = mydata?.user_extra.job_seakers
    if(mydata){
      setValue('phone_number',mydata.phone_number)

    }
    if(cvstructure){
      setValue('personal_statement',cvstructure.cvStucture.personal_statement)
      setValue('first_name',cvstructure.cvStucture.first_name)    
      setValue('middle_name',cvstructure.cvStucture.middle_name)    
      setValue('last_name',cvstructure.cvStucture.last_name)   
      setValue('email',cvstructure.cvStucture.email) 
      setValue('city',cvstructure.cvStucture.addresse) 
      setValue('state',cvstructure.cvStucture.state) 
      setValue('country_of_residence',cvstructure.cvStucture.country_of_residence) 
      setValue('linkdin',cvstructure.cvStucture.linkdin) 
      setValue('twitter',cvstructure.cvStucture.twitter) 
      setValue('education',cvstructure.cvStucture.education) 
      setValue('experience',cvstructure.cvStucture.experience) 
      setValue('certification',cvstructure.cvStucture.certificaton) 
      setValue('refrences',cvstructure.cvStucture.refrences) 
      setValue('addresse',cvstructure.cvStucture.addresse) 
    
    }
  },[mydata])
  return (
    <>
      <CVManagemntContainer>
    <Preloader loading={isLoading||loadingcv}/>
        <CVManagementHeader>
          <h1>My CV</h1>

          <button>
            <span>Upload Instead</span>
          </button>
          {/* onSubmit={handleSubmit(onSubmit)} */}
        </CVManagementHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
                  <CVManagemntPersonalStatement>
                          <InputWithLabel 
                          isTextArea={true}
                          register={register('personal_statement')}
                          label={'Personal Statement'}
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
                      register={register('first_name')}
                      />

                    <InputWithLabel
                    label="Middle Name"
                    register={register('middle_name')}
                    />


                    <InputWithLabel
                    label={'Last Name'}
                    register={register('last_name')}
                    />


                    <InputWithLabel
                    label={'Phone Number'}
                    register={register('phone_number')}
                    />
                    <InputWithLabel
                    label={'Email'}
                    register={register('email')}
                    />
                    <InputWithLabel
                    label={'Address'}
                    register={register('addresse')}
                    />
                    
                    <InputWithLabel
                    label={'City'}
                    register={register('city')}
                    />
                    <InputWithLabel
                    label={'State'}
                    register={register('state')}
                    />

                    <SelectWithLabel
                    setValue={setValue}
                    label={'Country of Residence'}
                    options={[
                      {'label':'lagos','value':'lagos'},
                      {'label':'Abuja','value':'Abuja'},
                    ]}
                    name={'country_of_residence'}
                    />
                    <InputWithLabel
                    label="linkedin"
                    register={register('linkdin')}
                    />
                    <InputWithLabel
                    label="Twitter"
                    register={register('twitter')}
                    />

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

<Button styleType="danger"
                        style={{'padding':'.8rem','alignSelf':'center'}}
                        onClick={e=>{
                         experience__remove(index)
                        }}
                        >
                          <FaTrash />
                        </Button>
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


                          <Button styleType="danger"
                          style={{'padding':'.8rem','alignSelf':'center'}}
                          onClick={e=>{
                          certification__remove(index)
                          }}
                          >
                          <FaTrash />
                          </Button>
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
  register={register(`refrences.${index}.email`)}
  />    
    <InputWithLabel
  label="Phone Number"
  placeholder="john@gmail.com"
  register={register(`refrences.${index}.phone_number`)}
  />       

                     
<Button styleType="danger"
                          style={{'padding':'.8rem','alignSelf':'center'}}
                          onClick={e=>{
                            refrences__remove(index)
                          }}
                          >
                          <FaTrash />
                          </Button>
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


                  <br />
              <Button 
              style={isBigScreen?{
                width:'200px',margin:'40px auto'
                
              }:{width:'100%',margin:'40px auto'}}
              type="submit">
                Update
              </Button>

            </Form>
      </CVManagemntContainer>
    </>
  );
};

export default CVManagement;
