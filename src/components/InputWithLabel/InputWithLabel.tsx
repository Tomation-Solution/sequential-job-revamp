import { FormInput } from "../../globals/styles/forms.styles";
import {AiFillEye} from 'react-icons/ai';
import {BsEyeSlashFill} from 'react-icons/bs'
import { useState } from 'react';



type Prop ={
    label:string;
    placeholder?:string;
    isTextArea?:boolean;
    register?:any;
    errorMessage?:string;
    type?:'password'|'text';
    style?: React.CSSProperties;
    // containerStyle:
  }



const InputWithLabel = ({style={}, type='text',errorMessage,label,placeholder='',isTextArea=false,register}:Prop):React.ReactElement=>{
  const [show,setShow] = useState(false);
  
  const decideType =():string=>{
    if(type=='password'){
      return show?'text':'password'
    }
    return 'text'
  }
  const RenderIcon = ()=>{
    return (
      <>
        {
          show?
            <BsEyeSlashFill onClick={(e)=> setShow(false)}/>
            :
            <AiFillEye onClick={(e)=> setShow(true)}/>
        }
      </>
    )
  }
    return(
      <FormInput style={style}>
        <label htmlFor={label}>{label}</label>
      {type==='password'&&<RenderIcon/>}

        {
          !isTextArea?
          <input  type={decideType()} id={label}  placeholder={placeholder} {...register} />
        :
        <textarea placeholder={placeholder}  id={label}>

        </textarea>
        }
        <span style={{'color':'crimson'}}>{errorMessage}</span>
      </FormInput>
    )
}




export default InputWithLabel