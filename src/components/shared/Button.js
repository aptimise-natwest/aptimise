import styled, { css } from "styled-components"

const Button = styled.a`
    cursor: pointer;
    display: inline-block;
    text-align: center;
    user-select: none;
    vertical-align: middle;
    padding: .5rem 1rem;
    background-color: ${props => props.theme.colors.purpleDark};
    text-decoration: none;
    color: ${props => props.theme.colors.white};
    transition: ${props => props.theme.transitionBase};

    &:hover {
        background-color: ${props => props.theme.colors.grey};
        color: ${props => props.theme.colors.white};
        text-decoration: none;
    }

    ${props => props.grey && css`
        background-color: ${props => props.theme.colors.grey};
        color: ${props => props.theme.colors.white};
        &:hover {
            background-color: ${props => props.theme.colors.purpleDark};
        }
    `}

`
export default Button