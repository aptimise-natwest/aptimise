import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import aptimise from "images/logos/aptimise.svg"

const TextBlockTerms = (props) => {

    const data = useStaticQuery(graphql`
        query {
            allContentBlocksJson {
                edges {
                    node {
                        id
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

    const { textHTML } = block.node

    return (
        <ContainerMaxWidth className="py-3 py-lg-4">
            <Row>
                <Col md={2} className="d-none d-md-block">
                    <img src={aptimise} alt="APtimise" style={{ position: "fixed" }} />
                </Col>
                <Col xs={12} md={10}>
                    <div dangerouslySetInnerHTML={{ __html: textHTML }} />
                </Col>
            </Row>
        </ContainerMaxWidth>
    )
}

TextBlockTerms.propTypes = {
    id: PropTypes.node.isRequired,
}

export default TextBlockTerms