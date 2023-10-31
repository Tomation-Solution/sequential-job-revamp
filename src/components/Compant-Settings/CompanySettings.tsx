import { useEffect, useState } from "react";
import {
  AccountDetails,
  AccountDetailsSummary,
  CompanySettingsContainer,
  NavigationItems,
} from "./CompanySettings.styles";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import { RxPencil2 } from "react-icons/rx";
import { PiPencilSlashBold } from "react-icons/pi";
import Button from "../Button/Button";
import CompanyModal from "./Company-Modal/CompanyModal";
import { getUser } from "../../utils/extraFunction";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation, useQuery } from "react-query";
import { changePasswordApi, getCompanyInfoApi, updateCompanyInfoApi } from "../../redux/api/authentication.api";
import Preloader from "../Preloader/Preloader";
import useToast from "../../hooks/useToastify";

function CompanySettings() {
  const [showSubmitBtn, setSetShowSubmitBtn] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const user = getUser()
  const [options, setOptions] = useState<
    "my-profile" | "security" | "delete-account"
  >("my-profile");
  return (
    <>
      {showDeleteModal && (
        <CompanyModal closefn={() => setShowDeleteModal(false)} />
      )}
      <CompanySettingsContainer>
        <section className="navigation">
          {
              user?.user_type === 'company'?
          <NavigationItems
            isActive={options === "my-profile"}
            onClick={() => setOptions("my-profile")}
          >
            <p>My Profile</p>
          </NavigationItems>:''
          }

          <NavigationItems
            isActive={options === "security"}
            onClick={() => setOptions("security")}
          >
            <p>Security</p>
          </NavigationItems>

          <NavigationItems
            isDanger
            isActive={options === "delete-account"}
            onClick={() => {
              setOptions("delete-account");
              setShowDeleteModal(true);
            }}
          >
            <p>Delete Account</p>
          </NavigationItems>
        </section>

        {options === "my-profile" ? (
          <div> 
            {
              user?.user_type === 'company'?
              <UpdateCompanyProfile/>:''
            }
          </div>
        ) : null}

        {options === "security" ? (
          // <section className="account-info">
          //   <InputWithLabel
          //     placeholder="Change Password"
          //     label="Change Password"
          //   />
          //   <Button>Submit</Button>
          // </section>
          <ChangePasswordForm />
        ) : null}
      </CompanySettingsContainer>
    </>
  );
}

export default CompanySettings;


const CompanyProfileschema = yup.object({
  "full_name":yup.string().required(),
  "profile_image":yup.string(),
  "phone_number": yup.string().required(),
  "organisation_name": yup.string().required(),
  "organisation_name_shortname": yup.string().required(),
  "industry": yup.string().required(),
  "organisation_size":yup.number().required(),
  "location": yup.string().required(),
  "official_mail":yup.string().required(),
  "official_phone": yup.string().required(),
  "addresses": yup.string().required()
})

export type UpdateCompanyProfileI = yup.InferType<typeof CompanyProfileschema>










const UpdateCompanyProfile =()=>{

  const user = getUser()
  const {notify} = useToast()

  const { register, handleSubmit, formState: { errors } ,setValue} = useForm<UpdateCompanyProfileI>({
    // @ts-ignore
    resolver: yupResolver(CompanyProfileschema)
  });

  const {isLoading,data} = useQuery('getCompanyInfoApi',getCompanyInfoApi,{
   
  })

  const {isLoading:submmiting,mutate} = useMutation(updateCompanyInfoApi,{
    'onSuccess':()=>{
      notify('Updated','success')
    }
  })
  const onSubmit =(data:UpdateCompanyProfileI)=>{
    // console.log({data})
    mutate(data)
  }

  useEffect(()=>{
    if(data){
      console.log(data)
      setValue('full_name',data.full_name)
      if(data.profile_image){

        setValue('profile_image',data.profile_image)
      }
      setValue('phone_number',data.phone_number)
      setValue('organisation_name',data.user_extra.company.organisation_name)
      setValue('organisation_name_shortname',data.user_extra.company.organisation_name_shortname)
      setValue('industry',data.user_extra.company.industry)
      setValue('organisation_size',data.user_extra.company.organisation_size)
      setValue('location',data.user_extra.company.location)
      setValue('official_mail',data.user_extra.company.official_mail)
      setValue('official_phone',data.user_extra.company.official_phone)
      setValue('addresses',data.user_extra.company.addresses)
    }
  },[data])
  return (
    <section className="account-info">
      <Preloader  loading={isLoading||submmiting}/>
    <AccountDetailsSummary>
      <div className="summary">
        <img alt="" src={data?.profile_image??''} />
        <div>
          <h1>{data?.full_name}</h1>
          <p>{data?.user_extra.company.organisation_name}</p>
          <p>{data?.user_extra.company.location}</p>
        </div>
      </div>

      {/* {showSubmitBtn ? (
        <PiPencilSlashBold
          size={25}
          onClick={() => setSetShowSubmitBtn(!showSubmitBtn)}
        />
      ) : (
        <RxPencil2
          size={25}
          onClick={() => setSetShowSubmitBtn(!showSubmitBtn)}
        />
      )} */}
    </AccountDetailsSummary>

    <AccountDetails>
      <h1>Personal Info</h1>
      <div className="halved-inputs">
        <InputWithLabel
          placeholder="Full Name"
          label={'Full Name'}
          register={register('full_name')}
        />

      <InputWithLabel
          placeholder="Phone Number"
          label={'Phone Number'}
          register={register('phone_number')}
        />

<InputWithLabel
          placeholder="Address"
          label={'Address'}
          register={register('addresses')}
        />
      </div>
    </AccountDetails>


    <AccountDetails>
      <h1>Company Information</h1>
      <div className="halved-inputs">
        <InputWithLabel
          placeholder={"Company Name"}
          label={"Company Name"}

          register={register('organisation_name')}
        />
        <InputWithLabel
          placeholder={"Company Short Name"}
          label={"Company Short Name"}
          register={register('organisation_name_shortname')}
        />
        <InputWithLabel
          placeholder="Official Email Address"
          label={"Official Email Address"}
          register={register('official_mail')}
        />
        <InputWithLabel
          placeholder="Official Phone Number"
          label={"Official Phone Number"}
          register={register('official_phone')}
       />

      <InputWithLabel
        placeholder="Industry"
        label={"Industry"}
        register={register('industry')}
      />
      <InputWithLabel
        placeholder="Organisation Size"
        label={"Organisation Size"}
        register={register('organisation_size')}
      />

<InputWithLabel
        placeholder="Location"
        label={"Location"}
        register={register('location')}
      />
      </div>
    </AccountDetails>


    {/* {showSubmitBtn && <
      } */}
    <Button styleType="pry" onClick={handleSubmit(onSubmit)}>Submit</Button>
  </section>
  )
}

const ChangePasswordSchema = yup.object({
  password: yup.string().required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
})
type ChangePasswordSchemaI = yup.InferType<typeof ChangePasswordSchema>










export const ChangePasswordForm = ()=>{

  // changePasswordApi

  const {notify} = useToast()

  const { register, handleSubmit, formState: { errors } ,setValue} = useForm<ChangePasswordSchemaI>({
    // @ts-ignore
    resolver: yupResolver(ChangePasswordSchema)
  });

  const {isLoading:submmiting,mutate} = useMutation(changePasswordApi,{
    'onSuccess':()=>{
      notify('Updated','success')
    }
  })

  const onSubmit =(data:ChangePasswordSchemaI)=>{
    mutate(data.password)
    
  }

  return(
    <section className="account-info">
    <InputWithLabel
      placeholder="Password"
      label="Password"
      register={register('password')}
      type="password"
    />
    <InputWithLabel
      placeholder="Change Password"
      label="Change Password"
      register={register('confirm_password')}
      type="password"
    />
    <Button
    onClick={handleSubmit(onSubmit)}
    >Change Passoword</Button>
  </section>
  )
}