import { useEffect, useState } from "react";
import Dropdown from "../../globals/Dropdown/Dropdown";
import CompanyNavBar, {
  CompanyNavBarTab,
} from "../Company-NavBar/CompanyNavBar";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";
import { CompanyInterviewManagementContainer } from "./CompanyInterviewManagement.styles";
import CompanyInterviewTab1 from "./CompanyInterviewTab1";
import CompanyInterviewTab2 from "./CompanyInterviewTab2";
import CompanyInterviewTab3 from "./CompanyInterviewTab3";
import CompanyInterviewTab4 from "./CompanyInterviewTab4";
import { useCustomFetcher } from "../../utils/fetcher";
import { getAllCompanyJobs } from "../../redux/api/company/jobs-test-management.api";
import EmptyState from "../EmptyState/EmptyState";
import { JobType } from "../Company-Job-Test-Management/types";
import moment from "moment";
import { CompanyCreateInterview } from "./Types";
import { useMutation } from "react-query";
import { companyCreateInterview } from "../../redux/api/company/interview-management.api";
import useToast from "../../hooks/useToastify";
import Preloader from "../Preloader/Preloader";
import { parseBackendError } from "../../utils/extraFunction";

function CompanyInterviewManagement() {
  const [dropdownOption, setDropdownOption] = useState<string>("");
  const [currentRender, setCurrentRender] = useState(1);

  const [companyInterviewManagement, setCompanyInterviewManagement] =
    useState<CompanyCreateInterview>({
      list_of_available_dates: [],
      list_of_available_time: [],
      rating_sheet: [],
      list_of_email: [],
      panelist_invitation_letter: "",
      interview_link: "",
    });

  const { loadingState, isError, data } = useCustomFetcher<JobType[]>(
    "all-jobs",
    getAllCompanyJobs,
    (data) =>
      data.data.map((item: any) => ({
        id: item.id,
        job_title: item.job_title,
        created_at: item.created_at,
      }))
  );

  const { notify } = useToast();

  // const interviewDetails = useQuery<CompanyGetInterview, any>(
  //   `interview-details-${dropdownOption}`,
  //   () => companyGetJobInterview(dropdownOption),
  //   {
  //     retry: false,
  //     refetchOnWindowFocus: false,
  //     //@ts-ignore
  //     select: (data) => data.data,
  //     onError: (error: any) => {
  //       if (error?.message?.request?.status === 404) {
  //         notify("no interview found for this job", error);
  //       } else {
  //         notify("Oops job interview not found", "error");
  //       }
  //     },
  //   }
  // );

  // useEffect(() => {
  //   if (interviewDetails?.data) {
  //     const { company, job, id, ...result } = interviewDetails.data;

  //     setCompanyInterviewManagement(result);
  //   } else {
  //     setCompanyInterviewManagement({
  //       list_of_available_dates: [],
  //       list_of_available_time: [],
  //       rating_sheet: [],
  //       list_of_email: [],
  //       panelist_invitation_letter: "",
  //       interview_link: "",
  //     });
  //   }
  // }, [interviewDetails.data, setCompanyInterviewManagement]);

  const { isLoading, mutate } = useMutation(companyCreateInterview, {
    onSuccess: () => {
      notify("interview successfully created", "success");
    },
    onError: (error: any) => {
      if (
        error?.message?.response?.data?.message === "Already has a interview"
      ) {
        notify("the selected job already has a interview setup", "error");
      } 
      if(error.message.response.data.error){
       notify( parseBackendError(error.message.response.data.error) as string ,'error')
      }
      else {
        notify("failed to create interview", "error");
      }
    },
  });

  const onCreateInterviewHandler = () => {
    if (dropdownOption === "" || !dropdownOption) {
      notify("please select a job", "error");
      return;
    }
    if (!companyInterviewManagement.interview_link) {
      notify("interview link is required", "error");
      return;
    }
    if (companyInterviewManagement.list_of_available_dates.length <= 0) {
      notify("interview schedule dates are required", "error");
      return;
    }
    if (companyInterviewManagement.list_of_available_time.length <= 0) {
      notify("interview schedule time is required", "error");
      return;
    }
    if (companyInterviewManagement.list_of_email.length <= 0) {
      notify("panelists are required", "error");
      return;
    }
    if (companyInterviewManagement.panelist_invitation_letter.length <= 0) {
      notify("panelist invitation letter is required", "error");
      return;
    }
    if (companyInterviewManagement.rating_sheet.length <= 0) {
      notify("rating scale is required", "error");
      return;
    }

    mutate({
      job_id: dropdownOption,
      ...companyInterviewManagement,
    });
  };

  if (loadingState) {
    return <EmptyState header="Fetching all Jobs" />;
  }

  if (isError || data?.length! <= 0 || !data) {
    return (
      <EmptyState
        header="Oops something went wrong"
        subHeader="No jobs requiring test were found, try uploading some or refreshing the page."
      />
    );
  }

  // if (
  //   interviewDetails.error?.message?.request?.status &&
  //   interviewDetails.error?.message?.request?.status !== 404
  // ) {
  //   return (
  //     <EmptyState
  //       header="Oops something went wrong"
  //       subHeader={`failed to get interview details for job ${
  //         data?.find((item) => item.id === Number(dropdownOption))?.job_title ||
  //         ""
  //       }, try refreshing the page`}
  //     />
  //   );
  // }

  return (
    <>
      {/* <Preloader loading={isLoading} /> */}
      <CompanyNavBar>
        <CompanyNavBarItemsContainer>
          <Dropdown
            disabledValue=""
            disabledOption="Select a Job"
            options={data.map((item) => ({
              label: `${item.job_title} // ${moment(
                new Date(item.created_at)
              ).format("MMM Do YY")}`,
              value: `${item.id}`,
            }))}
            onChange={setDropdownOption}
            defaultValue={dropdownOption}
          />

          <CompanyNavBarTab
            onClick={() => setCurrentRender(1)}
            isSelected={currentRender === 1}
          >
            <p>Set Intereview</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab
            onClick={() => setCurrentRender(2)}
            isSelected={currentRender === 2}
          >
            <p>Panelist Invitation</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab
            onClick={() => setCurrentRender(4)}
            isSelected={currentRender === 4}
          >
            <p>Set Rating Scale</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab
            onClick={() => setCurrentRender(3)}
            isSelected={currentRender === 3}
          >
            <p>Invite Applicants</p>
          </CompanyNavBarTab>
        </CompanyNavBarItemsContainer>
      </CompanyNavBar>

      <CompanyInterviewManagementContainer>
        <main>
          {currentRender === 1 ? (
            <CompanyInterviewTab1
              jobId={dropdownOption}
              state={companyInterviewManagement}
              nextPage={setCurrentRender}
              onStateChange={setCompanyInterviewManagement}
            />
          ) : null}
          {currentRender === 2 ? (
            <CompanyInterviewTab2
              jobId={dropdownOption}
              state={companyInterviewManagement}
              nextPage={setCurrentRender}
              onStateChange={setCompanyInterviewManagement}
            />
          ) : null}

          {currentRender === 3 ? (
            <CompanyInterviewTab3 jobId={dropdownOption} />
          ) : null}
          {currentRender === 4 ? (
            <CompanyInterviewTab4
              setInterviewToJobfn={onCreateInterviewHandler}
              jobId={dropdownOption}
              state={companyInterviewManagement}
              onStateChange={setCompanyInterviewManagement}
            />
          ) : null}
        </main>
      </CompanyInterviewManagementContainer>
    </>
  );
}

export default CompanyInterviewManagement;
