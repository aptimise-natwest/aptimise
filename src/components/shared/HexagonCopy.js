import styled from "styled-components"

const HexagonCopy = styled.div`
    position: absolute;
    right: 6.7%;
    bottom: 0;
    left: 6.7%;
    top: 0;
    transform: scaleY(1.155) skewX(-30deg) rotate(30deg);
    opacity: ${props => props.copyOpacity};
    transition: opacity 200ms 0ms;
    
    div {
        color: #ffffff;
        font-size: 2.25rem;
        padding: 0;
        font-weight: 700;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
`

export default HexagonCopy