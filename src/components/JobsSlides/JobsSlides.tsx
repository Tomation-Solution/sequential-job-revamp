import React, { useEffect } from "react";
import {
  JobBtn,
  JobBtnCon,
  JobsSlidesContainer,
  JobsUploadCon,
  JobTakeTestContainer,
  JobTestExtra,
} from "./JobsSlides.styles";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Button from "../Button/Button";
import JobsUploadComponent from "../JobsUploadComponent/JobsUploadComponent";
import { useMutation, useQuery } from "react-query";
import { get_required_job_docs, submitDocsApi } from "../../redux/api/documentManagement.api";
import Preloader from "../Preloader/Preloader";
import { useForm ,useFieldArray} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useToast from "../../hooks/useToastify";
export const JobsAcceptSlides = () => {
  return (
    <JobsSlidesContainer>
      <h1>Congrats</h1>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
        blanditiis consequatur mollitia, excepturi amet, accusamus dolores
        facere harum similique voluptates soluta voluptatum praesentium
        nesciunt, sed labore quae voluptate placeat deleniti. Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Aspernatur blanditiis consequatur
        mollitia, excepturi amet, accusamus dolores facere harum similique
        voluptates soluta voluptatum praesentium nesciunt, sed labore quae
        voluptate placeat deleniti.
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
        blanditiis consequatur mollitia, excepturi amet, accusamus dolores
        facere harum similique voluptates soluta voluptatum praesentium
        nesciunt, sed labore quae voluptate placeat deleniti. Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Aspernatur blanditiis consequatur
        mollitia, excepturi amet, accusamus dolores facere harum similique
        voluptates soluta voluptatum praesentium nesciunt, sed labore quae
        voluptate placeat deleniti.
      </p>

      <JobBtnCon>
        <JobBtn darken={true}>Accept Offer</JobBtn>
        <JobBtn>Decline Offer</JobBtn>
      </JobBtnCon>
    </JobsSlidesContainer>
  );
};

const schema = yup.object({
  upload_data:yup.array().of(yup.object({
    name:yup.string(),
    file:yup.mixed()
  }))
})
type JobsRejectSlidesFormType = yup.InferType<typeof schema>;

export const JobsRejectSlides = ({job_id}:{job_id:number}) => {
  const {notify} = useToast()
  const {isLoading,data} = useQuery(['job-doc',job_id],()=>get_required_job_docs(job_id),{
    refetchOnWindowFocus:false
  })
  const {mutate,isLoading:uploading} = useMutation(submitDocsApi,{
    'onSuccess':()=>{
      notify('Upload Success','success')
    },
    'onError':()=>{
      notify('Please check the file or your network','error')
    }
  })

  const { register, handleSubmit, setValue,control,formState: { errors } } = useForm<JobsRejectSlidesFormType>({
    resolver: yupResolver(schema)
  });

  const { fields,  prepend,} = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "upload_data", // unique name for your Field Array
  });
  useEffect(()=>{
    if(data){
      setValue('upload_data',data.map((d,index)=>({'name':d,'file':null})))
    }
  
  },[data])

  const onSubmit = (data: JobsRejectSlidesFormType) =>{
    console.log({data});
    // { name: "cv", file: File }
    const form = new FormData()
    data.upload_data?.map((d,index)=>{
      if (d.name){
        console.log(d.name,d.file)
        form.append(d.name,d.file)
      }
    })
    mutate({'data':form,job_id})

  } 
  return (
    <JobsSlidesContainer>
      <Preloader loading={isLoading||uploading} />
      <h1>Please, Upload the following documents for confirmation purpose</h1>
      <form
      onSubmit={handleSubmit(onSubmit)}
      >

      {fields?.map((field, index) => (
          <JobsUploadCon for={'JobsUploadCon'+field?.name} key={field.id}>
          <p>{field?.name}</p>
          <input type="file" id={'JobsUploadCon'+field?.name} onChange={e=>{
            if(e.target.files){
              console.log({index})
              setValue(`upload_data.${index}.file`,e.target.files[0] as any)
            }
          }}  />
          <AttachmentIcon />
        </JobsUploadCon>
      ))}
     <Button type="submit" style={{'margin':'0 auto'}}>
      Submit
     </Button>
    </form>

      {/* // <JobsUploadComponent key={index}/> */}
     
    </JobsSlidesContainer>
  );
};

export const JobsTakeTestSlides = () => {
  return (
    <JobTakeTestContainer>
    <h1>Business Developer</h1>
    <p>VI, Lagos</p>
    <span>Job details</span>
    <JobTestExtra>
      <span>Salary: $97,000/yr</span>
      <span>JobType: Remote</span>
    </JobTestExtra>

    <p>
      Congratulations , you have been scheduled for a test, please kindly
      take the test in due time in other toquicken the process
    </p>

    <JobBtnCon>
      <JobBtn darken={true}>Take Test</JobBtn>
    </JobBtnCon>
  </JobTakeTestContainer>
  );
};
