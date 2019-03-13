import React, { Component } from "react"
import PropTypes from "prop-types"
import { TimelineMax, Power1 } from "gsap"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import styled from "styled-components"
import { media } from "utils/Media"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import Button from "components/shared/Button"
import device from "images/device.png"

const DeviceContainer = styled(ContainerMaxWidth)`
    position: relative;
`

const DeviceContent = styled(Row)`
    position: relative;
    z-index: 2;
    padding-top: 5rem;
    padding-bottom: 15rem;

    @media ${media.sm} {
        padding-top: 1rem;
    }

    @media ${media.lg} {
        padding-bottom: 20rem;
    }

    @media ${media.xl} {
        padding-bottom: 25rem;
    }
`

const DeviceWrap = styled.div`
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;

    @media ${media.md} {
        bottom: 4rem;
    }
`

const DeviceBgMobileSvg = styled.svg`
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    @media ${media.sm} {
        display: none;
    }
`

const DeviceBgSvg = styled.svg`
    display: none;

    @media ${media.sm} {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }
`

const DeviceImg = styled.img`
    position: absolute;
    bottom: 0;
    right: 0;
    max-height: 15rem;

    @media ${media.md} {
        max-height: none;
        width: 60%;
    }
`

const DeviceBlock = (props) => (
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
            <Device data={data} id={props.id} />
        )}
    />
)

class Device extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // create animation
        this.animation()
    }

    animation() {
        const masterTimeline = new TimelineMax({ repeat: -1, yoyo: true })
        masterTimeline
            .to(this.device, 1.5, { y: 20, ease: Power1.easeInOut })
    }

    render() {
        // Retrieve block
        const block = this.props.data.allContentBlocksJson.edges.filter(
            ({ node }) => this.props.id === node.id
        )[0]

        const { title, textHTML, buttonText } = block.node

        return (
            <DeviceContainer className="py-3 py-lg-5">
                <DeviceContent>
                    <Col md={6}>
                        <h4>{title}</h4>
                        <Text dangerouslySetInnerHTML={{ __html: textHTML }} />
                        <Button yellow blockMobile className="trigger-bookdemo-modal">{buttonText}</Button>
                    </Col>
                </DeviceContent> 

                <DeviceBgMobileSvg viewBox="0 0 320 340">
                    <defs>
                        <linearGradient id="deviceBgMobile" x1="159" y1="-522.6" x2="159" y2="1097.31" gradientTransform="matrix(1, 0, 0, -1, 0, 238)" gradientUnits="userSpaceOnUse">
                            <stop offset="0.19" stopColor="#ffb624" />
                            <stop offset="0.41" stopColor="#ffb624" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d="M556.56,179.31,159,340-238.56,179.31V0H556.56Z" fill="url(#deviceBgMobile)" />
                </DeviceBgMobileSvg>

                <DeviceWrap>
                    <DeviceBgSvg viewBox="0 0 1152 493" fill="none">
                        <path d="M1152 260L576 493L0 260V0H1152V260Z" fill="url(#deviceBg)" />
                        <defs>
                            <linearGradient id="deviceBg" x1="566" y1="1102.87" x2="566" y2="-1246" gradientUnits="userSpaceOnUse">
                                <stop offset="0.19337" stopColor="#FFB624" />
                                <stop offset="0.414365" stopColor="#FFB624" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </DeviceBgSvg>
                    <DeviceImg src={device} alt="" ref={device => this.device = device} />
                </DeviceWrap>
            </DeviceContainer>
        )
    }
}

Device.propTypes = {
    data: PropTypes.node.isRequired,
}

DeviceBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default DeviceBlock