import styled from "styled-components"

const Text = styled.div`
    font-size: ${props => props.theme.font.size[props.size]};
    font-family: ${props => props.theme.font.family[props.weight]};
    color: ${props => props.theme.colors[props.color]};
`

Text.defaultProps = {
    size: 'md',
    weight: 'regular',
    color: 'blackOff'
}

export default Text