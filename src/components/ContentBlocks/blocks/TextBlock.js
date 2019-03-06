import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"

const TextBlock = (props) => {

    const data = useStaticQuery(graphql`
        query {
            allContentBlocksJson {
                edges {
                    node {
                        id
                        content
                        size
                    }
                }
            }
        }
    `)

    // Retrieve block
    const block = data.allContentBlocksJson.edges.filter(
        ({ node }) => props.id === node.id
    )[0]

    const { content, size } = block.node

    return(
        <ContainerMaxWidth className="py-3">
            <Text dangerouslySetInnerHTML={{ __html: content }} size={size} />
        </ContainerMaxWidth>
    )
}

TextBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default TextBlock