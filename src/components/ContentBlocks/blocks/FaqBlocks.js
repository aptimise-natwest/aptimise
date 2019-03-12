import React, {Component} from "react"
import PropTypes from "prop-types"
import {StaticQuery, graphql} from "gatsby"
import {Row, Col, Collapse} from "reactstrap"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import Animation from "components/shared/Animation"
import {withTheme} from "styled-components"
import gradientSeparator from "images/backgrounds/gradient-separator.svg"
import styled from "styled-components";
import VisibilitySensor from "react-visibility-sensor";

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
                                animation
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

const GradientSeparator = styled.div`
    margin: 100px 0;
`

class Blocks extends Component {

    constructor(props) {
        super(props)

        this.state = {
            animation: false,
            animationDelay: [],
            collapseState: {}
        }

        this.getBlock = this.getBlock.bind(this)
        this.playAnimation = this.playAnimation.bind(this)
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.collapseToggleWindowWidth = this.collapseToggleWindowWidth.bind(this);
    }

    componentDidMount() {
        this.partialVisible()
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

    partialVisible() {
        if (typeof window !== "undefined") {
            const breakpoint = this.props.theme.sizes.lg.replace('px', '')
            const partialVisible = window.innerWidth < breakpoint ? true : false
            this.setState({
                partialVisible
            })
        }
    }

    getBlock() {
        // Retrieve the content block
        // Loop all blocks and search for matching id
        const block = this.props.data.allContentBlocksJson.edges.filter(
            ({node}) => this.props.id === node.id
        )[0]

        return block
    }

    playAnimation(isVisible) {
        if (isVisible) {
            this.setState({ animation: true });
        }
    }

    render() {
        const { theme } = this.props
        const block = this.getBlock()

        const faqBlocks = block.node.faqBlocks.map((block, i) => {
            return (
                <VisibilitySensor
                    onChange={this.playAnimation}
                    partialVisibility={this.state.partialVisible}
                    key={i}
                >
                    <div>
                        <Row>
                            <Col xs={3} md={2}>
                                <Animation block={block} type={block.animation} play={this.state.animation} />
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
                        <GradientSeparator>
                            {block.id !== "security" &&
                            <img src={gradientSeparator} alt="" />
                            }
                        </GradientSeparator>
                    </div>
                </VisibilitySensor>
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