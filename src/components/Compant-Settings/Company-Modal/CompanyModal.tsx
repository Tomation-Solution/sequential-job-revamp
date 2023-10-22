import { useMutation } from "react-query";
import BackDrop from "../../BackDrop/BackDrop";
import Button from "../../Button/Button";
import { CompanyDeleteAccountModal } from "../CompanySettings.styles";
import { deleteUserApi } from "../../../redux/api/authentication.api";
import useToast from "../../../hooks/useToastify";
import Preloader from "../../Preloader/Preloader";

type Props = {
  closefn: () => void;
};

function CompanyModal({ closefn }: Props) {
  const {notify} = useToast()
  const {isLoading,mutate} = useMutation(deleteUserApi,{
    'onSuccess':()=>{
      notify('Deleted Successfully','success')
      window.localStorage.clear()
      window.location.href ='/login' 
    }
  })
  return (
    <BackDrop>
      <CompanyDeleteAccountModal>
        <Preloader 
        loading={isLoading}
        />
        <h1>Are you sure you want to delete your account?</h1>
        <div className="halved">
          <Button styleType="danger"
          onClick={()=>{
            mutate()
          }}
          >Delete Account</Button>
          <Button onClick={closefn} styleType="whiteBg">
            Cancel
          </Button>
        </div>
      </CompanyDeleteAccountModal>
    </BackDrop>
  );
}

export default CompanyModal;
