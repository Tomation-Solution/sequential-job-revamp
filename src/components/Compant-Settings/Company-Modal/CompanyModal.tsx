import BackDrop from "../../BackDrop/BackDrop";
import Button from "../../Button/Button";
import { CompanyDeleteAccountModal } from "../CompanySettings.styles";

type Props = {
  closefn: () => void;
};

function CompanyModal({ closefn }: Props) {
  return (
    <BackDrop>
      <CompanyDeleteAccountModal>
        <h1>Are you sure you want to delete your account?</h1>
        <div className="halved">
          <Button styleType="danger">Delete Account</Button>
          <Button onClick={closefn} styleType="whiteBg">
            Cancel
          </Button>
        </div>
      </CompanyDeleteAccountModal>
    </BackDrop>
  );
}

export default CompanyModal;
