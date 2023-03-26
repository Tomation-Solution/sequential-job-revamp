import React from "react";
import {
  MedicalInviteContainer,
  MedicalsBtn,
  MedicalsHeader,
  MedicalsSlider,
  MedicalsSliderItem,
} from "./MedicalsInvitation.styles";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";

const MedicalsInvitation = () => {
  return (
    <MedicalInviteContainer>
      <MedicalsHeader>
        <QuestionAnswerRoundedIcon />
        <h1>Medicals Inivitation</h1>
      </MedicalsHeader>

      <h5>Instructions</h5>
      <ul>
        <li>Invitation for medical check up</li>
        <li>Invitation for medical check up</li>
        <li>Invitation for medical check up</li>
        <li>Invitation for medical check up</li>
        <li>Invitation for medical check up</li>
      </ul>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
        reiciendis, laudantium est error debitis modi perferendis doloribus
        labore beatae facilis id quod maiores saepe voluptates dolor temporibus
        libero eveniet voluptate.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
        reiciendis, laudantium est error debitis modi perferendis doloribus
        labore beatae facilis id quod maiores saepe voluptates dolor temporibus
        libero eveniet voluptate.
      </p>

      <h1>Slide to pick from available dates</h1>

      <MedicalsSlider>
        {[...Array(30)].map((item, index) => (
          <MedicalsSliderItem key={index}>
            <p>Monday , 14th August, 2022</p>
          </MedicalsSliderItem>
        ))}
      </MedicalsSlider>

      <h1>Slide to pick from available Time</h1>
      <MedicalsSlider>
        {[...Array(30)].map((item, index) => (
          <MedicalsSliderItem key={index}>
            <p>1:00pm</p>
          </MedicalsSliderItem>
        ))}
      </MedicalsSlider>

      <MedicalsBtn>Schedule</MedicalsBtn>
    </MedicalInviteContainer>
  );
};

export default MedicalsInvitation;
