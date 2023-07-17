import styled from "styled-components";

export const CompanyChartAndInterviewContainer = styled.div`
  @media screen and (min-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /* border:1px solid red; */
    & > div:nth-child(1) {
      width: 60%;
      background-color: white;
      border-radius: 10px;
    }
    & > div:nth-child(2) {
      width: 30%;
      background-color: white;
      border-radius: 10px;
      padding: 1rem 1.5rem;
    }
  }

  /* display: flex;
  gap: 30px;

  .left {
    flex: 1;
  }
  .right {
    flex: 1;
  }

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  } */
`;
