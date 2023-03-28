import styled from "styled-components"

export const FixedLoading = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`


export const AbsoluteLoading =styled.div`
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const ImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%
}
`