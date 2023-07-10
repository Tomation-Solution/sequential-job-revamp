import { BsCircle, BsFillImageFill } from "react-icons/bs";
import { FiTarget } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

import {
  OptionQuestionSetterCardContainer,
  FillInGapQuestionSetterCardContainer,
  QuestionSetterCardContainer,
} from "./QuestionSetterCard.styles";
import { QuestionType, TestManagementFormTestQuestionsType } from "./types";
import { FormInput } from "../styles/forms.styles";

type QuestionSetterCardProps = {
  disableAll: boolean;
  isPreview?: boolean;
  state: QuestionType;
  onStateChange?: React.Dispatch<React.SetStateAction<QuestionType>>;
  previewStateChange?: React.Dispatch<
    React.SetStateAction<TestManagementFormTestQuestionsType>
  >;
};

export function QuestionSetterCard({
  disableAll,
  isPreview,
  state,
  onStateChange,
  previewStateChange,
}: QuestionSetterCardProps) {
  return (
    <QuestionSetterCardContainer>
      {state.question_type === "fill_in_gap_question" ? (
        <small className="top-banner">
          Represent the guess word or statement as five(5) underscores "_____"
        </small>
      ) : null}

      {isPreview && (
        <div
          className="trash-bin"
          onClick={() =>
            previewStateChange!((oldPreviewState) => {
              if (state.question_type === "options_question") {
                const allOptionsQuestions = [...oldPreviewState.option_quetion];
                allOptionsQuestions.splice(state.identifier!, 1);
                return {
                  ...oldPreviewState,
                  option_quetion: allOptionsQuestions,
                };
              } else {
                const allFillInQuestions = [
                  ...oldPreviewState.fill_in_gap_quetion,
                ];
                allFillInQuestions.splice(state.identifier!, 1);
                return {
                  ...oldPreviewState,
                  fill_in_gap_quetion: allFillInQuestions,
                };
              }
            })
          }
        >
          <BsFillTrashFill color="red" size={20} />
        </div>
      )}

      <input
        placeholder="Question"
        value={state.quetion}
        disabled={disableAll}
        onChange={(e) =>
          onStateChange!((oldState) => ({
            ...oldState,
            quetion: e.target.value,
          }))
        }
        type="text"
        className="question-input"
      />

      <div className="image-select">
        <section className="add-image-input">
          <label htmlFor={disableAll ? "" : "file-input"}>
            <BsFillImageFill size={30} />
            <small>
              {state.image?.name
                ? state.image?.name.length > 20
                  ? `${state.image?.name.slice(0, 20)}...`
                  : state.image?.name
                : "Add Image"}
            </small>
          </label>
          <input
            id="file-input"
            type="file"
            disabled={disableAll}
            accept="image/*"
            onChange={(e) =>
              onStateChange!((oldState) => ({
                ...oldState,
                image: e.target.files![0] || "",
              }))
            }
          />
        </section>

        <div className="select-container">
          <FiTarget size={15} className="svg1" />
          <AiFillCaretDown size={15} className="svg2" />
          <select
            disabled={disableAll}
            onChange={(e) =>
              onStateChange!((oldState) => ({
                ...oldState,
                question_type: e.target.value,
              }))
            }
          >
            <option value={"options_question"}>Options question</option>
            <option value={"fill_in_gap_question"}>
              Fill in the gap question
            </option>
          </select>
        </div>
      </div>

      {state.question_type === "options_question" ? (
        <OptionQuestionSetterCard
          disableAll={disableAll}
          state={state}
          onStateChange={onStateChange!}
        />
      ) : null}
      {state.question_type === "fill_in_gap_question" ? (
        <FillInGapQuestionSetterCard
          disableAll={disableAll}
          state={state}
          onStateChange={onStateChange!}
        />
      ) : null}

      <div className="marks-allocation">
        <small>Mark allocated</small>

        <div className="marks-allocated-input-container">
          <FiTarget size={10} className="svg1" />
          <input
            type="number"
            className="marks-allocated-input"
            value={state.quetion_mark}
            min={1}
            max={100}
            disabled={disableAll}
            onChange={(e) =>
              onStateChange!((oldState) => ({
                ...oldState,
                quetion_mark: Number(e.target.value),
              }))
            }
          />
        </div>
      </div>
    </QuestionSetterCardContainer>
  );
}

type OptionQuestionSetterCardProps = {
  disableAll?: boolean;
  state: QuestionType;
  onStateChange: React.Dispatch<React.SetStateAction<QuestionType>>;
};

export function OptionQuestionSetterCard({
  disableAll,
  state,
  onStateChange,
}: OptionQuestionSetterCardProps) {
  return (
    <OptionQuestionSetterCardContainer>
      {state.option_to_choose_from.map((item, index) => (
        <div className="option" key={index}>
          <BsCircle size={15} />
          <input
            placeholder="type option"
            value={item}
            disabled={disableAll}
            onChange={(e) =>
              onStateChange((oldState) => {
                oldState.option_to_choose_from[index] = e.target.value;
                return { ...oldState };
              })
            }
          />

          <button
            disabled={disableAll}
            onClick={() =>
              onStateChange((oldState) => {
                const new_option = [...oldState.option_to_choose_from];
                new_option.splice(index, 1);

                return { ...oldState, option_to_choose_from: new_option };
              })
            }
          >
            remove option
          </button>
        </div>
      ))}

      <div className="option">
        <BsCircle size={15} />
        <p
          onClick={() => {
            if (disableAll) {
              return;
            }
            onStateChange((oldState) => {
              const new_options = [...oldState.option_to_choose_from];
              new_options.push(`new option`);
              return { ...oldState, option_to_choose_from: new_options };
            });
          }}
        >
          Add option
        </p>
      </div>

      <FillInGapQuestionSetterCardContainer>
        <FormInput>
          <label>Input Expected Answer</label>
          <input
            disabled={disableAll}
            placeholder="provide the expected answer"
            value={state.answer}
            onChange={(e) =>
              onStateChange((oldState) => ({
                ...oldState,
                answer: e.target.value,
              }))
            }
          />
        </FormInput>
      </FillInGapQuestionSetterCardContainer>
    </OptionQuestionSetterCardContainer>
  );
}

type FillInGapQuestionSetterCardProps = {
  disableAll?: boolean;
  state: QuestionType;
  onStateChange: React.Dispatch<React.SetStateAction<QuestionType>>;
};

export function FillInGapQuestionSetterCard({
  disableAll,
  state,
  onStateChange,
}: FillInGapQuestionSetterCardProps) {
  return (
    <FillInGapQuestionSetterCardContainer>
      <FormInput>
        <label>Input Expected Answer</label>
        <input
          placeholder="provide the expected answer"
          value={state.answer}
          onChange={(e) =>
            onStateChange((oldState) => ({
              ...oldState,
              answer: e.target.value,
            }))
          }
        />
      </FormInput>
    </FillInGapQuestionSetterCardContainer>
  );
}
