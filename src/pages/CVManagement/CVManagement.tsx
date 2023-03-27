import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  CVManagementHeader,
  CVManagemntCVUpload,
  CVManagemntContainer,
  CVManagemntFormContainer,
  CVManagemntPersonalStatement,
  CVManagemntSection,
} from "./CVManagement.styles";
import { FormInput, FormSelect } from "../../globals/styles/forms.styles";

const CVManagement = () => {
  const [personalStatement, setPersonalStatement] = React.useState("");
  const [education, setEducation] = React.useState([
    {
      id: 1,
      school: "",
      degree: "",
      courseOfStudy: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const [workExperience, setWorkExperience] = React.useState([
    {
      id: 1,
      company: "",
      position: "",
      startYear: "",
      endYear: "",
      role: "",
      responsibilities: "",
    },
  ]);

  const [certifications, setCertifications] = React.useState([
    {
      id: 1,
      certification: "",
      yearOfCertification: "",
      issuer: "",
    },
  ]);

  const [references, setReferences] = React.useState([
    {
      id: 1,
      fullName: "",
      relationship: "",
      email: "",
      phoneNumber: "",
    },
  ]);

  const handlePersonalStatementChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPersonalStatement(e.target.value);
  };

  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newEducation = education.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [e.target.name]: e.target.value,
        };
      }
      return item;
    });
    setEducation(newEducation);
  };

  const handleCertificationsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newCertifications = certifications.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [e.target.name]: e.target.value,
        };
      }
      return item;
    });
    setCertifications(newCertifications);
  };

  const handleReferencesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newReferences = references.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [e.target.name]: e.target.value,
        };
      }
      return item;
    });
    setReferences(newReferences);
  };

  const handleWorkExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newWorkExperience = workExperience.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [e.target.name]: e.target.value,
        };
      }
      return item;
    });

    setWorkExperience(newWorkExperience);
  };

  const handleAddEducation = () => {
    const newEducation = {
      id: education.length + 1,
      school: "",
      degree: "",
      courseOfStudy: "",
      startYear: "",
      endYear: "",
    };
    setEducation([...education, newEducation]);
  };

  const handleAddCertification = () => {
    const newCertification = {
      id: certifications.length + 1,
      certification: "",
      yearOfCertification: "",
      issuer: "",
    };
    setCertifications([...certifications, newCertification]);
  };

  const handleAddWorkExperience = () => {
    const newWorkExperience = {
      id: workExperience.length + 1,
      company: "",
      position: "",
      startYear: "",
      endYear: "",
      role: "",
      responsibilities: "",
    };
    setWorkExperience([...workExperience, newWorkExperience]);
  };

  const handleAddReference = () => {
    const newReference = {
      id: references.length + 1,
      fullName: "",
      relationship: "",
      email: "",
      phoneNumber: "",
    };

    setReferences([...references, newReference]);
  };

  return (
    <>
      <CVManagemntCVUpload >
        
      </CVManagemntCVUpload>
      <CVManagemntContainer>
        <CVManagementHeader>
          <h1>My CV</h1>

          <button>
            <span>Upload Instead</span>
          </button>
        </CVManagementHeader>
        <CVManagemntPersonalStatement>
          <p>Personal Statement</p>
          <textarea placeholder="Write your personal statement here" />
        </CVManagemntPersonalStatement>
        {/* Personal info */}
        <CVManagemntFormContainer>
          <FormSelect>
            <label>CV Template</label>
            <select>
              <option value="1">Template 1</option>
              <option value="2">Template 2</option>
              <option value="3">Template 3</option>
            </select>
          </FormSelect>

          <FormInput>
            <label>First Name</label>
            <input type="text" placeholder="First Name" />
          </FormInput>

          <FormInput>
            <label>Middle Name</label>
            <input type="text" placeholder="Middle Name" />
          </FormInput>

          <FormInput>
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" />
          </FormInput>

          <FormInput>
            <label>Phone Number</label>
            <input type="text" placeholder="Phone Number" />
          </FormInput>

          <FormInput>
            <label>Email</label>
            <input type="text" placeholder="Email" />
          </FormInput>

          <FormInput>
            <label>Address</label>
            <input type="text" placeholder="Address" />
          </FormInput>

          <FormInput>
            <label>City</label>
            <input type="text" placeholder="City" />
          </FormInput>

          <FormInput>
            <label>State</label>
            <input type="text" placeholder="State" />
          </FormInput>

          <FormSelect>
            <label>Country of Residence</label>
            <select>
              <option value="1">Country 1</option>
              <option value="2">Country 2</option>
              <option value="3">Country 3</option>
            </select>
          </FormSelect>

          <FormInput>
            <label>LinkedIn</label>
            <input type="text" placeholder="LinkedIn" />
          </FormInput>

          <FormInput>
            <label>Twitter</label>
            <input type="text" placeholder="Twitter" />
          </FormInput>

          {/* Sections  */}
        </CVManagemntFormContainer>
        {/* Personal info */}
        {/* Education info  */}
        <CVManagemntSection>
          <h2>Education</h2>
          {education.map((item) => (
            <div>
              <FormInput>
                <label>School Name</label>
                <input
                  onChange={(e) => handleEducationChange(e, item.id)}
                  type="text"
                  placeholder="School Name"
                  name="school"
                />
              </FormInput>

              <FormInput>
                <label>Start Year</label>
                <input
                  onChange={(e) => handleEducationChange(e, item.id)}
                  type="number"
                  placeholder="Start Year"
                  min="1900"
                  max="2099"
                  name="startYear"
                />
              </FormInput>

              <FormInput>
                <label>End Year</label>
                <input
                  type="number"
                  onChange={(e) => handleEducationChange(e, item.id)}
                  placeholder="End Year"
                  min="1900"
                  max="2099"
                  name="endYear"
                />{" "}
              </FormInput>

              <FormSelect>
                <label>Course of Study</label>

                <select name="courseOfStudy">
                  <option value="1">Course 1</option>
                  <option value="2">Course 2</option>
                  <option value="3">Course 3</option>
                </select>
              </FormSelect>

              <FormSelect>
                <label>Type of Degree</label>
                <select name="degree">
                  <option value="1">Degree 1</option>
                  <option value="2">Degree 2</option>
                  <option value="3">Degree 3</option>
                </select>
              </FormSelect>
            </div>
          ))}
          <button onClick={handleAddEducation}>
            <AddCircleIcon />
          </button>
        </CVManagemntSection>{" "}
        {/* edn of  Education info  */}
        {/* ============================================= */}
        {/* Work Experience  */}
        <CVManagemntSection>
          <h2>Experience</h2>
          {workExperience.map((item) => (
            <div>
              <FormInput>
                <label>Company</label>
                <input
                  onChange={(e) => handleWorkExperienceChange(e, item.id)}
                  type="text"
                  placeholder="Company"
                  name="company"
                />
              </FormInput>
              <FormInput>
                <label>Start Year</label>
                <input
                  onChange={(e) => handleWorkExperienceChange(e, item.id)}
                  type="number"
                  placeholder="Start Year"
                  min="1900"
                  max="2099"
                  name="startYear"
                />
              </FormInput>

              <FormInput>
                <label>End Year</label>
                <input
                  type="number"
                  onChange={(e) => handleWorkExperienceChange(e, item.id)}
                  placeholder="End Year"
                  min="1900"
                  max="2099"
                  name="endYear"
                />{" "}
              </FormInput>

              <FormInput>
                <label>Role</label>
                <input
                  onChange={(e) => handleWorkExperienceChange(e, item.id)}
                  type="text"
                  placeholder="Role"
                  name="role"
                />
              </FormInput>
              <FormInput>
                <label>Responsibilities</label>
                <textarea
                  placeholder="Responsibilities"
                  name="responsibilities"
                />
              </FormInput>
            </div>
          ))}
          <button onClick={handleAddWorkExperience}>
            <AddCircleIcon />
          </button>
        </CVManagemntSection>{" "}
        {/* end of  wrok experience info  */}
        {/* ============================================= */}
        {/* Certification  */}
        <CVManagemntSection>
          <h2>Certificaton</h2>
          {certifications.map((item) => (
            <div>
              <FormInput>
                <label>Certification</label>
                <input
                  onChange={(e) => handleCertificationsChange(e, item.id)}
                  type="text"
                  placeholder="Certification"
                  name="certification"
                />
              </FormInput>
              <FormInput>
                <label>Start Year</label>
                <input
                  onChange={(e) => handleCertificationsChange(e, item.id)}
                  type="number"
                  placeholder="Year of Certification"
                  min="1900"
                  max="2099"
                  name="yearOfCertification"
                />
              </FormInput>

              <FormInput>
                <label>Issuer</label>
                <input
                  onChange={(e) => handleCertificationsChange(e, item.id)}
                  type="text"
                  placeholder="Issuer"
                  name="issuer"
                />
              </FormInput>
            </div>
          ))}
          <button onClick={handleAddCertification}>
            <AddCircleIcon />
          </button>
        </CVManagemntSection>{" "}
        {/* end of  wrok certifications info  */}
        {/* ============================================= */}
        {/* Referencess  */}
        <CVManagemntSection>
          <h2>Refrences</h2>
          {references.map((item) => (
            <div>
              <FormInput>
                <label>Full Name</label>
                <input
                  onChange={(e) => handleReferencesChange(e, item.id)}
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                />
              </FormInput>
              <FormSelect>
                <label>Relationship</label>
                <select name="relationship">
                  <option value="1">Relationship 1</option>
                  <option value="2">Relationship 2</option>
                  <option value="3">Relationship 3</option>
                </select>
              </FormSelect>
              <FormInput>
                <label>Email</label>
                <input
                  onChange={(e) => handleReferencesChange(e, item.id)}
                  type="email"
                  placeholder="Email"
                  name="email"
                />
              </FormInput>{" "}
              <FormInput>
                <label>Phone Number</label>
                <input
                  onChange={(e) => handleReferencesChange(e, item.id)}
                  type="phone"
                  placeholder="Phone Number"
                  name="phoneNumber"
                />
              </FormInput>
            </div>
          ))}
          <button onClick={handleAddReference}>
            <AddCircleIcon />
          </button>
        </CVManagemntSection>
      </CVManagemntContainer>
    </>
  );
};

export default CVManagement;
