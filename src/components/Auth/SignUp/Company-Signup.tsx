import EastIcon from "@mui/icons-material/East";
import {
  DecisionContainer,
  SignUpContainer,
  SignUpWrapper,
} from "./Signup.styles";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import { Form, FormContainer } from "../../../globals/styles/forms.styles";
import InputWithLabel from "../../InputWithLabel/InputWithLabel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";
import {
  signUpAsJobRecruiterrApi,
  signUpAsJobSeekerApi,
} from "../../../redux/api/authentication.api";
import { useMutation } from "react-query";
import useToast from "../../../hooks/useToastify";
import Preloader from "../../Preloader/Preloader";

{
  /* organisation_name":"dd.0", "industry":"hr industry",
            "addresses":"devloper logde", "official_phone":"08162047348",
            "organisation_name_shortname":"ff" */
}

const schema = yup.object({
  email: yup.string().email().required(),
  full_name: yup.string().required(),
  password: yup.string().required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
  phone_number: yup.number().min(11).required(),
  organisation_name: yup.string().required(),
  industry: yup.string().required(),
  addresses: yup.string().required(),
  official_phone: yup.number().min(11).required(),
  organisation_name_shortname: yup.string().required(),
});

export type signUpAsJobSeekerForm = yup.InferType<typeof schema>;

const CompanySignup = () => {
  const navigate = useNavigate();
  const { notify } = useToast();
  const { mutate, isLoading } = useMutation(signUpAsJobRecruiterrApi, {
    onSuccess: (data) => {
      if (data.status === 201) {
        notify(
          "acct created successfully please check your email for verification",
          "success"
        );
        navigate("/login");
      }
    },
    onError: (error) => {
      console.log({ "sever error": error });
      notify("This email already exists try another", "error");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpAsJobSeekerForm>({
    //@ts-ignore
    resolver: yupResolver(schema),
  });


  const onSubmit = (data: signUpAsJobSeekerForm) => {
    mutate(data);
  };
  return (
    <SignUpContainer>
      <SignUpWrapper>
        <img alt="logo" src={Logo} />
        <Preloader loading={isLoading} />
        <FormContainer>
          <h2>Sign Up - Recruiter</h2>
          <p className="">
            Want to Sign up as a Job Seeker?{" "}
            <Link to={"/sign-up"}>Get Started</Link>
          </p>
          <p
            style={{
              marginBottom: "10px",
            }}
          >
            Already have and account? <Link to={"/login"}>Log In</Link>
          </p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputWithLabel
              label="Full Name"
              style={{ margin: "10px 0" }}
              register={register("full_name")}
              errorMessage={errors.full_name?.message}
            />
            <InputWithLabel
              label="Email"
              style={{ margin: "10px 0" }}
              register={register("email")}
              errorMessage={errors.email?.message}
            />

            <InputWithLabel
              label="organisation name"
              style={{ margin: "10px 0" }}
              register={register("organisation_name")}
              errorMessage={errors.organisation_name?.message}
            />

            <InputWithLabel
              label="organisation shortname"
              style={{ margin: "10px 0" }}
              register={register("organisation_name_shortname")}
              errorMessage={errors.organisation_name_shortname?.message}
            />

            <InputWithLabel
              label="industry"
              style={{ margin: "10px 0" }}
              register={register("industry")}
              errorMessage={errors.industry?.message}
            />

            <InputWithLabel
              label="addresses"
              style={{ margin: "10px 0" }}
              register={register("addresses")}
              errorMessage={errors.addresses?.message}
            />

            <InputWithLabel
              label="official phone"
              style={{ margin: "10px 0" }}
              register={register("official_phone")}
              errorMessage={errors.official_phone?.message}
            />

            <InputWithLabel
              label="phone"
              style={{ margin: "10px 0" }}
              register={register("phone_number")}
              errorMessage={errors.phone_number?.message}
            />
            <InputWithLabel
              label="password"
              style={{ margin: "10px 0" }}
              register={register("password")}
              errorMessage={errors.password?.message}
              type="password"
            />
            <InputWithLabel
              label="Confirm Password"
              style={{ margin: "10px 0" }}
              register={register("confirm_password")}
              errorMessage={errors.confirm_password?.message}
              type="password"
            />
            <Button type="submit">Register</Button>
          </Form>
          {/* <DecisionContainer>
            <p>Sign up as an organization/company</p>
            <Link to={"jobseekerpersonaldetails"}>
              <p>Sign up as an Individual</p>
            </Link>
          </DecisionContainer> */}
        </FormContainer>
      </SignUpWrapper>
    </SignUpContainer>
  );
};

export default CompanySignup;
