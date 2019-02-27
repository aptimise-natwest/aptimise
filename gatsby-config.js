module.exports = {
	siteMetadata: {
		title: `Aptimise`,
		description: `Aptimise`,
		author: `dewynters`,
		siteUrl: `https://aptimise.com`
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		'gatsby-plugin-resolve-src',
		`gatsby-plugin-styled-components`,
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				precision: 8,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				output: `/sitemap.xml`,
				// Exclude specific pages or groups of pages using glob parameters
				// See: https://github.com/isaacs/minimatch
				// The example below will exclude the single `path/to/page` and all routes beginning with `category`
				exclude: [],
				query: `
				{
					site {
						siteMetadata {
							siteUrl
						}
					}
			
					allSitePage {
						edges {
							node {
								path
							}
						}
					}
				}`
			}
		},
		// {
		// 	resolve: `gatsby-plugin-manifest`,
		// 	options: {
		// 		name: `gatsby-starter-default`,
		// 		short_name: `starter`,
		// 		start_url: `/`,
		// 		background_color: `#663399`,
		// 		theme_color: `#663399`,
		// 		display: `minimal-ui`,
		// 		icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
		// 	},
		// },
		// {
		// 	resolve: `gatsby-plugin-google-tagmanager`,
		// 	options: {
		// 		id: "",

		// 		// Include GTM in development.
		// 		// Defaults to false meaning GTM will only be loaded in production.
		// 		includeInDevelopment: false,

		// 		// Specify optional GTM environment details.
		// 		// gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
		// 		// gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
		// 	},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.app/offline
		'gatsby-plugin-offline',
	],
}
