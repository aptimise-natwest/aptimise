import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import {Row, Col} from "reactstrap"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import Button from "components/shared/Button"
import {TimelineMax} from "gsap"
import VisibilitySensor from "react-visibility-sensor"
import styled from "styled-components"
import { media } from "utils/Media"
import diagramBottomBg from "images/backgrounds/diagram-bottom-bg.svg"
import diagramTopBg from "images/backgrounds/diagram-top.png"

const DiagramBlock = (props) => (
    <StaticQuery
        query={graphql`
            query {
                allContentBlocksJson {
                    edges {
                        node {
                            id
                            title
                            textHTML
                            buttonText
                        }
                    }
                }
            }
        `}
        render={data => (
            <Diagram data={data} id={props.id} />
        )}
    />
)

const DiagramWrap = styled.div`
    position: relative;
    margin-top: 100px;
    color: ${props => props.theme.colors.black};
`

const DiagramContent = styled.div`
    position: relative;
    padding: 0 2rem;
    min-height: 450px;
    z-index: 3;
    .diagramContent__inner {
        max-width: 450px;
    }
`

const DiagramTopBg = styled.div`
    background-image: url(${diagramTopBg});
    background-repeat: no-repeat;
    background-size: 1000px;
    background-position: bottom center;
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    max-width: ${props => props.theme.sizes.xxl};
    min-height: 450px;
    z-index: 2;
`

const DiagramBottomBg = styled.div`
    background-image: url(${diagramBottomBg});
    background-repeat: no-repeat;
    background-size: 1000px;
    background-position: bottom center;
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    max-width: ${props => props.theme.sizes.xxl};
    min-height: 450px;
    z-index: 1;
`


class Diagram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animated: false
        }
        this.masterTimeline = new TimelineMax({ paused: true })
        this.diagramTopBgInitialTimeLine = new TimelineMax()
        this.diagramTopBgTimeLine = new TimelineMax()
        this.diagramBottomBgInitialTimeLine = new TimelineMax()
        this.diagramBottomBgTimeLine = new TimelineMax()
        this.diagramContentTimeLine = new TimelineMax()
        this.diagramContentInitialTimeLine = new TimelineMax()
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        // set initial position as mastertimeline is paused
        this.setInitial()
        // create animation
        this.fadeInDiagram()
    }

    onChange(isVisible) {
        // play timeline when diagram is in viewport
        if (isVisible && !this.state.animated) {
            this.masterTimeline.play()
            this.setState({
                animated: !this.state.animated
            })
        }
    }

    setInitial() {
        this.diagramTopBgInitialTimeLine
            .set(this.diagramTopBg, { transform: "translate3d(-50%, 100px, 0)", opacity: 0 })

        this.diagramBottomBgInitialTimeLine
            .set(this.diagramBottomBg, { transform: "translate3d(-50%, 100px, 0)", opacity: 0 })

        this.diagramContentInitialTimeLine
            .set(this.diagramWrap, { transform: "translate3d(0, 100px, 0)", opacity: 0, delay: .4 })
    }

    fadeInDiagram() {
        this.diagramTopBgTimeLine
            .from(this.diagramTopBg, .5, { transform: "translate3d(-50%, 100px, 0)", opacity: 0 })
            .to(this.diagramTopBg, .5, { transform: "translate3d(-50%, -100px, 0)", opacity: 1 })

        this.diagramBottomBgTimeLine
            .from(this.diagramBottomBg, .5, { transform: "translate3d(-50%, 100px, 0)", opacity: 0 })
            .to(this.diagramBottomBg, .5, { transform: "translate3d(-50%, -100px, 0)", opacity: 1 })

        this.diagramContentTimeLine
            .from(this.diagramWrap, .5, { transform: "translate3d(0, 100px, 0)", opacity: 0, delay: .4 })
            .to(this.diagramWrap, 1, { transform: "translate3d(0, 0, 0)", opacity: 1 })

        this.masterTimeline.add([this.diagramTopBgTimeLine, this.diagramBottomBgTimeLine, this.diagramContentTimeLine])
    }

    render() {
        // Retrieve block
        const block = this.props.data.allContentBlocksJson.edges.filter(
            ({ node }) => this.props.id === node.id
        )[0]

        const { title, textHTML, buttonText } = block.node

        return (
            <VisibilitySensor
                onChange={this.onChange}
                partialVisibility={true}
            >
                <DiagramWrap>
                    <DiagramTopBg ref={diagramTopBg => this.diagramTopBg = diagramTopBg} />
                    <DiagramBottomBg ref={diagramBottomBg => this.diagramBottomBg = diagramBottomBg} />
                    <DiagramContent ref={diagramWrap => this.diagramWrap = diagramWrap}>
                        <ContainerMaxWidth className="py-3">
                            <div className="diagramContent__inner">
                                <h4>{title}</h4>
                                <Text dangerouslySetInnerHTML={{ __html: textHTML }} />
                                <Button yellow>{buttonText}</Button>
                            </div>
                        </ContainerMaxWidth>
                    </DiagramContent>
                </DiagramWrap>
            </VisibilitySensor>
        )
    }

}

DiagramBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default DiagramBlock