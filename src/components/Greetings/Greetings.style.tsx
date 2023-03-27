import styled from "styled-components";
export const GreetingContainer= styled.div`
    padding: 1rem;
    color: #000022;
    text-align: center;
    max-width: 560px;
    display: block;
    img{
        width: 22px;
        height: 22px;
        /* display: block; */
    }
    h2{
        font-size: 1.5rem;
    }
    p{
        padding: 1rem 0;
    }
    @media screen and (min-width: 500px) {
        h2{font-size:2rem}
        p{
        padding: 1rem 6rem;
        }
    }
`