import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import JobCard from "../../components/JobCard/JobCard";
import Preloader from "../../components/Preloader/Preloader";
import useToast from "../../hooks/useToastify";
import { get_jobs_api } from "../../redux/api/jobs.api";
import { JobListContainer } from "./JobList.style";

const JobList = (): React.ReactElement => {
  const { notify } = useToast();
  const go = useNavigate();
  const { data, isLoading } = useQuery(
    "jobs",
    () => get_jobs_api({ is_active: true }),
    {
      retry: 1,
      onError: (err: any) => {
        if (err.response.data?.error) {
          let error: any = err.response.data.error;
          if (error.cv) {
            notify("You need to upload your cv", "error");
            // notify('Please Hold we would take you to upload your cv','success')
            go("/cvmanagement");
          }
        }
      },
    }
  );
  console.log(data);
  return (
    <JobListContainer>
      <Preloader loading={isLoading} />
      {data?.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </JobListContainer>
  );
};

export default JobList;
