import { useParams } from "react-router-dom";
import ApplyForJobProccess from "../../components/ApplyForJobProccess/ApplyForJobProccess";
import JobDetailComponent from "../../components/JobDetailComponent/JobDetailComponent";
import { JobDetailStyle } from "./JobDetail.style";

const JobDetail = (): React.ReactElement => {
  const { id } = useParams();
  return (
    <JobDetailStyle>
      <div style={{ 
        // maxWidth: "700px"
        'width':'50%'
         }}>
        <JobDetailComponent />
      </div>
      {id ? <ApplyForJobProccess job_id={id} /> : ""}
    </JobDetailStyle>
  );
};

export default JobDetail;
