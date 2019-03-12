import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const ModalAngledCloseStyled = styled.button`
    position: absolute;
    top: -4rem;
    left: 50%;
    transform: translateX(-50%);
    color: ${props => props.theme.colors.purpleDark};
    font-size: 2rem;
    cursor: pointer;
    border: 0;
    background-color: transparent;
`

const ModalAngledClose = (props) => (
    <ModalAngledCloseStyled {...props}>
        <FontAwesomeIcon icon={faTimes} />
    </ModalAngledCloseStyled>
)

export default ModalAngledClose