import { JobCardContainer } from "./JobCard.style"
import {FaMoneyBillWave} from 'react-icons/fa'
import {IoBagSharp,IoSend} from 'react-icons/io5'
import {BsHeart} from 'react-icons/bs'
import {BsHeartFill} from 'react-icons/bs'


const JobCard = ():React.ReactElement=>{
    return (
        <JobCardContainer>
        <div style={{'display':'flex','justifyContent':'space-between','alignItems':'center'}}>
            <h2>
            Business Developer
            </h2>
            <BsHeartFill/>
        </div>
        <h3><strong>ABC Limited</strong></h3>
        <p>Lagos, Nigeria</p>
      <div style={{'display':'flex','justifyContent':'space-between','alignItems':'center','width':'270px','margin':'.7rem 0'}}>
      <span>
        <IoBagSharp />
        {' '}
        Full-time
        </span>
        <span>
           <FaMoneyBillWave/>$97,000/year
        </span>
      </div>
        <p><IoSend/>{' '} Apply from your phone</p>
        <p><IoSend/>{' '} Hiring Multiple candidates</p>
    </JobCardContainer>
    )
}

export default JobCard