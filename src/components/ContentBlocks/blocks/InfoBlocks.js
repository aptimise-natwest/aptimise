import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Animation from "components/shared/Animation"
import Text from "components/shared/Text"
import FadeInUp from "components/shared/FadeInUp"
import { withTheme } from 'styled-components'

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
            <Blocks data={data} id={props.id} theme={props.theme} />
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
        this.fadeInUpAnimated = this.fadeInUpAnimated.bind(this)
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

    playAnimation(i) {
        let animation = [...this.state.animation]
        animation[i] = true
        this.setState({ animation });
    }

    fadeInUpAnimated(animated, id) {
        // when fadeinup has finished, start the infoblock animation
        // animated and id are passed up from FadeInUp once animated
        // get number of animation from id
        const i = id.split('#infoBlock')[1]

        if (animated) {
            this.playAnimation(i)
        }
    }

    render() {
        const block = this.getBlock()

        const infoBlocks = block.node.infoBlocks.map((block, i) => {

            // Change to show if partially visible on smaller devices
            const breakpoint = this.props.theme.sizes.lg.replace('px', '')
            const delay = window.innerWidth < breakpoint ? 0 : i 

            return (
                <FadeInUp 
                    key={i} 
                    elementId={`#infoBlock${i}`} 
                    animated={this.fadeInUpAnimated}
                    delay={delay}
                    >
                    <Col lg={6} className="pb-5 pb-lg-4" id={`infoBlock${i}`}>
                        <Row>
                            <Col xs={3} md={2} lg={3} xl={2}>
                                <Animation type={block.animation} play={this.state.animation[i]} />
                            </Col>
                            <Col xs={9} sm={{ offset: 1, size: 8 }} lg={7} xl={8}>
                                <h5 className="pb-2">{block.title}</h5>
                                <Text dangerouslySetInnerHTML={{ __html: block.textHTML }} />
                            </Col>
                        </Row>
                    </Col>
                </FadeInUp> 
            )
        })

        return (
            <ContainerMaxWidth className="pt-3 pt-lg-4">
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

export default withTheme(InfoBlocks)