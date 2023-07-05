import { BsUpload } from "react-icons/bs";
import { FlexBox } from "../../globals/styles/FlexBox";
import { FormInput } from "../../globals/styles/forms.styles";
import Button from "../Button/Button";
import { CompanyJobTestManagementContainer } from "./CompanyJobTestManagement.styles";
import InputWithLabel from "../InputWithLabel/InputWithLabel";

type Props = {};

function CompanyJobTestInvitationLetter({}: Props) {
  return (
    <CompanyJobTestManagementContainer>
      <main>
        <div className="left">
          <h2>Test Invitation Letter</h2>
          <p style={{ textAlign: "center" }}>
            Write Interview Invitation Letter
          </p>

          <FormInput style={{ width: "100%" }}>
            <textarea rows={10} />
          </FormInput>

          <p>Or Upload Invitation Letter</p>
          <br />
          <BsUpload size={30} cursor={"pointer"} />
        </div>

        <div className="right">
          <h2>Preview Test Invitation Letter</h2>

          <FormInput style={{ width: "100%" }}>
            <textarea rows={30} />
          </FormInput>
        </div>
      </main>

      <FlexBox justifyContent="flex-end">
        <Button>Save & Continue Later</Button>
      </FlexBox>
    </CompanyJobTestManagementContainer>
  );
}

export default CompanyJobTestInvitationLetter;
