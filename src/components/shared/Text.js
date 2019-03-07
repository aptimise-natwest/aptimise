import styled from "styled-components"

const Text = styled.div`
    font-size: ${props => props.theme.font.size[props.size]};
    font-family: ${props => props.theme.font.family[props.weight]};
`

Text.defaultProps = {
    size: 'md',
    weight: 'light'
}

export default Text