import { BsUpload } from "react-icons/bs";
import { FlexBox } from "../../globals/styles/FlexBox";
import { FormInput } from "../../globals/styles/forms.styles";
import Button from "../Button/Button";
import { CompanyJobTestManagementContainer } from "./CompanyJobTestManagement.styles";
import { useCustomFetcher } from "../../utils/fetcher";
import {
  getJobInvitationLetter,
  saveInvitationLetter,
  updateInvitationLetter,
} from "../../redux/api/company/jobs-test-management.api";
import EmptyState from "../EmptyState/EmptyState";
import Preloader from "../Preloader/Preloader";
import { JobInvitationLetterType } from "./types";
import TextEditor from "../../globals/TextEditor/TextEditor";
import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import useToast from "../../hooks/useToastify";

type Props = {
  jobId: any;
};

function CompanyJobTestInvitationLetter({ jobId }: Props) {
  const { loadingState, isError, data } =
    useCustomFetcher<JobInvitationLetterType>(`job-invitation-${jobId}`, () =>
      getJobInvitationLetter(jobId)
    );

  const { notify } = useToast();

  const editorRef = useRef<any>();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(saveInvitationLetter, {
    onSuccess: () => {
      queryClient.invalidateQueries(`job-invitation-${jobId}`);
      notify("invitation letter for this job successfully saved", "success");
    },
    onError: () => {
      notify("failed to save invitaion letter", "error");
    },
  });

  const updateInvitationMutation = useMutation(updateInvitationLetter, {
    onSuccess: () => {
      queryClient.invalidateQueries(`job-invitation-${jobId}`);
      notify("invitation letter for this job successfully saved", "success");
    },
    onError: () => {
      notify("failed to save invitaion letter", "error");
    },
  });

  const saveInvitationLetterHandler = () => {
    if (jobId === "") {
      notify("please select a job for this invitation letter", "error");
      return;
    }

    const inputData = editorRef.current.getContent();
    const payload = {
      job: jobId,
      letter_content: inputData,
    };

    if (data === null) {
      mutate(payload);
    } else {
      updateInvitationMutation.mutate({
        invitationId: data?.id,
        letter_content: inputData,
        job: jobId,
      });
    }
  };

  if (isError) {
    return <EmptyState header="Failed to Fetch" subHeader="" />;
  }

  return (
    <>
      <Preloader
        loading={
          loadingState || isLoading || updateInvitationMutation.isLoading
        }
      />
      <CompanyJobTestManagementContainer>
        <main>
          <div>
            <h2 style={{ textAlign: "center", margin: "30px 0px" }}>
              Test Invitation Letter
            </h2>
            <p style={{ textAlign: "center", margin: "30px 0px" }}>
              Write Interview Invitation Letter
            </p>

            <TextEditor
              editorRef={editorRef}
              initialValue={data?.letter_content || ""}
            />

            {/* <p>Or Upload Invitation Letter</p>
            <br />
            <BsUpload size={30} cursor={"pointer"} /> */}
          </div>
        </main>

        <FlexBox justifyContent="flex-end">
          <Button onClick={saveInvitationLetterHandler}>
            Save & Continue Later
          </Button>
        </FlexBox>
      </CompanyJobTestManagementContainer>
    </>
  );
}

export default CompanyJobTestInvitationLetter;
