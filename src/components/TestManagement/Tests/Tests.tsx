import React from "react";
import {
  QuestionCount,
  TestBtn,
  TestBtnContainer,
  TestContainer,
  TestQuestionContainer,
  TestQuestions,
} from "./Tests.styles";

const Tests = () => {
  return (
    <TestContainer>
      <h1>ABC Company</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent
      </p>

      <TestBtnContainer>
        <TestBtn darken={true}>Previous</TestBtn>
        <TestBtn>Next</TestBtn>
      </TestBtnContainer>

      <QuestionCount>
        <p>1</p>
        <p>of</p>
        <p>20</p>
      </QuestionCount>

      <h5>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent
      </h5>

      <TestQuestionContainer>
        <TestQuestions>
          <span>a) LOREM IPSUN</span>
        </TestQuestions>
        <TestQuestions>
          <span>b) LOREM IPSUN</span>
        </TestQuestions>
        <TestQuestions>
          <span>c) LOREM IPSUN</span>
        </TestQuestions>
        <TestQuestions>
          <span>d) LOREM IPSUN</span>
        </TestQuestions>
      </TestQuestionContainer>
    </TestContainer>
  );
};

export default Tests;
