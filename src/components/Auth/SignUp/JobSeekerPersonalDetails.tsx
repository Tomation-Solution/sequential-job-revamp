import Logo from "../../../assets/Logo.png";
import {
  Form,
  FormButton,
  FormContainer,
  FormInput,
  Header,
} from "./styles/forms.styles";
import { Link } from "react-router-dom";
import { Container } from "./Signup.styles";

const JobSeekerPersonalDetails = () => {
  return (
    <Container>
      <Link to="/">
        <img alt="logo" src={Logo} />
      </Link>
      <Header>
        <h1>SignUp</h1>
        <h3>Job Seeker</h3>
      </Header>
      <FormContainer>
        <Form>
          <FormInput>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" required />
          </FormInput>
          <FormInput>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" required />
          </FormInput>
          <FormInput>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </FormInput>
          <FormInput>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="phone" id="phoneNumber" />
          </FormInput>
          <FormInput>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </FormInput>
          <FormInput>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" />
          </FormInput>

          <FormButton>
            <Link to="/verifyemail">Register</Link>
          </FormButton>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default JobSeekerPersonalDetails;
