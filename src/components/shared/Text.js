import styled from "styled-components"

const Text = styled.div`
    font-size: ${props => props.theme.font.size[props.size]};
`

Text.defaultProps = {
    size: 'md'
}

export default Text