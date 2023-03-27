import styled from "styled-components"
import { seqLightBlue } from "../../globals/colors"



export const JobCardContainer = styled.div`
    background-color:white;
    padding:1rem .8rem;
    border-radius:10px;
    color:#000022;
    margin: 10px auto;
    /* width: 100%; */
    box-shadow:rgba(149, 157, 165, 0.2) 0px 8px 24px;
    h2 {
        font-weight:lighter;
        padding-bottom:.3rem;   
         color:#000022;
    }
    h3 {
        padding-bottom:.3rem;
    }
    & svg {
        color:${seqLightBlue};
    }
    span {
        background-color:#F2EEFCAB;
        display:inline-block;
        padding:.3rem .8rem;
        border-radius:5px;
        color:#000022;

    }
    p{
        padding:.4rem 0
    }
    @bp2 {
        width:360px
    }
`