import styled from "styled-components";
import { seqBlue100, seqGray200 } from "../../../globals/colors";

export const CVSummaryContainer = styled.div`
  .title {
    text-decoration: underline;
    color: ${seqBlue100};
    font-size: 30px;
    font-weight: 600;
    margin: 10px 0px;
  }
  .sub-title {
    text-decoration: underline;
    color: ${seqGray200};
    font-size: 24px;
    font-weight: 600;
    margin: 10px 0px;
  }
  .sub-title2 {
    color: ${seqBlue100};
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0px;
  }
  .text {
    color: ${seqBlue100};
    font-size: 16px;
    line-height: 20px;
    margin: 10px 0px;
  }
  .text2 {
    color: ${seqGray200};
    font-size: 16px;
    line-height: 20px;
    margin: 10px 0px;
  }
`;
