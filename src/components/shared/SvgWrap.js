import styled from "styled-components"

// Ie fix
const SvgWrap = styled.div`
    position: relative; 
    height: 0; 
    width: 100%; 
    padding: 0;
    padding-bottom: 100%; 

    svg {
        position: absolute; 
        height: 100%; 
        width: 100%; 
        left: 0; 
        top: 0;
    }
`
export default SvgWrap