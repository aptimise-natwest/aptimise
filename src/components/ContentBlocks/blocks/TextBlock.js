import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"

const TextBlock = (props) => {

    const markdown = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        id
                        html
                        frontmatter {
                            size
                        }
                    }
                }
            }
        }
    `)

    // Retrieve block
    const block = markdown.allMarkdownRemark.edges.filter(
        ({ node }) => props.id === node.id
    )[0]

    const { html } = block.node
    const { size } = block.node.frontmatter

    return(
        <ContainerMaxWidth className="py-3">
            <Text dangerouslySetInnerHTML={{ __html: html }} size={size} />
        </ContainerMaxWidth>
    )
}

TextBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default TextBlock