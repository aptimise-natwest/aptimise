/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`);

// Add parent directory name to node to create a relationship between the page and the block
exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const parentDirectory = node.fileAbsolutePath.split("src/data/")[1].split("/")[1]
        createNodeField({
            node,
            name: `page`,
            value: parentDirectory
        })
    }
}

// Dynamically create pages based from /src/data/pages/
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
                            frontmatter {
                                path
                            }
                        }
                    }
                }
            }
        `).then(result => {
            if (result.errors) reject(result.errors)

            // Nodes
            const nodes = result.data.allMarkdownRemark.edges

            // Filter out nodes that are contained in __blocks directories as these are not pages but content blocks
            const pages = nodes.filter(
                ({ node }) => node.fileAbsolutePath.indexOf('/__blocks/') <= 0
            )

            // Loop pages to create the page
            pages.forEach( ({ node }) => {    
                // Create the page
                createPage({
                    path: node.frontmatter.path,
                    component: path.resolve(`./src/templates/TemplateSelector.js`),
                    context: {
                        // Data passed to context is available in page queries as GraphQL variables.
                        id: node.id
                    }
                })

            })

            resolve()
        })
    })
}