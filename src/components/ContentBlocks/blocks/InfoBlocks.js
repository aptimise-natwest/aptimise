import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import ContainerMaxWidth from "../../shared/ContainerMaxWidth"
import Animation from "../../shared/Animation"
import Text from "../../shared/Text"
import VisibilitySensor from "react-visibility-sensor"

const InfoBlocks = (props) => (
    <StaticQuery
        query={graphql`
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
            animation: []
        }

        this.getBlock = this.getBlock.bind(this)
        this.setAnimationState = this.setAnimationState.bind(this)
        this.playAnimation = this.playAnimation.bind(this)
    }

    componentDidMount() {
        this.setAnimationState()
    }

    setAnimationState() {
        // Set animation state for each infoblock
        let animationState = []
        const block = this.getBlock()

        for (let i = 0; block.node.infoBlocks.length > i; i++) {
            animationState[i] = false
        }

        this.setState({
            animation: animationState
        })
    }

    getBlock() {
        // Retrieve the content block
        // Loop all blocks and search for matching id
        const block = this.props.data.allContentBlocksJson.edges.filter(
            ({ node }) => this.props.id === node.id
        )[0]

        return block
    }

    playAnimation(isVisible, i) {
        if (isVisible) {
            let animation = [...this.state.animation]
            animation[i] = true
            this.setState({ animation });
        }
    }

    render() {
        const block = this.getBlock()

        const infoBlocks = block.node.infoBlocks.map((block, i) => {
            return (
                <VisibilitySensor 
                    key={i}
                    onChange={(isVisible) => this.playAnimation(isVisible, i)}
                >
                    <Col lg={6} className="pb-5 pb-lg-4">
                        <Row>
                            <Col xs={3} md={2} lg={3} xl={2}>
                                <Animation type={block.animation} play={this.state.animation[i]} />
                            </Col>
                            <Col xs={{ offset: 1, size: 8 }} md={8} lg={7} xl={8}>
                                <Text size="lg" className="pb-3">{block.title}</Text>
                                <Text dangerouslySetInnerHTML={{ __html: block.textHTML }} />
                            </Col>
                        </Row>
                    </Col>
                </VisibilitySensor>
            )
        })

        return (
            <ContainerMaxWidth className="py-3">
                <Row>
                    {infoBlocks}
                </Row>
            </ContainerMaxWidth>
        )
    }
}

InfoBlocks.propTypes = {
    id: PropTypes.node.isRequired,
}

Blocks.propTypes = {
    data: PropTypes.any.isRequired,
}

export default InfoBlocks