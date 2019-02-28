import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components";

import 'scss/bootstrap.scss'
import theme from "utils/Theme"
import GlobalStyles from "utils/GlobalStyles"
import Header from "components/Header/Header"

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
				<GlobalStyles />
				<Header siteTitle={data.site.siteMetadata.title} />
				<main>{children}</main>
                <div style={{ minHeight: '100vh' }}></div>
            </SiteWrap>
		</ThemeProvider>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
