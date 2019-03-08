import { Container } from "reactstrap"
import styled from "styled-components"
import { media } from "utils/Media"

const ContainerMaxWidth = styled(Container)`
    max-width: ${props => props.theme.sizes.xxl};
    padding-left: 2rem;
    padding-right: 2rem;

    @media ${media.md} {
        padding-left: 4rem;
        padding-right: 4rem;
    }

`

export default ContainerMaxWidth