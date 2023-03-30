import styled from "styled-components";


export const JobDetailComponentContainer= styled.div`
  color:black;
  padding:0 .5rem;
  /* background-color:white; */
text-align: center;

  @media screen and (min-width: 500px) {
    text-align:center;
    max-width:600px;
    margin:0 auto;
  }
`
export const JobTitleContainer = styled.div`
  padding:'.5rem 0';
  display:flex;
  align-items:center;
  justify-content:space-between;
& h2 {
    width:90%;
}
& div{
    width:20%;
    // 'border':'1px solid red',
    max-width:50px;
    display:flex;
    justify-content:space-between
}
`

export const MoreDetailInfo =styled.div`

@media screen and (min-width: 500px) {
    
    display:flex;
    justify-content:space-between;
    alignItems:center;
    width:300px;
    margin:0 auto;
    .job_details{
        display:flex
    }

}
`