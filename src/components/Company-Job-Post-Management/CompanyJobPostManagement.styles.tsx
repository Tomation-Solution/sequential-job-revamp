import styled from "styled-components";
import { seqWhite } from "../../globals/colors";
import { tablet } from "../../responsive";

export const CompanyJobPostManagementContainer = styled.div`
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

      form {
        width: 100%;

        .parallel-input {
          display: flex;
          align-items: center;
          border: 1px solid black;
          width: fit-content;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 1rem;
          margin-bottom: 1rem;

          input {
            padding: 10px 20px;
            border: none;
            outline: none;
            border-right: 1px solid black;
            width: 100%;
          }
          select {
            padding: 10px 20px;
            border: none;
            outline: none;
          }
        }
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      textarea {
        width: 100%;
      }
    }
  }
`;
