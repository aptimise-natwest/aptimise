import React, { Component } from "react"
import styled from "styled-components"
import NatwestLogo from "components/shared/NatwestLogo";

const BrandBar = styled.div`
    width: 100%;
    padding: .5rem;
    text-align: center;
    background-color: ${props => props.theme.colors.purpleDark};
`

class HeaderBrandBar extends Component {
    render() {
        return(
            <BrandBar>
                <a href="https://natwest.com" target="_blank" rel="noopener noreferrer">
                    <NatwestLogo />
                </a>
            </BrandBar>
        )
    }
}

export default HeaderBrandBar