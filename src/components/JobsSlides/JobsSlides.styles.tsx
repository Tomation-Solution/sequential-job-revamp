import styled from "styled-components";
import { seqBlue100, seqLightBlue, seqWhite } from "../../globals/colors";
import { mobileSm, tablet } from "../../responsive";

type Props = {
  darken?: boolean;
};

export const JobsSlidesContainer = styled.div`
  width: 500px;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background-color: ${seqBlue100};
  color: ${seqWhite};
  padding: 30px;
  overflow-y: auto;

  ${tablet({
    width: "80%",
  })}

  h1 {
    font-size: 25px;
    font-weight: 400;
    margin: 20px 0px;
    text-align: center;
  }
  p {
    line-height: 25px;
    margin: 20px 0px;
  }
`;

export const JobBtnCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0px;
  gap: 30px;

  ${tablet({ flexDirection: "column" })}
`;
export const JobBtn = styled.button<Props>`
  outline: none;
  border: none;
  padding: 10px 20px;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  color: ${(props) => (props.darken ? `${seqWhite}` : `${seqBlue100}`)};
  background-color: ${(props) =>
    props.darken ? `${seqLightBlue}` : `${seqWhite}`};
`;

export const JobsUploadCon = styled.div`
  border-radius: 10px;
  background-color: #d3d3d3;
  color: ${seqBlue100};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;

  p {
    margin: 0;
  }
`;

export const JobTakeTestContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  span {
    color: ${seqLightBlue};
    font-size: 14px;
  }
`;

export const JobTestExtra = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 12px;
  margin: 30px 0px;

  ${mobileSm({
    flexDirection: "column",
  })}

  span {
    color: ${seqWhite};
  }
`;
