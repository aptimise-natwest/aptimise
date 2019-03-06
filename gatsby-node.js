/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`);

// Dynamically create pages based from /src/data/pages.json
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
        graphql(`
            {
                allPagesJson {
                    edges {
                        node {
                            id
                            path
                        }
                    }
                }
            }
        `).then(result => {
            if (result.errors) reject(result.errors)

            // Nodes
            const pages = result.data.allPagesJson.edges

            // Loop pages to create the page
            pages.forEach( ({ node }) => {    
                // Create the page
                createPage({
                    path: node.path,
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