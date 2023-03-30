import { useNavigate, useParams } from "react-router-dom"
import Greetings from "../components/Greetings/Greetings"




const JobQuetionInfo = ():React.ReactElement=>{
    const {jobid} = useParams()
    const navigate = useNavigate()
    return (
        <div style={{'display':'flex','alignItems':'center',
        'justifyContent':'center','flexDirection':'column',
        'height':'80vh',}}>
        <Greetings
        title="Application Received"
        body="You are required to anwser some few Quetions."
         onClick={(e)=>{
            navigate(`/filter_quetions/${jobid}/`)
         }}
         buttonName='Proceed'
         />
        </div>
    )
}

export default JobQuetionInfo