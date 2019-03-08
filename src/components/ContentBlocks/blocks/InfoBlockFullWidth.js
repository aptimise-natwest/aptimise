import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Animation from "components/shared/Animation"
import Text from "components/shared/Text"
import VisibilitySensor from "react-visibility-sensor"

const InfoBlocksFullWidth = (props) => (
    <StaticQuery
        query={graphql`
            query {
                allContentBlocksJson {
                    edges {
                        node {
                            id
                            animation
                            title
                            textIntroHTML
                            textHTML
                        }
                    }
                }
            }
        `}
        render={data => (
            <Blocks data={data} id={props.id} />
        )}
    />
)

class Blocks extends Component {

    constructor(props) {
        super(props)

        this.state = {
            animation: false
        }

        this.getBlock = this.getBlock.bind(this)
        this.playAnimation = this.playAnimation.bind(this)
    }

    getBlock() {
        // Retrieve the content block
        // Loop all blocks and search for matching id
        const block = this.props.data.allContentBlocksJson.edges.filter(
            ({ node }) => this.props.id === node.id
        )[0]

        return block
    }

    playAnimation(isVisible) {
        if (isVisible) {
            this.setState({ animation: true });
        }
    }

    render() {
        const block = this.getBlock()
        const { animation, title, textIntroHTML, textHTML} = block.node
        return (
            <ContainerMaxWidth className="py-3 py-lg-4">
                <Row>
                    <VisibilitySensor onChange={this.playAnimation}>
                        <Col className="pb-5 pb-lg-4">
                            <Row>
                                <Col xs={3} md={2} lg={3} xl={2}>
                                    <Animation type={animation} play={this.state.animation} />
                                </Col>
                                <Col xs={{ offset: 1, size: 8 }} md={8} lg={7} xl={8}>
                                    <h4 className="pb-3">{title}</h4>
                                    <Text dangerouslySetInnerHTML={{ __html: textIntroHTML }} size="lg" />
                                    <Text dangerouslySetInnerHTML={{ __html: textHTML }} />
                                </Col>
                            </Row>
                        </Col>
                    </VisibilitySensor>
                </Row>
            </ContainerMaxWidth>
        )
    }
}

InfoBlocksFullWidth.propTypes = {
    id: PropTypes.node.isRequired,
}

Blocks.propTypes = {
    data: PropTypes.any.isRequired,
}

export default InfoBlocksFullWidth