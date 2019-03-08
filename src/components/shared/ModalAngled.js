import styled from "styled-components"
import { Modal } from "reactstrap"

const ModalAngled = styled(Modal)`
    width: 100%;
    max-width: 100%;
    min-height: 100%;
    min-height: 100%;
    display: flex;
    align-items: flex-end;
    margin: 0;

    .modal-content {
        border-radius: 0;
        min-height: 80vh;

        &:after,
        &:before {
            content: "";
            position: absolute;
            top: 0;
            background-color: ${props => props.theme.colors.white};
            width: 50%;
        }
    }
`

export default ModalAngled