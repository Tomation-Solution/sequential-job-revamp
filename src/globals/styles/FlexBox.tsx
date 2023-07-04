import styled from "styled-components";
import { tablet } from "../../responsive";

export const FlexBox = styled.div<{ justifyContent?: string }>`
  display: flex;
  margin: 20px 0px;
  align-items: center;
  gap: 20px;
  justify-content: ${(props) =>
    props.justifyContent ? `${props.justifyContent}` : ""};
  ${tablet({
    flexDirection: "column",
  })}
`;
