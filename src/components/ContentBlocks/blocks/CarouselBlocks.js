import React from "react"
import PropTypes from "prop-types"
import {useStaticQuery, graphql} from "gatsby"
import {Row, Col} from "reactstrap"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"

const CarouselBlocks = (props) => {

    const data = useStaticQuery(graphql`
        query {
            allContentBlocksJson {
                edges {
                    node {
                        id
                        carouselBlocks {
                            title
                            topText
                            image
                            name
                            position
                            textHTML
                            videoId
                        }
                    }
                }
            }
        }
    `)

    // Retrieve block
    const block = data.allContentBlocksJson.edges.filter(
        ({node}) => props.id === node.id
    )[0]

    const carouselBlocks = block.node.carouselBlocks.map((block, i) => {
        return (
            <div className="peopleCarousel__element" key={i}>
                <Row className="">
                    <Col xs={12}>
                        <h3>{block.title}</h3>
                        <p>{block.topText}</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <div className="imageBlock">
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h4>{block.name}</h4>
                        <h5>{block.position}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Text dangerouslySetInnerHTML={{__html: block.textHTML}}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="videoBlock">
                        </div>
                    </Col>
                </Row>
            </div>
        )
    })

    return (
        <ContainerMaxWidth className="py-3">
            <div className="peopleCarousel">
                {carouselBlocks}
            </div>
        </ContainerMaxWidth>
    )
}

CarouselBlocks.propTypes = {
    id: PropTypes.node.isRequired,
}

export default CarouselBlocks