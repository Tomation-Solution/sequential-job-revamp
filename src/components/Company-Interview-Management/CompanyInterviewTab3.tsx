import moment from "moment";
import TableDataColored from "../../globals/styles/TableDataColored";
import EmptyState from "../EmptyState/EmptyState";
import Tables from "../Tables/Tables";
import {
  companyInterviewManagementFilterCandidatesByStatus,
  companyInterviewManagementFilterCandidatesByTest,
  companyInviteCandidateForInterview,
} from "../../redux/api/company/interview-management.api";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import Dropdown from "../../globals/Dropdown/Dropdown";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";
import { FlexBox } from "../../globals/styles/FlexBox";
import useToast from "../../hooks/useToastify";
import Preloader from "../Preloader/Preloader";

type Props = {
  jobId: any;
};

const CompanyInterviewTab3 = ({ jobId }: Props) => {
  const [filterStatus, setFilterStatus] = useState<
    "suitable" | "partially_suitable" | "not_suitable"
  >("suitable");
  const [data, setData] = useState([]);
  const [sortingFilter, setSortingFilter] = useState<
    "test_score_sorting" | "cv_score_sorting"
  >("cv_score_sorting");

  const { notify } = useToast();

  const { isLoading, mutate, isError } = useMutation(
    companyInterviewManagementFilterCandidatesByStatus,
    {
      onSuccess: (data) => {
        if (data?.data) {
          setData(data.data);
        } else {
          setData([]);
        }
      },
      onError: () => {
        notify("Oops something went wrong fetching candidates", "error");
      },
    }
  );

  const {
    isLoading: testFilteredCandidateLoading,
    mutate: testFilteredCandidateMutate,
  } = useMutation(companyInterviewManagementFilterCandidatesByTest, {
    onSuccess: (data) => {
      if (data?.data) {
        setData(data.data);
      } else {
        setData([]);
      }
    },
    onError: (error: any) => {
      setData([]);
      if (
        error?.message?.response?.data?.message ===
        "no test assesment for this job"
      ) {
        notify("no test assesments assigned to this job", "error");
      } else {
        notify("Oops something went wrong fetching candidates", "error");
      }
    },
  });

  useEffect(() => {
    const formData = new FormData();

    formData.append("job_id", jobId);
    formData.append("status", filterStatus);

    if (jobId) {
      if (sortingFilter === "test_score_sorting") {
        testFilteredCandidateMutate(formData);
      } else {
        mutate(formData);
      }
    }
  }, [mutate, jobId, filterStatus, sortingFilter, testFilteredCandidateMutate]);

  const colorByFilterValue = () => {
    if (filterStatus === "not_suitable") {
      return "red";
    } else if (filterStatus === "partially_suitable") {
      return "yellow";
    }
    return "green";
  };

  const candidateInvitation = useMutation(companyInviteCandidateForInterview, {
    onSuccess: () => {
      notify("candidate successfully invited", "success");
    },
    onError: () => {
      notify("Oops something went wrong, failed to invite candidate", "error");
    },
  });

  const candidateInvitationHandler = (
    candidatedID: number,
    has_mail_sent: boolean
  ) => {
    if (has_mail_sent) {
      notify("invitation already sent to candidate", "error");
      return;
    }

    const formData = new FormData();

    const arrayOfCandidate = [];

    arrayOfCandidate.push(candidatedID);

    formData.append("list_of_id", JSON.stringify(arrayOfCandidate));

    candidateInvitation.mutate(formData);
  };

  const columns = [
    {
      Header: "Candidate name",
      accessor: "job",
      id: 1,
      Cell: (tableProps: any) => (
        <TableDataColored>
          {tableProps.row.original.jobseekers.full_name}
        </TableDataColored>
      ),
    },
    {
      Header: "Date of Application",
      accessor: "job",
      id: 2,
      Cell: (tableProps: any) => (
        <TableDataColored>
          {moment(
            new Date(tableProps.row.original.jobseekers.created_at)
          ).format("MMMM Do YYYY, h:mm:ss a")}
        </TableDataColored>
      ),
    },
    {
      Header: "Role Applied For",
      accessor: "jobseekers",
      id: 3,
      Cell: (tableProps: any) => (
        <TableDataColored>
          {tableProps.row.original.jobseekers.role_applied_for}
        </TableDataColored>
      ),
    },

    {
      Header: "CV",
      accessor: "view cv",
      id: 4,
      Cell: (tableProps: any) => (
        <TableDataColored
          color="blue"
          where={`/company/cv-details/${tableProps.row.original.jobseekers.jobseekers_id}/${tableProps.row.original.jobseekers.role_applied_for}`}
        >
          view
        </TableDataColored>
      ),
    },
    {
      Header: "Status",
      accessor: "not-stated",
      id: 5,
      Cell: (tableProps: any) => (
        <TableDataColored
          color={colorByFilterValue()}
          where={`/company/candidate-score-obtained/${jobId}/${tableProps.row.original.jobseekers.jobseekers_id}/${sortingFilter}/${filterStatus}`}
        >
          {filterStatus?.replace("_", " ")}
        </TableDataColored>
      ),
    },
    {
      Header: "Invite",
      accessor: "final_selection_state",
      id: 6,
      Cell: (tableProps: any) => (
        <TableDataColored
          color={tableProps.row.original.has_mail_sent ? "green" : "gold"}
          cursor="pointer"
          onClick={() =>
            candidateInvitationHandler(
              tableProps.row.original.id,
              tableProps.row.original.has_mail_sent
            )
          }
        >
          {tableProps.row.original.has_mail_sent ? "Invited" : "Invite"}
        </TableDataColored>
      ),
    },
  ];

  const FilteringDropdowns = () => (
    <FlexBox justifyContent="space-between">
      <CompanyNavBarItemsContainer>
        <Dropdown
          defaultValue={filterStatus}
          onChange={setFilterStatus}
          options={[
            { label: "Suitable", value: "suitable" },
            { label: "Partially Suitable", value: "partially_suitable" },
            { label: "Not Suitable", value: "not_suitable" },
          ]}
          disabledOption={"Filter By Status"}
        />
      </CompanyNavBarItemsContainer>

      <CompanyNavBarItemsContainer>
        <Dropdown
          defaultValue={sortingFilter}
          onChange={setSortingFilter}
          options={[
            {
              label: "Sort By CV Filtering Score",
              value: "cv_score_sorting",
            },
            { label: "Sort By Test Score", value: "test_score_sorting" },
          ]}
          disabledValue="cv_score_sorting"
          disabledOption={"Filter By Assesment"}
        />
      </CompanyNavBarItemsContainer>
    </FlexBox>
  );

  if (isLoading || testFilteredCandidateLoading) {
    return <EmptyState header="Fetching Job Candidates" />;
  }

  if (isError || !data || data?.length <= 0) {
    return (
      <>
        <FilteringDropdowns />

        <EmptyState
          header="Oops something went wrong"
          subHeader={`${
            !jobId
              ? "please confirm a job was selected"
              : data?.length <= 0
              ? "No candidates for this job"
              : "Failed to fetch all Job Candidates, you can try refreshing the page."
          }`}
        />
      </>
    );
  }

  return (
    <>
      <Preloader loading={candidateInvitation.isLoading} />
      <FilteringDropdowns />

      <div>
        <Tables
          tableColumn={columns}
          tableData={data ? data : []}
          customHooks={[]}
        />
      </div>
    </>
  );
};

export default CompanyInterviewTab3;
