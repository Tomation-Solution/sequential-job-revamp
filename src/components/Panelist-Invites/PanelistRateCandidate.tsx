import { useEffect, useState } from "react";
import Dropdown from "../../globals/Dropdown/Dropdown";
import { FlexBox } from "../../globals/styles/FlexBox";
import { FormInput } from "../../globals/styles/forms.styles";
import { SetRatingCandidateMoreBtn } from "../Company-Interview-Management/CompanyInterviewManagement.styles";
import { CompanyJobTestManagementContainer } from "../Company-Job-Test-Management/CompanyJobTestManagement.styles";


import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation } from "react-query";
import { get_rating_sheet, rating_job_seekers} from "../../redux/api/panelist/panelist-interview-management.api";
import useToast from "../../hooks/useToastify";
import Preloader from "../Preloader/Preloader";
import Button from "../Button/Button";


type Props = {
  jobId: any;
  userType: "company" | "panelist";
};

// export type rating_job_seekersProp = {
//   "job":number,
//   "job_applicant":number,
//   "rating_sheet":
//       {
//           "value":string,
//           "cut_off":string,
//           "score":number
//       }[],
//   "interviewer_remark":string,
//   "summary_of_qualification":string
// }
const schema = yup.object({
  'job':yup.number().required(),
  'job_applicant':yup.number().required(),
  'rating_sheet':yup.array().of(yup.object().shape({
      'value':yup.string().required(),
      'cut_off':yup.string().required(),
      'score':yup.number().required(),
  })).required(),
  'interviewer_remark':yup.string().required(),
  'summary_of_qualification':yup.string().required(),
})
export type rating_job_seekersProp = yup.InferType<typeof schema>


function PanelistRateCandidate({ jobId, userType }: Props) {
  const {notify} = useToast()
  const [selectedCandidate, setSelectedCandidate] = useState("");


  const { register,control, handleSubmit, setValue,formState: { errors } } = useForm<rating_job_seekersProp>({
    resolver: yupResolver(schema),
    defaultValues:{
        'rating_sheet':[]
    },
    mode: "onBlur"
  });


  
  const { fields:rating_fields, append, remove} = useFieldArray({
    name:'rating_sheet',control
  })



  const calculate_percentageRating = (rating_sheet:{cut_off:number;id:string;score: number;value: string}[]):number=>{
    // Score Obtainable aka CutOFf
    const score_obtainable:number = rating_sheet.reduce((total,currentValue)=>{

        return total + currentValue.cut_off
    },0)

    const score_obtained:number = rating_sheet.reduce((total,currentValue)=>{
       let score =0
        if(currentValue.score){
            score = currentValue.score
        }
        return total + score
    },0)
    return (score_obtained / score_obtainable) *100
  }

  const {mutate,isLoading,data:rating_sheet} = useMutation(get_rating_sheet,{
    'onSuccess':(data)=>{
        notify('Rating Sheet Gotten Successfully','success')
    },
    'onError':(err:any)=>{
        notify('Check your network and refresh','error')
    }
})
useEffect(()=>{
  let candidate_id = window.localStorage.getItem('job_applicant_id')
  if(candidate_id){
    JSON.parse(candidate_id)
  }

  if(typeof candidate_id =='string'){
      setValue('job',parseInt(jobId))
      setValue('job_applicant',parseInt(candidate_id))
      mutate({
          'job_id':parseInt(jobId),'job_applicant':parseInt(candidate_id)
      })
  }

  setValue('summary_of_qualification','..')
},[])

  useEffect(()=>{

    if(rating_sheet){
        setValue('rating_sheet',rating_sheet.rating_sheet.map((data,index)=>{
            return {
                'value':data.name||data.value as string,
                'cut_off':data.cut_off.toString(),
                'score':data.score?data.score:0
            }
        }))

        setValue('interviewer_remark',rating_sheet.interviewer_remark)
        setValue('summary_of_qualification',rating_sheet.summary_of_qualification)
    }

},[rating_sheet])


const {isLoading:submitting,data:rating_sheet_response_for_submmission,mutate:handleSubmission} = useMutation(rating_job_seekers,{
  'onSuccess':(data)=>{
      console.log({'resp from subbmited data':data})
      notify('Updated Success','success')
  },
  'onError':(err)=>{
      console.log({'resp from subbmited err':err})
  }
})

const onSubmit = (data: rating_job_seekersProp) =>{
  // console.log({'Data Submited':data})
  handleSubmission(data)
}
  return (
    <>
    <Preloader  loading={isLoading||submitting}/>
    <form
     onSubmit={handleSubmit(onSubmit)}
     >

      <CompanyJobTestManagementContainer>
        <FlexBox justifyContent="space-between">
          <h2>Rate Candidates</h2>

          <Dropdown
            disabledOption="Select Candidate"
            options={[{ label: "Select Candidate", value: "" }]}
            onChange={setSelectedCandidate}
            defaultValue={selectedCandidate}
          />
        </FlexBox>

        <main style={{'padding':'2rem 0'}}>
          <div className="left">
            <FlexBox justifyContent="space-between">
              <h3>Tomiwa Something</h3>

              <h3>
                <a href="/">See CV</a>
              </h3>
            </FlexBox>

            <SetRatingCandidateMoreBtn>
              <div className="flexed">
                {
                  rating_fields.map((data,index)=>(
                    <div style={{'display':'flex','alignItems':'center','gap':'10px','flexWrap':'wrap'}}>

                      <input type="text" value={data.value} disabled  />
      
                      <input type="text" 
                      placeholder={`/${data.cut_off}`}
                      {...register(`rating_sheet.${index}.score`)}
                      />
                    </div>
                  ))
                }
              </div>
            </SetRatingCandidateMoreBtn>
          </div>

          <div className="right">
            <h3>Remark</h3>

            <FormInput
              style={{
                width: "100%",
              }}
            >
              <textarea
              {...register('interviewer_remark')}
              placeholder="type your remarks here" />
            </FormInput>
          </div>
          <br />
        </main>
        <br />

        {
          userType ==='panelist'?
          <Button
          type="submit"
          style={{'width':'20%','margin':'0 auto'}}>Submit</Button>
        :''
        }
      </CompanyJobTestManagementContainer>
    </form>

    </>
  );
}

export default PanelistRateCandidate;
