import styled, { css } from "styled-components"
import { Modal } from "reactstrap"
import { media } from "utils/Media"
import panelLeft from "images/backgrounds/panel-left.png"
import panelRight from "images/backgrounds/panel-right.png"
import angledPanel from "images/backgrounds/angled-panel.svg"

const ModalAngled = styled(Modal)`
    width: 100%;
    max-width: 100%;
    min-height: 100%;
    min-height: 100%;
    display: flex;
    align-items: flex-end;
    margin: 0;

    .fade & {
        transform: translate3d(0, 100vh, 0) !important;
    }

    .show & {
        transform: translate3d(0, 0, 0) !important;
    }

    .modal-content {
        border-radius: 0;
        border: 0;
        background-color: transparent;


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


    .modal-body {
        min-height: 80vh;
        margin-top: 20vh;
        background-color: ${props => props.theme.colors.white};

        &:before {
            content: "";
            position: absolute;
            background-image: url(${angledPanel});
            background-repeat: no-repeat;
            background-size: 120%;
            background-position: bottom center;
            width: 100%;
            height: 21vh;
            left: 0;
            bottom: 99%;
        }
    }
`

export default ModalAngled