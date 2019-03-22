import styled from "styled-components"
import { media } from "utils/Media"

const Hexagon = styled.div`
    width: 280px;
    height: 280px;
    margin: 0 0 0 -10px;
    position: relative;
    overflow: hidden;
    background: transparent;
    transform: rotate(-30deg) skewX(30deg) scaleY(.866);
    transition: opacity 200ms 0ms;
    cursor: pointer;
    
    @media ${media.md} {
        width: 200px;
        height: 200px;
    }
    
    &:before {
        position: absolute;
        right: 6.7%; 
        bottom: 0; 
        left: 6.7%; 
        top: 0;
        transform: scaleY(1.155) skewX(-30deg) rotate(30deg);
        background: ${props => props.theme.colors.turquoise};
        content: '';
    }
    
    &:not(.active) {
        &:before {
            position: absolute;
            right: 6.7%; 
            bottom: 0; 
            left: 6.7%; 
            top: 0;
            transform: scaleY(1.155) skewX(-30deg) rotate(30deg);
            background: ${props => props.theme.colors.purpleDark};
            background: -moz-linear-gradient(top, ${props => props.theme.colors.purpleDark} 0%, #ffffff 100%);
            background: -webkit-linear-gradient(top, ${props => props.theme.colors.purpleDark} 0%,#ffffff 100%);
            background: linear-gradient(to bottom, ${props => props.theme.colors.purpleDark} 0%,#ffffff 100%);
            filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='${props => props.theme.colors.purpleDark}', endColorstr='#ffffff',GradientType=0 );
            content: '';
        }
    }
`

export default Hexagon