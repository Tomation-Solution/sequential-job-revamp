import { ReactElement, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../../hooks/useToastify";
import { useMutation, useQuery } from "react-query";
import { getJobTest, submitJobTestQuetion } from "../../redux/api/jobs.api";
import Preloader from "../../components/Preloader/Preloader";
import Button from "../../components/Button/Button";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";

export type FillInTheGapTakeTestType = {
  id: number;
  answer: string;
  quetion: string;
};
export type CvFilterTestType = {
  job_id: number;
  fill_in_the_gap: FillInTheGapTakeTestType[];
  filter_quetion_option: {
    id: number;
    quetion: string;
    option_to_choose_from: string[];
    answer: string;
  }[];
  filter_quetion_multi_choice_quetion: {
    id: number;
    answer: string[];
    option_to_choose_from: string[];
    quetion: string;
  }[];
};
const schema = yup.object({
  fill_in_the_gap: yup.array().of(
    yup.object({
      quetion: yup.string(),
      answer: yup.string().required("this field is needed"),
      id: yup.number(),
    })
  ),
  filter_quetion_option: yup.array().of(
    yup.object({
      quetion: yup.string(),
      answer: yup.string().required("this field is needed"),
      option_to_choose_from: yup.array().of(yup.string()),
      id: yup.number(),
    })
  ),

  filter_quetion_multi_choice_quetion: yup.array().of(
    yup.object({
      quetion: yup.string(),
      answer: yup.array().of(yup.string()),
      option_to_choose_from: yup.array().of(yup.string()),
      id: yup.number(),
    })
  ),
});

const JobTestPage = (): ReactElement => {
  const navigate = useNavigate();
  const { notify } = useToast();
  const { job_id } = useParams();
  // const [finalData ,setFinalData] = useState<CvFilterTestType>({} as CvFilterTestType );
  const { status, isLoading, data } = useQuery(
    "get_job_test",
    () => getJobTest(typeof job_id == "string" ? job_id : "-"),
    {
      onSuccess: (data) => {
        console.log({ "data Gotten": data });
      },
      onError: (error) => {},
      enabled: typeof job_id == "string" ? true : false,
    }
  );

  const { mutate: submitQUetions, isLoading: submitting } = useMutation(
    submitJobTestQuetion,
    {
      onSuccess: (data) => {
        notify("Submitted", "success");
        navigate("/test-management");
        // v(`/job_seeker/test_quetion/notice/`)
      },
      onError: (err) => {
        notify("Error!", "error");
        console.log({ err });
      },
    }
  );

  const { register, control, setValue, handleSubmit } =
    useForm<CvFilterTestType>({
      //@ts-ignore
      resolver: yupResolver(schema),
      mode: "onBlur",
    });

  const { fields } = useFieldArray({
    name: "fill_in_the_gap",
    control,
  });

  const { fields: filter_quetion_options } = useFieldArray({
    name: "filter_quetion_option",
    control,
  });

  const onSubmit = (submmited: CvFilterTestType) => {
    console.log({ "submitted Data": submmited });
    if (typeof job_id == "string") {
      submitQUetions({
        job_id: parseInt(job_id),
        data: { title: "...", ...submmited },
      });
    }
  };

  useEffect(() => {
    if (status === "success") {
      setValue(
        "fill_in_the_gap",
        data.fill_in_the_gap.map((data) => {
          return {
            answer: "",
            id: data.id,
            quetion: data.quetion,
          };
        })
      );
      setValue(
        "filter_quetion_option",
        data.filter_quetion_option.map((data) => {
          return {
            id: data.id,
            quetion: data.quetion,
            option_to_choose_from: data.option_to_choose_from,
            answer: "",
          };
        })
      );
      setValue(
        "filter_quetion_multi_choice_quetion",
        data.filter_quetion_multi_choice_quetion.map((data) => {
          return {
            id: data.id,
            quetion: data.quetion,
            option_to_choose_from: data.option_to_choose_from,
            answer: [],
          };
        })
      );
    }
    // eslint-disable-next-line
  }, [status]);
  return (
    <div>
      <Preloader loading={isLoading || submitting} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <br />
          {fields.map((data, index) => (
            <div key={data.id}>
              <h2>
                {data.quetion}?{"  "} <span>____</span>
              </h2>
              <br />
              <InputWithLabel
                label="Answer"
                register={register(`fill_in_the_gap.${index}.answer`)}
              />
              <br />

              {/* register(`fill_in_the_gap.${index}.answer` */}
            </div>
          ))}
          <br />
          <br />
          {filter_quetion_options.map((data, findex) => (
            <div key={data.id}>
              <h2>
                {data.quetion}?{"  "} <span>____</span>
              </h2>

              {data.option_to_choose_from.map((option: string, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    maxWidth: "400px",
                    padding: "1rem 0",
                  }}
                >
                  {/* <CheckBox

                                    onCheck={()=>{
                                    setValue(`filter_quetion_option.${findex}.answer`,option)
                                    }}
                                    /> */}
                  <input
                    type="radio"
                    name={"filter_quetion_options" + findex}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setValue(
                        `filter_quetion_option.${findex}.answer`,
                        option
                      );
                    }}
                  />
                  <p style={{ margin: "0 10px" }}>{option}</p>
                </div>
              ))}
            </div>
          ))}
          <br />
          <br />
          <br />
          <Button type="submit">Submit</Button>
          <br />
          <br />
          <br /> <br />
          <br />
          <br />
        </div>
      </form>
    </div>
  );
};

export default JobTestPage;
