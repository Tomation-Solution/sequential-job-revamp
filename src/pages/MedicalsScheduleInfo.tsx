
import styled from "styled-components";
import Button from "../components/Button/Button";
import TopSummaryBox from "../components/TopSummaryBox/TopSummaryBox";

const MedicalsScheduleInfoContainer= styled.div`
    padding: 1rem;
    color: #000022;
    text-align: center;
    max-width: 360px;
    display: block;

    h2{
        font-size: 1.5rem;
    }
    p{
        padding: 1rem 0;
    }
    @media screen and (min-width: 500px) {
        h2{font-size:2rem}
    }
`
export const MedicalsScheduleInfo = ():React.ReactElement=>{
    return (
       <div style={{'display':'flex','alignItems':'center',
       'justifyContent':'center','flexDirection':'column',
       'height':'80vh',}}>
         <MedicalsScheduleInfoContainer> 
            <img src="" alt="" /> 
            <h2>Interview Scheduled</h2>
            <p>A link to the interview has <br /> been sent to your email</p>
            <Button style={{'width':'200px','margin':'0 auto'}}>Go Home</Button>
        </MedicalsScheduleInfoContainer>
       </div>
    )
}

export default MedicalsScheduleInfo