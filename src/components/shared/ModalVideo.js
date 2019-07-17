import styled, { css } from "styled-components";
import { Modal } from "reactstrap";
import { media } from "utils/Media";

const ModalVideo = styled(Modal)`
  width: 100%;
  max-width: 100%;
  height: 100%;
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
    height: 100%;
  }

  .modal-body {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.96);
    display: flex;
    align-items: center;
    padding: 25px 0 45px;
  }
`;

export default ModalVideo;
