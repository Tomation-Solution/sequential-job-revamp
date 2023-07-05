import styled from "styled-components";
import { seqGray } from "../colors";

export const CutOffMarkSetterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0px;
  width: 400px;
  justify-content: space-between;

  input {
    border: none;
    outline: none;
    border-radius: 10px;
    background-color: ${seqGray};
    color: #fff;
    padding: 10px;
    text-align: center;
    width: 100px;

    &::placeholder {
      color: #fff;
    }
  }
`;
