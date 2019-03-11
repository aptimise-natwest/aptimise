import React, {Component} from "react"
import PropTypes from "prop-types"
import {StaticQuery, graphql} from "gatsby"
import {Row, Col, Collapse} from "reactstrap"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import FadeInUp from "components/shared/FadeInUp"
import {withTheme} from 'styled-components'
import Img from 'gatsby-image'

const FaqBlocks = (props) => (
    <StaticQuery
        query={graphql`
            query {
                allContentBlocksJson {
                    edges {
                        node {
                            id
                            title
                            shortIntroduction
                            faqBlocks {
                                id
                                title
                                color
                                gradientImage {
                                    childImageSharp  {
                                        fluid(maxWidth: 1400) {
                                            ...GatsbyImageSharpFluid_tracedSVG
                                        }
                                    }
                                }
                                faqBlockElements {
                                    title
                                    textHTML
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={data => (
            <Blocks data={data} id={props.id} theme={props.theme}/>
        )}
    />
)

class Blocks extends Component {

    constructor(props) {
        super(props)

        this.state = {
            animation: [],
            animationDelay: [],
            collapseState: {}
        }

        this.getBlock = this.getBlock.bind(this)
        this.setAnimationState = this.setAnimationState.bind(this)
        this.playAnimation = this.playAnimation.bind(this)
        this.fadeInUpAnimated = this.fadeInUpAnimated.bind(this)
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.collapseToggleWindowWidth = this.collapseToggleWindowWidth.bind(this);
    }

    componentDidMount() {
        this.setAnimationState()
        this.collapseToggleWindowWidth();
        window.addEventListener('resize', this.collapseToggleWindowWidth, true);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.collapseToggleWindowWidth, true);
    }

    // Method to determine whether collapses should be open or closed, depending on window width
    collapseToggleWindowWidth() {
        const width = window.innerWidth;
        const newState = {};
        let collapsed;

        if (width < 992) {
            collapsed = false;
        } else {
            collapsed = true;
        }

        for (let key in this.state) {
            newState[key] = collapsed;
        }

        this.setState(newState);
    }

    toggleCollapse(e) {
        e.preventDefault();

        const width = window.innerWidth;

        if (width < 992) {
            const collapse = e.currentTarget.id;
            this.setState({
                [collapse]: !this.state[collapse]
            })
        }

    }

    setDelay() {
        // Change to show if partially visible on smaller devices
        if (typeof window !== undefined) {

            const breakpoint = this.props.theme.sizes.lg.replace('px', '')
            const block = this.getBlock()
            let animationDelayState = []

            if (window.innerWidth < breakpoint) {
                // No delay on mobile
                for (let i = 0; block.node.faqBlocks.length > i; i++) {
                    animationDelayState[i] = 0
                }
            } else {
                // stagger delay on dekstop
                for (let i = 0; block.node.faqBlocks.length > i; i++) {
                    animationDelayState[i] = i
                }
            }

            this.setState({
                animationDelay: animationDelayState
            })
        }

    }

    setAnimationState() {
        // Set animation state for each infoblock
        let animationState = []
        const block = this.getBlock()

        for (let i = 0; block.node.faqBlocks.length > i; i++) {
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
            ({node}) => this.props.id === node.id
        )[0]

        return block
    }

    playAnimation(i) {
        let animation = [...this.state.animation]
        animation[i] = true
        this.setState({animation});
    }

    fadeInUpAnimated(animated, id) {
        // when fadeinup has finished, start the infoblock animation
        // animated and id are passed up from FadeInUp once animated
        // get number of animation from id
        const i = id.split('#faqBlock')[1]

        if (animated) {
            this.playAnimation(i)
        }
    }

    render() {
        const { theme } = this.props
        const block = this.getBlock()

        const faqBlocks = block.node.faqBlocks.map((block, i) => {
            return (
                <FadeInUp
                    key={i}
                    elementId={`#faqBlock${i}`}
                    animated={this.fadeInUpAnimated}
                    delay={this.state.animationDelay[i]}
                >
                    <div>
                        <Row>
                            <Col xs={3} md={2}>
                                <svg viewBox="0 0 76.19 82" id="fast" style={{
                                    overflow: "visible",
                                    maxWidth: "100%"
                                }}>
                                    <path fill={theme.colors[`${block.color}`]} d="M0 21.82L38 44l38.19-22.34L38 0z" />
                                </svg>
                            </Col>
                            <Col xs={9} md={10}>
                                <h3 id={`#faqBlock${i}`} className="pb-3" onClick={this.toggleCollapse}>{block.title}</h3>
                                {/*<Collapse isOpen={this.state[`faqBlock${i}`]}>*/}
                                <Collapse isOpen={true}>
                                    <Row>
                                        {block.faqBlockElements.map((element, j) => {
                                            return (
                                                <Col xs={12} lg={6} key={j} className="pb-5 pb-lg-4" id={`faqBlockElement${j}`}>
                                                    <h5 className="pb-2">{element.title}</h5>
                                                    <Text dangerouslySetInnerHTML={{__html: element.textHTML}}/>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </Collapse>
                            </Col>
                        </Row>
                        <div className="gradientSeparator">
                            <Img fluid={block.gradientImage.childImageSharp.fluid} alt="" />
                        </div>
                    </div>
                </FadeInUp>
            )
        })

        return (
            <ContainerMaxWidth className="pt-3 pt-lg-4">
                {faqBlocks}
            </ContainerMaxWidth>
        )
    }
}

FaqBlocks.propTypes = {
    id: PropTypes.node.isRequired,
}

Blocks.propTypes = {
    data: PropTypes.any.isRequired,
}

export default withTheme(FaqBlocks)