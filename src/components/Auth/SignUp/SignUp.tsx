import { SignUpContainer, SignUpWrapper } from "./Signup.styles";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import { Form, FormContainer } from "../../../globals/styles/forms.styles";
import InputWithLabel from "../../InputWithLabel/InputWithLabel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";
import { signUpAsJobSeekerApi } from "../../../redux/api/authentication.api";
import { useMutation } from "react-query";
import useToast from "../../../hooks/useToastify";
import Preloader from "../../Preloader/Preloader";

const schema = yup.object({
  email: yup.string().email().required(),
  full_name: yup.string().required(),
  password: yup.string().required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
  phone_number: yup.number().min(11).required(),
});

export type signUpAsJobSeekerForm = yup.InferType<typeof schema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { notify } = useToast();
  const { mutate, isLoading } = useMutation(signUpAsJobSeekerApi, {
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
    console.log(data);
    mutate(data);
  };
  return (
    <SignUpContainer>
      <SignUpWrapper>
        <img alt="logo" src={Logo} />
        <Preloader loading={isLoading} />
        <FormContainer>
          <h2>Sign Up</h2>
          <p className="">
            Want to Sign up as a Recruiter?{" "}
            <Link to={"/sign-up-company"}>Get Started</Link>
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

            {/* <InputWithLabel
              label="Education Qualification"
              style={{ margin: "10px 0" }}
            /> */}
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

export default SignUp;
