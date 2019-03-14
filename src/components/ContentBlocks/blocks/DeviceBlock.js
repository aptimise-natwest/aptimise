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
import yellowAngleBg from "images/backgrounds/yellow-angle-bg.svg"
import yellowAngleMobileBg from "images/backgrounds/yellow-angle-bg-mobile.svg"

const DeviceContainer = styled(ContainerMaxWidth)`
    position: relative;
    margin-bottom: 4rem;
`

const DeviceContent = styled(Row)`
    position: relative;
    z-index: 2;
    padding-top: 3rem;
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

const DeviceBgMobileSvg = styled.img`
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    @media ${media.sm} {
        display: none;
    }
`

const DeviceBgSvg = styled.img`
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

                <DeviceBgMobileSvg src={yellowAngleMobileBg} alt="" />

                <DeviceWrap>
                    <DeviceBgSvg src={yellowAngleBg} alt="" />
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