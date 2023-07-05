import styled from "styled-components";
import { seqWhite } from "../../globals/colors";
import { tablet } from "../../responsive";

export const CompanyJobTestManagementContainer = styled.div`
  main {
    padding: 10px;
    background-color: ${seqWhite};
    display: flex;
    flex-wrap: wrap;
    gap: 30px;

    ${tablet({
      flexDirection: "column",
    })}

    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      .upload-question {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        cursor: pointer;

        p {
          font-size: 20px;
        }
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
  }
`;
