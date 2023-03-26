import Button from "../Button/Button"
import { GreetingContainer } from "./Greetings.style"
import TickImg from '../../assets/tick.png'


type Prop ={
    title:string;
    body:string;
    onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void,
    buttonName?:string
}
const Greetings = ({title,body,onClick,buttonName='Go Home'}:Prop):React.ReactElement=>{
    return (
    <GreetingContainer> 
        <img src={TickImg} alt="mark icon" /> 
        <h2>{title}</h2>
        <p>{body}</p>
        <Button style={{'width':'200px','margin':'0 auto'}} onClick={(e)=>{
            onClick(e)
        }}>{buttonName}</Button>
    </GreetingContainer>
    )
}
export default Greetings