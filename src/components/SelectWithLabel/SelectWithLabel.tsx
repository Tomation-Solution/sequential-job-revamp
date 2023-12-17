import {FormSelect} from "../../globals/styles/forms.styles"


type SelectWithLabelType = {
    label: string;
    options: { value: string, label: string }[],
    setValue?: any;//for react-hook-form use;
    style?: React.CSSProperties;
    name: string;
    onChange?: (value: any) => void;
    defaultValue?:string;

}
const SelectWithLabel = ({onChange, label, options, setValue, defaultValue, style = {}, name}: SelectWithLabelType): React.ReactElement => {


    return (
        <FormSelect style={style}>
            <label>{label}</label>
            <select name="degree" defaultValue={defaultValue} onChange={e => {
                if (setValue) {
                    setValue(name, e.target.value)
                }
                if (onChange) {
                    onChange(e.target.value)
                }
            }}>
                <option value={""} >

                </option>
                {
                    options.map((data, index) => (
                        <option value={data.value} key={index}>
                            {data.value}
                        </option>
                    ))
                }
            </select>
        </FormSelect>
    )
}

export default SelectWithLabel