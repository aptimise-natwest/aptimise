import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeProvider } from "styled-components";
import theme from "utils/Theme"
import GlobalStyles from "utils/GlobalStyles"

import Header from "components/Header/Header"

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
			<>
				<GlobalStyles />
				<Header siteTitle={data.site.siteMetadata.title} />
				<main>{children}</main>
			</>
		</ThemeProvider>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
