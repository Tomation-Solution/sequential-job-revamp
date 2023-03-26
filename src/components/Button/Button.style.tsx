import styled from 'styled-components';

import { ButtonProp } from './Button';
import { createExternalStyle } from '../../utils/extraFunction';
import { seqLightBlue,seqWhite } from '../../globals/colors';
import { motion } from 'framer-motion';


export const ButtonStyle = styled(motion.button)<ButtonProp>`
  
 border: transparent;
 padding: .7rem 1rem;
border-radius: 10px;
cursor: pointer;
/* this code makes the icon if there is one to fit with the button word */
display: flex;
align-items: center;
justify-content: space-between;
justify-content: center;

${(prop)=>{
    let style;
    if(prop.styleType==='pry'){
      style = `background-color:${seqLightBlue};color: ${seqWhite};font-weight: 600;padding: 1rem 1rem;`
    }else{
      style = `background-color:transparent;color: ${seqLightBlue};font-weight: 600;border:1px solid  ${seqLightBlue};`
    }
    return style
  }};
  ${(props)=>createExternalStyle(props)}
  
  `