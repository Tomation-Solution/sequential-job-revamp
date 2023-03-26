import styled from "styled-components";
import { seqLightBlue, seqWhite } from "../../globals/colors";
import { mobile, mobileSm, tablet } from "../../responsive";

export const TopSummaryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
export const TopSummaryItems = styled.div<{ newColor: string }>`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: calc((100% - 60px) / 4);
  background-color: ${seqWhite};
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  cursor: pointer;

  ${tablet({
    width: "150px",
  })}
  ${mobile({
    width: "calc((100% - 20px) / 2)",
  })}
    ${mobileSm({
    width: "100%",
  })}

  h1 {
    color: ${(props) =>
      props.newColor ? `${props.newColor}` : `${seqLightBlue}`};
    font-size: 20px;
  }

  p {
    margin: 10px 0px;
  }

  div {
    display: flex;
    align-items: center;
    font-size: 10px;
    color: green;

    section {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: green;
      margin-right: 5px;
    }
  }
`;

export const ItemCountCon = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
`;
