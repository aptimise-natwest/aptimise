/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
        graphql(`
            {
                allMarkdownRemark {
                    edges {
                        node {
                            id
                            fileAbsolutePath
                        }
                    }
                }
            }
        `).then(result => {
            if (result.errors) reject(result.errors)

            // Nodes
            const nodes = result.data.allMarkdownRemark.edges

            // Filter nodes that that are contained in __blocks directories as these are not pages but content blocks
            const pages = nodes.filter(
                ({ node }) => node.fileAbsolutePath.indexOf('/__blocks/') <= 0
            )

            // Loop pages, retrieve path and create the page
            pages.forEach(({ node }) => {
                graphql(`
                {
                    markdownRemark(id: { eq: "${node.id}" }) {
                        id
                        frontmatter {
                            path
                        }
                    }
                }
                `).then(result => {

                    const pagePath = result.data.markdownRemark.frontmatter.path

                    // Create the page
                    createPage({
                        path: pagePath,
                        component: path.resolve(`./src/templates/TemplateSelector.js`),
                        context: {
                            // Data passed to context is available in page queries as GraphQL variables.
                            id: node.id,
                        },
                    })

                })
            })

            resolve()
        })
    })
};