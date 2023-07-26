import { useRef } from "react";
import TextEditor from "../../../globals/TextEditor/TextEditor";
import { CompanyJobTestManagementContainer } from "../../Company-Job-Test-Management/CompanyJobTestManagement.styles";
import Button from "../../Button/Button";
import { CompanyCreateInterview } from "../Types";

type Props = {
  state: CompanyCreateInterview;
  letterSaved: React.Dispatch<React.SetStateAction<any>>;
  onStateChange: React.Dispatch<React.SetStateAction<CompanyCreateInterview>>;
};

function CompanyInterviewTab2Comp1({
  state,
  letterSaved,
  onStateChange,
}: Props) {
  const editorRef = useRef<any>();

  const onLetterSave = () => {
    const letterContent = editorRef.current.getContent();

    letterSaved(true);

    onStateChange((oldState) => {
      const newState = { ...oldState };
      newState.panelist_invitation_letter = letterContent;

      return newState;
    });
  };

  return (
    <>
      <CompanyJobTestManagementContainer>
        <main>
          <div>
            <h1 style={{ textAlign: "center", margin: "20px 0px" }}>
              Panelist Invitation
            </h1>
            <h3>Write Interview Invitation Letter</h3>

            <TextEditor
              editorRef={editorRef}
              initialValue={
                state?.panelist_invitation_letter ||
                "<h1>Please Enter The Letter Details</h1>"
              }
            />
          </div>

          <Button styleType="danger" onClick={onLetterSave}>
            Save Letter
          </Button>
        </main>
      </CompanyJobTestManagementContainer>
    </>
  );
}

export default CompanyInterviewTab2Comp1;
