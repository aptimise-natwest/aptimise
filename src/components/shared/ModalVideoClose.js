import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { media } from "utils/Media";

const ModalVideoCloseStyled = styled.button`
  position: absolute;
  z-index: 10;
  top: 10px;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1em;
  cursor: pointer;
  border: 0;
  background-color: ${props => props.theme.colors.purple};

  &:before {
    // content: "Close ";
    top: 10px;
    right: 10px;
  }

  @media ${media.lg} {
    transform: unset;
    right: 10px;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    top: 5px;
    font-size: 1.8em;
    left: unset;
    &:before {
      content: "";
    }
  }
`;

const ModalVideoClose = props => (
  <ModalVideoCloseStyled {...props}>
    <FontAwesomeIcon icon={faTimes} />
  </ModalVideoCloseStyled>
);

export default ModalVideoClose;
