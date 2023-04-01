import React from 'react'
import {ButtonStyle} from './Button.style'


export type ButtonProp =React.PropsWithChildren<{
  'styleType'?:'pry'|'sec'|'whiteBg'|'danger',
  'style'?:{
    [Key:string]:string,
  },
  onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
  isLoading?:boolean;
  type?:"button" | "reset" | "submit";
  disabled?:boolean
}>


// export type PropStyle={
//   'styleType'?:'pry'|'sec',
//   'width'?:string,

// }
const Button = ({children,styleType='pry',isLoading=false,type='button',...rest}:ButtonProp):React.ReactElement=>{


  return (
    <ButtonStyle styleType={styleType} disabled={isLoading}   
    whileTap={{ scale: 0.9 }}
    animate={{
      transition: {
        type:'spring',
        stiffness:70
      }
    }}
    type={type}
    {...rest}>
      {isLoading?'Loading...':children}
    </ButtonStyle>
  )
}




export default Button