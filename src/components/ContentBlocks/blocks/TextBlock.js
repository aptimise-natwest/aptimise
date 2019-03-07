import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import ContainerMaxWidth from "../../shared/ContainerMaxWidth"
import Text from "../../shared/Text"

const TextBlock = (props) => {

    const data = useStaticQuery(graphql`
        query {
            allContentBlocksJson {
                edges {
                    node {
                        id
                        size
                        weight
                        textHTML
                    }
                }
            }
        }
    `)

    // Retrieve block
    const block = data.allContentBlocksJson.edges.filter(
        ({ node }) => props.id === node.id
    )[0]

    const { size, weight, textHTML } = block.node

    return(
        <ContainerMaxWidth className="py-3">
            <Text 
                dangerouslySetInnerHTML={{ __html: textHTML }} 
                size={size} 
                weight={weight} 
            />
        </ContainerMaxWidth>
    )
}

TextBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default TextBlock