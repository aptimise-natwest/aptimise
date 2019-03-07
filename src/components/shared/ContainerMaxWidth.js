import { Container } from "reactstrap"
import styled from "styled-components"
import { media } from '../../utils/media';

const ContainerMaxWidth = styled(Container)`
    max-width: ${props => props.theme.sizes.xxl};

    @media ${media.md} {
        padding-left: 4rem;
        padding-right: 4rem;
    }

`

export default ContainerMaxWidth