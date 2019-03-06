import React, { Component } from "react"
import HeaderBrandBar from "./HeaderBrandBar"
import HeaderNavBar from "./HeaderNavBar"
import styled from "styled-components"

const HeaderWrap = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: ${props => props.theme.transitionBase};
`

class Header extends Component {

    constructor(props) {
        super(props)
        this.brandBarPosition = this.brandBarPosition.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.brandBarPosition)
    }

    brandBarPosition() {
        const scrollPosition = window.pageYOffset
        const brandBarHeight = 43
        this.headerWrap.style.transform = scrollPosition > 10 ? `translateY(-${brandBarHeight}px)` : 'translateY(0px)' 
    }

    render() {
        return(
            <HeaderWrap ref={(headerWrap) => this.headerWrap = headerWrap}>
                <HeaderBrandBar />
                <HeaderNavBar />
            </HeaderWrap>
        )
    }
} 

export default Header
