type Prop ={
    label:string;
    placeholder?:string;
    isTextArea?:boolean;
    register?:any;
    errorMessage?:string;
    type?:'password'|'text';
  }



const InputWithLabel = ({ type='text',errorMessage,label,placeholder='',isTextArea=false,register}:Prop):React.ReactElement=>{

    return <div>

    </div>
}




export default InputWithLabel