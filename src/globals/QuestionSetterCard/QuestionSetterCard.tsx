import { BsCircle, BsFillImageFill } from "react-icons/bs";
import { FiTarget } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

import {
  OptionQuestionSetterCardContainer,
  FillInGapQuestionSetterCardContainer,
  QuestionSetterCardContainer,
} from "./QuestionSetterCard.styles";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import { useState } from "react";

type QuestionSetterCardProps = {
  disableAll: boolean;
  isPreview?: boolean;
};

export function QuestionSetterCard({
  disableAll,
  isPreview,
}: QuestionSetterCardProps) {
  const [questionType, setQuestionType] = useState<
    "options_question" | "fill_in_gap_question" | string
  >("options_question");

  return (
    <QuestionSetterCardContainer>
      {questionType === "fill_in_gap_question" ? (
        <small className="top-banner">
          Represent the guess word or statement as five(5) underscores "_____"
        </small>
      ) : null}

      {isPreview && (
        <div className="trash-bin">
          <BsFillTrashFill color="red" size={20} />
        </div>
      )}

      <input placeholder="Question" type="text" className="question-input" />

      <div className="image-select">
        <section className="add-image-input">
          <label htmlFor="file-input">
            <BsFillImageFill size={30} />
            <small>Add Image</small>
          </label>
          <input id="file-input" type="file" accept="image/*" />
        </section>

        <div className="select-container">
          <FiTarget size={15} className="svg1" />
          <AiFillCaretDown size={15} className="svg2" />
          <select onChange={(e) => setQuestionType(e.target.value)}>
            <option value={"options_question"}>Options question</option>
            <option value={"fill_in_gap_question"}>
              Fill in the gap question
            </option>
          </select>
        </div>
      </div>

      {questionType === "options_question" ? (
        <OptionQuestionSetterCard disableAll={disableAll} />
      ) : null}
      {questionType === "fill_in_gap_question" ? (
        <FillInGapQuestionSetterCard disableAll={disableAll} />
      ) : null}

      <div className="marks-allocation">
        <small>Mark allocated</small>

        <div className="marks-allocated-input-container">
          <FiTarget size={10} className="svg1" />
          <input type="number" className="marks-allocated-input" />
        </div>
      </div>
    </QuestionSetterCardContainer>
  );
}

type OptionQuestionSetterCardProps = {
  disableAll?: boolean;
};

export function OptionQuestionSetterCard({
  disableAll,
}: OptionQuestionSetterCardProps) {
  return (
    <OptionQuestionSetterCardContainer>
      <div className="option">
        <BsCircle size={15} />
        <input placeholder="type option" />
      </div>

      <div className="option">
        <BsCircle size={15} />
        <p>Add option</p>
      </div>
    </OptionQuestionSetterCardContainer>
  );
}

type FillInGapQuestionSetterCardProps = {
  disableAll?: boolean;
};

export function FillInGapQuestionSetterCard({
  disableAll,
}: FillInGapQuestionSetterCardProps) {
  return (
    <FillInGapQuestionSetterCardContainer>
      <InputWithLabel
        label="Input Expected Answer"
        placeholder="provide the expected answer"
      />
    </FillInGapQuestionSetterCardContainer>
  );
}
