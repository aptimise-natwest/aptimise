import React, { Component } from "react"
import PropTypes from "prop-types"
import styled, { ThemeProvider } from "styled-components";
import "scss/bootstrap.scss"
import theme from "utils/Theme"
import GlobalStyles from "utils/GlobalStyles"
import SEO from "utils/Seo"
import Header from "components/Header/Header"
import Footer from "components/Footer/Footer"
import ModalBookDemo from "components/shared/ModalBookDemo"

const SiteWrap = styled.div`
    padding-top: 95px;
`

class Layout extends Component {
    render() {

        let SEOMarkup
        if (this.props.dynamicPage) {
            const {
                title,
                metaDescription
            } = this.props.data.pagesJson
            SEOMarkup = <SEO title={title} description={metaDescription} />
        }
        
        return (
            <ThemeProvider theme={theme}>
                <SiteWrap>
                    {SEOMarkup}
                    <GlobalStyles />
                    <Header data={this.props.data} />
                    TESTING
                    <main>{this.props.children}</main>
                    <Footer />
                    <ModalBookDemo />
                </SiteWrap>
            </ThemeProvider>
        )
    }
}

Layout.defaultProps = {
    dynamicPage: true
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout