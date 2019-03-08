import styled, { css } from "styled-components"
import { Modal } from "reactstrap"
import { media } from "utils/Media"
import panelLeft from "images/backgrounds/panel-left.png"
import panelRight from "images/backgrounds/panel-right.png"

const ModalAngled = styled(Modal)`
    width: 100%;
    max-width: 100%;
    min-height: 100%;
    min-height: 100%;
    display: flex;
    align-items: flex-end;
    margin: 0;

    .fade & {
        transform: translate3d(0, 100vh, 0);
    }

    .in & {
        transform: translate3d(0, 0, 0);
    }

    /* &:before,
    &:after {
        content: "";
        position: absolute;
        top: 0;
        background-color: ${props => props.theme.colors.white};
        width: 50%;
        height: 50%;
        left: -20%;
        top: -10%;
        background-color: #ffffff;
        width: 100%;
        height: 400px;
        border: 4px solid black;
        transform: rotate(-25deg);
        z-index: 5;
    }

    &:after {
        left: auto;
        right: -20%;
        transform: rotate(25deg);
    } */

    .modal-content {
        border-radius: 0;
        min-height: 80vh;

        ${props => props.background && css`
            @media ${media.md} {
                background-image: url(${panelLeft}), url(${panelRight});
                background-repeat: no-repeat;
                background-position: -150px center, calc(100% + 200px) center;
            }
            @media ${media.lg} {
                background-position: -20% center, 120% center;
            }
            @media ${media.xl} {
                background-position: left center, right center;
            }
        `}
    }
`

export default ModalAngled