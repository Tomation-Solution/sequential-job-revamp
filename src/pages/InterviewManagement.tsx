import Greetings from "../components/Greetings/Greetings"



const InterviewManagementCompletion= ():React.ReactElement=>{
    return (
        <div style={{'display':'flex','alignItems':'center',
        'justifyContent':'center','flexDirection':'column',
        'height':'80vh',}}>
        <Greetings
        title="Acceptance Letter Sent"
        body="You will be reached out to as soon as soon as your test has been reviewed."
         onClick={(e)=>{}}
         buttonName='Go Home'
         />
        </div>
    )
}

export default InterviewManagementCompletion