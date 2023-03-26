import styled from "styled-components";
import { tablet } from "../../responsive";

export const TestManagementContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;

  h1 {
    font-weight: 400;
    font-size: 25px;
    margin: 20px 0px;
  }
`;

export const TestManagementSubCon = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  ${tablet({
    flexDirection: "column",
  })}
`;
