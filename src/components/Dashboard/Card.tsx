import React, { FC } from "react";
import { BtnContainer, ContentContainer, RedBtn } from "./Card.styles";

type Props = {
  time?: string;
  testDetails: string;
  testDate: string;
};

const Card: FC<Props> = ({ testDate, testDetails, time }) => {
  return (
    <ContentContainer>
      <BtnContainer>
        {time ? <RedBtn>{time}</RedBtn> : null}
        <button>Take Test</button>
      </BtnContainer>
      <p>{testDetails}</p>
      <h5>{testDate}</h5>
    </ContentContainer>
  );
};

export default Card;
