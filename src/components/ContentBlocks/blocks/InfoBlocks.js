import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"

const InfoBlocks = (props) => {

    const data = useStaticQuery(graphql`
        query {
            allContentBlocksJson {
                edges {
                    node {
                        id
                        infoBlocks {
                            animation
                            title
                            textHTML
                        }
                    }
                }
            }
        }
    `)

    // Retrieve block
    const block = data.allContentBlocksJson.edges.filter(
        ({ node }) => props.id === node.id
    )[0]

    const infoBlocks = block.node.infoBlocks.map( (block, i) => {
        return(
            <Col md={6} key={i}>
                <Row>
                    <Col></Col>
                    <Col>
                        <h3>{block.title}</h3>
                        <Text dangerouslySetInnerHTML={{ __html: block.textHTML }} />
                    </Col>
                </Row>
            </Col>
        )
    })

    return(
        <ContainerMaxWidth className="py-3">
            <Row>
                { infoBlocks }
            </Row>
        </ContainerMaxWidth>
    )
}

InfoBlocks.propTypes = {
    id: PropTypes.node.isRequired,
}

export default InfoBlocks