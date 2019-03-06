import styled from "styled-components"
import { Container } from "reactstrap"

const ContainerMaxWidth = styled(Container)`
    max-width: ${props => props.theme.sizes.xxl};
`

export default ContainerMaxWidth