import styled, { css } from "styled-components"
import { media } from "utils/Media"

const Button = styled.a`
    cursor: pointer;
    display: ${props => (props.display==='false')?'none':'inline-block'}; 
    text-align: center;
    font-family: ${props => props.theme.font.family.base};
    font-size: ${props => props.theme.font.size.md};
    background-color: ${props => props.theme.colors.purpleDark};
    color: ${props => props.theme.colors.white};
    padding: .5rem 1rem;
    text-decoration: none;
    user-select: none;
    vertical-align: middle;
    transition: ${props => props.theme.transitionBase};
    border: 0;

    &:hover {
        background-color: ${props => props.theme.colors.grey};
        color: ${props => props.theme.colors.blackOff};
        text-decoration: none;
    }

    &:not([href]):not([tabindex]) {
        color: ${props => props.theme.colors.white};
        &:hover {
            color: ${props => props.theme.colors.blackOff};
        }
    }

    ${props => props.grey && css`
        color: ${props => props.theme.colors.blackOff};
        background-color: ${props => props.theme.colors.grey};
        &:hover {
            color: ${props => props.theme.colors.white};
            background-color: ${props => props.theme.colors.purpleDark};
        }
    `}

    ${props => props.purple && css`
        background-color: ${props => props.theme.colors.purple};
        color: ${props => props.theme.colors.white};
        &:hover {
            color: ${props => props.theme.colors.white};
            background-color: ${props => props.theme.colors.grey};
        }
    `}

	${props => props.yellow && css`
        background-color: ${props => props.theme.colors.yellow};
        color: ${props => props.theme.colors.white};
        &:hover {
            color: ${props => props.theme.colors.white};
            background-color: ${props => props.theme.colors.grey};
        }
    `}

	${props => props.turquoise && css`
        background-color: ${props => props.theme.colors.turquoise};
        color: ${props => props.theme.colors.white};
        &:hover {
            color: ${props => props.theme.colors.white};
            background-color: ${props => props.theme.colors.grey};
        }
    `}

    ${props => props.blockMobile && css`
        width: 100%;
        @media ${ media.md } {
            width: auto;
        }
    `}

    ${props => props.block && css`
        width: 100%;
    `}
`

export default Button