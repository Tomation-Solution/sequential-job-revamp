import styled from "styled-components";


export const EmptyDataIndicatorContainer = styled.div<{height: string | undefined}>`
    display: grid;
    place-items: center;
    width: 100%;
    height: ${props => props.height || "100%"}
`;