import { useState } from "react";
import Dropdown from "../../globals/Dropdown/Dropdown";
import CompanyNavBar, {
  CompanyNavBarTab,
} from "../Company-NavBar/CompanyNavBar";
import { CompanyJobTestManagementContainer } from "./CompanyJobTestManagement.styles";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";
import { FlexBox } from "../../globals/styles/FlexBox";
import Button from "../Button/Button";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import { QuestionSetterCard } from "../../globals/QuestionSetterCard/QuestionSetterCard";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { useForm, useFieldArray } from "react-hook-form";

type Props = {};

function CompanyJobTestManagement({}: Props) {
  const [dropdownOption, setDropdownOption] = useState<string>("foodjob");

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      title: "",
      fill_in_gap_quetion: [
        {
          quetion: "",
          answer: "",
          quetion_mark: "",
        },
      ],
      option_quetion: [
        {
          quetion: "",
          option_to_choose_from: [""],
          answer: "",
          quetion_mark: "",
        },
      ],
      multi_choice_quetion: [],
    },
  });

  // const fillGapQuestions = useFieldArray({
  //   name: "fill_in_gap_quetion",
  //   control,
  // });

  // const optionQuestion = useFieldArray({
  //   name: "option_quetion",
  //   control,
  // });

  const onSubmitHandler = (inputData: any) => {
    console.log(inputData);
  };

  // console.log("errors", errors);

  return (
    <>
      <CompanyNavBar>
        <CompanyNavBarItemsContainer>
          <Dropdown
            disabledOption="Select a Job"
            options={[
              { label: "cookingjob", value: "cookingjob" },
              { label: "sleepingjob", value: "sleepingjob" },
              { label: "foodjob", value: "foodjob" },
            ]}
            onChange={setDropdownOption}
            defaultValue={dropdownOption}
          />
          <CompanyNavBarTab isSelected={true}>Set Test</CompanyNavBarTab>
          <CompanyNavBarTab>Set Test</CompanyNavBarTab>
        </CompanyNavBarItemsContainer>
      </CompanyNavBar>

      <CompanyJobTestManagementContainer>
        <FlexBox justifyContent="space-between">
          <p>Select job you want to set test for above</p>

          <Button>Continue to set test cut off</Button>
        </FlexBox>

        <main>
          <div className="left">
            <h2>Business Development</h2>
            <h3 style={{ fontWeight: "400" }}>
              Set Test Questions and Answers
            </h3>
            <p style={{ textAlign: "center" }}>
              In other to ease the recruiutment selection process, It is
              important that you set a pre-test that would help sort out
              qualified candidates during application submission.
            </p>

            <div
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <InputWithLabel
                isTextArea={true}
                label="Instructions"
                register={register("title", { required: true })}
              />
            </div>

            <QuestionSetterCard disableAll={false} />

            <div className="upload-question">
              <AiOutlinePlusCircle size={30} />
              <p>Or Upload Questions</p>
            </div>

            <Button onClick={handleSubmit(onSubmitHandler)}>test submit</Button>
          </div>

          <div className="right">CompanyJobTestManagement</div>
        </main>
      </CompanyJobTestManagementContainer>
    </>
  );
}

export default CompanyJobTestManagement;
