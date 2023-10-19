
import { seqLightBlue } from "../globals/colors";
import { DropdownContainer } from '../globals/Dropdown/Dropdown.styles';
import { BsFillBagFill } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import { getAllCompanyJobs } from "../redux/api/company/jobs-test-management.api";
import { useCustomFetcher } from "../utils/fetcher";
import { JobType } from "./Company-Job-Test-Management/types";
import moment from "moment";


type OptionType = {
    label: string;
    value: string;
  };
  
type Prop ={
    onChange: React.Dispatch<React.SetStateAction<any>>;
    defaultValue: string[] | string;
    multiple?: boolean;
    disabledOption: string;
    disabledValue?: string;
}
const JobDropDownSelect = ({
    onChange,
    multiple,
    disabledOption,
    defaultValue,
    disabledValue = "",
}:Prop)=>{

    const { loadingState, isError, data } = useCustomFetcher<JobType[]>(
        "all-jobs",
        getAllCompanyJobs,
        (data) =>
          data.data.map((item: any) => ({
            id: item.id,
            job_title: item.job_title,
            created_at: item.created_at,
          }))
      );

      
  if (isError || data?.length! <= 0 || !data) {
    return (
      <p>Oops something went wrong</p>
    );
  }
    return (
        <DropdownContainer>
        <BsFillBagFill color={seqLightBlue} className="svg1" />
        <AiFillCaretDown color={seqLightBlue} className="svg2" />
        <select
          defaultValue={defaultValue}
          multiple={multiple}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value={disabledValue} disabled>
            {disabledOption}
          </option>
          {[
              { label: "Clear Filter", value: "" },
              ...data.map((item) => ({
                label: `${item.job_title} // ${moment(
                  new Date(item.created_at)
                ).format("MMM Do YY")}`,
                value: `${item.id}`,
              })),
            ].map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </DropdownContainer>
    )
}


export default JobDropDownSelect