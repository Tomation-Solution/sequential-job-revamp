import styled from "styled-components";
import { seqBlue100, seqLightBlue, seqWhite } from "../../../globals/colors";
import { tablet } from "../../../responsive";

type Props = {
  darken?: boolean;
};

export const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  text-align: center;

  ${tablet({
    padding: "20px",
  })}

  h1 {
    margin: 10px 0px;
  }
  p {
    margin: 20px 0px;
  }
  h5 {
    color: ${seqLightBlue};
    font-size: 20px;
    font-weight: 400;
    margin: 30px 0px;
  }
`;

export const TestBtnContainer = styled.div`
  margin: 20px 0px;
  display: flex;
  align-items: center;
  gap: 30px;

  ${tablet({
    flexDirection: "column",
  })}
`;

export const QuestionCount = styled.div`
  margin: 20px 0px;
  display: flex;
  align-items: center;
  gap: 20px;

  p {
    font-weight: 500;
    font-size: 20px;
  }
`;

export const TestBtn = styled.button<Props>`
  padding: 10px 20px;
  border: none;
  outline: none;
  background-color: ${(props) =>
    props.darken ? `${seqWhite}` : `${seqLightBlue}`};
  color: ${(props) => (props.darken ? `${seqBlue100}` : `${seqWhite}`)};
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
`;

export const TestQuestionContainer = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: auto auto;
  gap: 30px;

  ${tablet({
    width: "70%",
  })}
`;
export const TestQuestions = styled.span`
  font-weight: 500;

  span {
    cursor: pointer;
  }
`;
