import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components";
import '../../scss/bootstrap.scss'
import theme from "../../utils/Theme"
import GlobalStyles from "../../utils/GlobalStyles"
import SEO from "../../utils/Seo"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

const SiteWrap = styled.div`
    padding-top: 95px;
    max-width: ${props => props.theme.transitionBase};
`

const Layout = ({children}) => {
	
	const data = useStaticQuery(graphql`
		query HeaderQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`)

	return(
		<ThemeProvider theme={theme}>
            <SiteWrap>
				<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
				<GlobalStyles />
				<Header siteTitle={data.site.siteMetadata.title} />
                <div style={{ minHeight: '100vh' }}></div>
				<main>{children}</main>
                <Footer />
            </SiteWrap>
		</ThemeProvider>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
