import styled from "styled-components";



export const JobListContainer = styled.div`
    
    display:flex;
    justify-content:space-between;
    max-width:1600px;
    margin:0 auto;
    flex-wrap:wrap;

    @media screen and (min-width: 800px){
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 10px;
    }

`