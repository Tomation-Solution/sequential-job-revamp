import { FormSelect } from "../../globals/styles/forms.styles"



type SelectWithLabelType ={
    label:string;
    options:{value:string,label:string}[],
    setValue?:any;//for react-hook-form use;
    style?: React.CSSProperties;
    name:string;
    onChange?:(value:any)=>void

}
const SelectWithLabel = ({onChange,label,options,setValue,style={},name}:SelectWithLabelType):React.ReactElement=>{



    return (
        <FormSelect style={style}>
            <label>{label}</label>
                <select name="degree" onChange={e=>{
                    if(setValue){
                        setValue(name,e.target.value)
                    }
                    if(onChange){
                        onChange(e.target.value)
                    }
                }}>
                    {
                        options.map((data,index)=>(
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