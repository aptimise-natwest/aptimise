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
import deviceShadow from "images/device-shadow.svg"

const DeviceContainer = styled(ContainerMaxWidth)`
    position: relative;
    margin-bottom: 4rem;
`

const DeviceContent = styled(Row)`
    position: relative;
    z-index: 2;
    padding-top: 5rem;
    padding-bottom: 15rem;

    @media ${media.sm} {
        padding-bottom: 15rem;
    }

    @media ${media.md} {
        padding-top: 1rem;
        padding-bottom: 10rem;
    }

    @media ${media.lg} {
        padding-bottom: 15rem;
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
        bottom: 0rem;
        width: 120%;
        left: 50%;
        transform: translateX(-50%);
    }

    @media ${media.lg} {
        bottom: -4rem;
    }
`

const DeviceImgWrap = styled.div`
    position: absolute;
    bottom: 3rem;
    right: 0;

    @media ${media.md} {
        width: 60%;
        bottom: 0;
    }

    img {
        max-width: 100%;
        max-height: 13rem;
        &:first-child {
            position: relative;
            z-index: 1;
        }

        @media ${media.md} {
            max-height: none;
        }
    }
`

const DeviceImgShadow = styled.img`
    position: absolute;
    bottom: -2rem;
    left: 0;

    @media ${media.md} {
        bottom: -4rem;
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
        const deviceTimeline = new TimelineMax()
        const shadowTimeline = new TimelineMax()

        deviceTimeline
            .to(this.device, 1.5, { y: 20, ease: Power1.easeInOut, repeat: -1, yoyo: true })

        shadowTimeline
            .to(this.deviceShadow, 1.5, { scale: .95, ease: Power1.easeInOut, repeat: -1, yoyo: true })
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
                    <DeviceBgSvg viewBox="0 0 1152 231" fill="none">
                        <path d="M1152 0.000427246L575 231L0 0.000427246H1152Z" fill="url(#deviceBg)" />
                        <defs>
                            <linearGradient id="deviceBg" x1="566" y1="842.868" x2="566" y2="-1506" gradientUnits="userSpaceOnUse">
                                <stop offset="0.19337" stopColor="#FFB624" />
                                <stop offset="0.359283" stopColor="#FFB624" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </DeviceBgSvg>
                    <DeviceImgWrap>
                        <img src={device} ref={device => this.device = device} alt="APtimise dashboard" />
                        <DeviceImgShadow src={deviceShadow} ref={deviceShadow => this.deviceShadow = deviceShadow} alt="" />
                    </DeviceImgWrap>
                </DeviceWrap>
            </DeviceContainer>
        )
    }
}

Device.propTypes = {
    data: PropTypes.object.isRequired,
}

DeviceBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default DeviceBlock