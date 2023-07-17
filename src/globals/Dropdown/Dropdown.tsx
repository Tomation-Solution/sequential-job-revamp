import { seqLightBlue } from "../colors";
import { DropdownContainer } from "./Dropdown.styles";
import { BsFillBagFill } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";

type OptionType = {
  label: string;
  value: string;
};

type Props = {
  options: OptionType[];
  onChange: React.Dispatch<React.SetStateAction<any>>;
  defaultValue: string[] | string;
  multiple?: boolean;
  disabledOption: string;
  disabledValue?: string;
};

function Dropdown({
  options,
  onChange,
  multiple,
  disabledOption,
  defaultValue,
  disabledValue = "",
}: Props) {
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
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </DropdownContainer>
  );
}

export default Dropdown;
