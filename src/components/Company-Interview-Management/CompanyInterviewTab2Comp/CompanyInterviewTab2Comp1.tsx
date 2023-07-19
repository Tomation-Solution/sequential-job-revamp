import { useRef } from "react";
import TextEditor from "../../../globals/TextEditor/TextEditor";
import { CompanyJobTestManagementContainer } from "../../Company-Job-Test-Management/CompanyJobTestManagement.styles";

function CompanyInterviewTab2Comp1() {
  const editorRef = useRef<any>();

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
              initialValue="<h1>Type Invitation Letter</h1>"
            />
          </div>
        </main>
      </CompanyJobTestManagementContainer>
    </>
  );
}

export default CompanyInterviewTab2Comp1;
