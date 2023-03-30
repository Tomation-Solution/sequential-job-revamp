

import React from 'react'
import { seqBlue100 } from '../../globals/colors';

type Prop = React.PropsWithChildren<{
  is_selected?:boolean;
  choosed?:boolean
}>
 const InterviewDateSelect = ({children,is_selected=false,choosed=false}:Prop):React.ReactElement => {
  return (
   <div style={{'padding':'.9rem .6rem','backgroundColor':is_selected?'white':'rgba(23, 18, 18, 0.189)',
   'color':is_selected?`${seqBlue100}`:'white','width':'120px','textAlign':'center','borderRadius':'10px',
   'border':`2px solid ${choosed?`${seqBlue100}`:'transparent'}`
   }}>
     
      <p>  {children}</p>
   </div>
  )
}


export default InterviewDateSelect

