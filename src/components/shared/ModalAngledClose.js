import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { media } from "utils/Media"

const ModalAngledCloseStyled = styled.button`
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
    color: ${props => props.theme.colors.purpleDark};
    font-size: 2rem;
    cursor: pointer;
    border: 0;
    background-color: transparent;

    @media ${media.md} {
        top: -4rem;
    }

    @media ${media.lg} {
        top: -6rem;
    }
`

const ModalAngledClose = (props) => (
    <ModalAngledCloseStyled {...props}>
        <FontAwesomeIcon icon={faTimes} />
    </ModalAngledCloseStyled>
)

export default ModalAngledClose