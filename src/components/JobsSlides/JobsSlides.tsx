import React from "react";
import {
  JobBtn,
  JobBtnCon,
  JobsSlidesContainer,
  JobsUploadCon,
  JobTakeTestContainer,
  JobTestExtra,
} from "./JobsSlides.styles";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Button from "../Button/Button";
import JobsUploadComponent from "../JobsUploadComponent/JobsUploadComponent";

export const JobsAcceptSlides = () => {
  return (
    <JobsSlidesContainer>
      <h1>Congrats</h1>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
        blanditiis consequatur mollitia, excepturi amet, accusamus dolores
        facere harum similique voluptates soluta voluptatum praesentium
        nesciunt, sed labore quae voluptate placeat deleniti. Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Aspernatur blanditiis consequatur
        mollitia, excepturi amet, accusamus dolores facere harum similique
        voluptates soluta voluptatum praesentium nesciunt, sed labore quae
        voluptate placeat deleniti.
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
        blanditiis consequatur mollitia, excepturi amet, accusamus dolores
        facere harum similique voluptates soluta voluptatum praesentium
        nesciunt, sed labore quae voluptate placeat deleniti. Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Aspernatur blanditiis consequatur
        mollitia, excepturi amet, accusamus dolores facere harum similique
        voluptates soluta voluptatum praesentium nesciunt, sed labore quae
        voluptate placeat deleniti.
      </p>

      <JobBtnCon>
        <JobBtn darken={true}>Accept Offer</JobBtn>
        <JobBtn>Decline Offer</JobBtn>
      </JobBtnCon>
    </JobsSlidesContainer>
  );
};

export const JobsRejectSlides = () => {
  return (
    <JobsSlidesContainer>
      <h1>Please, Upload the following documents for confirmation purpose</h1>

      {[...Array(5)].map((item, index) => (
        <JobsUploadComponent key={index}/>
      ))}
     
     <Button type="submit" style={{'margin':'0 auto'}}>
      Submit
     </Button>
    </JobsSlidesContainer>
  );
};

export const JobsTakeTestSlides = () => {
  return (
    <JobTakeTestContainer>
    <h1>Business Developer</h1>
    <p>VI, Lagos</p>
    <span>Job details</span>
    <JobTestExtra>
      <span>Salary: $97,000/yr</span>
      <span>JobType: Remote</span>
    </JobTestExtra>

    <p>
      Congratulations , you have been scheduled for a test, please kindly
      take the test in due time in other toquicken the process
    </p>

    <JobBtnCon>
      <JobBtn darken={true}>Take Test</JobBtn>
    </JobBtnCon>
  </JobTakeTestContainer>
  );
};
