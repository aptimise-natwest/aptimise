import React, { Component } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col, ModalBody } from "reactstrap"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { media } from "utils/Media"
import Text from "components/shared/Text"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import ButtonPlaySvg from "components/shared/ButtonPlaySvg"
import ModalAngled from "components/shared/ModalAngled"
import ModalAngledClose from "components/shared/ModalAngledClose"

import landingBlockSVG from "images/backgrounds/landing-block.svg"
import landingTextMobileSVG from "images/backgrounds/landing-text-mobile.svg"
import landingMobileTopSVG from "images/backgrounds/landing-mobile-top.svg"
import landingMobileBottomSVG from "images/backgrounds/landing-mobile-bottom.svg"

const LandingWrapper = styled.div`
    max-width: 1500px;
    width: 100%;
    padding: 0;
    margin: 0 auto 2rem;
    position: relative;
    overflow: hidden;
    @media ${media.md} {
        margin: 0 auto 4rem;
    }
`

const LandingContent = styled(ContainerMaxWidth)`
    padding-left: 0;
    padding-right: 0;
    @media ${media.md} {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 3rem;
        color: ${props => props.theme.colors.white};
    }
    @media ${media.xl} {
        top: 4rem;
    }
    @media ${media.xl} {
        top: 8rem;
    }
`

const DesktopImg = styled(Img)`
    display: none;

    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color:  ${props => props.theme.colors.black};
        opacity: .2;
    }

    @media ${media.md} {
        display: block;
    }
`

const DesktopSvg = styled.img`
    display: none;

    @media ${media.md} {
        display: block;
        bottom: -2px;
        position: absolute; 
        width: calc(100% + 6px); 
        left: 50%;
        transform: translateX(-50%); 
        max-width: none;
    }
`

const MobileImg = styled(Img)`
    display: block;

    @media ${media.md} {
        display: none;
    }
`

const LandingH1 = styled.h1`
    font-size: 2rem;
    padding: 1rem 2rem;
    @media ${media.md} {
        font-size: 2rem;
        padding: 0 0 2rem 0;
    }
    @media ${media.lg} {
        font-size: 3rem;
    }
`

const LandingText = styled(Text)`
    font-size: 1rem;
    padding: 1rem 2rem;
    color: ${props => props.theme.colors.backOff};

    @media ${media.md} {
        color: ${props => props.theme.colors.white};
        padding: 1rem 0;
        font-size: 1.15rem;
    }

    @media ${media.lg} {
        font-size: ${props => props.theme.font.size.lg};
    }
`

const LandingTextWrap = styled.div`
    position: relative;
    padding: 1rem 0 4rem;

    @media ${media.sm} {
        padding: 1rem 0 8rem;
    }

    @media ${media.md} {
        padding: 0;
    }
`

const LandingTextBgSvg = styled.img`
    position: absolute;
    bottom: 0;
    width: 100%;

    @media ${media.md} {
        display: none;
    }
`

const MobileImgWrap = styled.div`
    position: relative;
`

const MobileImgSvgTop = styled.img`
    position: absolute;
    z-index: 1;
    top: -1px;
    width: 100%;

    @media ${media.md} {
        display: none;
    }
`

const MobileImgSvgBottom = styled.img`
    position: absolute;
    z-index: 1;
    bottom: -1px;
    width: 100%;

    @media ${media.md} {
        display: none;
    }
`

const WatchNowButton = styled.button`
    font-size: ${props => props.theme.font.size.xl};
    background-color: transparent;
    border: 0;
    color: ${props => props.theme.colors.white};
    position: absolute;
    bottom: 3rem;
    left: 2rem;
    z-index: 2;

    @media ${media.md} {
        position: relative;
        left: auto;
        bottom: auto;
    }

`

const LandingBlock = (props) => (
    <StaticQuery
        query={graphql`
            query {
                allContentBlocksJson {
                    edges {
                        node {
                            id
                            imageDesktop {
                                childImageSharp  {
                                    fluid(maxWidth: 1500) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                            imageMobile {
                                childImageSharp  {
                                    fluid(maxWidth: 768) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                            title
                            videoText
                            youtubeVideoID
                            text
                        }
                    }
                }
            }
        `}
        render={data => (
            <Landing data={data} id={props.id} />
        )}
    />
)

class Landing extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modal: false
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {

        // Retrieve block
        const block = this.props.data.allContentBlocksJson.edges.filter(
            ({ node }) => this.props.id === node.id
        )[0]

        const { title, text, imageDesktop, imageMobile, videoText, youtubeVideoID } = block.node
        const youtubeSrc = `https://www.youtube.com/embed/${youtubeVideoID}?autoplay=1&amp;rel=0`

        return (
            <>
                <LandingWrapper>
                    <DesktopImg fluid={imageDesktop.childImageSharp.fluid} alt={title} />
                    <DesktopSvg src={landingBlockSVG} alt="" />

                    <LandingContent>
                        <Row>
                            <Col md={8} xl={5}>
                                <LandingH1 dangerouslySetInnerHTML={{ __html: title }} />

                                <MobileImgWrap>
                                    <MobileImgSvgTop src={landingMobileTopSVG} alt="" />
                                    <MobileImg fluid={imageMobile.childImageSharp.fluid} alt="" />
                                    <WatchNowButton onClick={this.toggle}>
                                        <ButtonPlaySvg />
                                        <span className="ml-3">
                                            {videoText}
                                        </span>
                                    </WatchNowButton>
                                    <MobileImgSvgBottom src={landingMobileBottomSVG} alt="" />
                                </MobileImgWrap>

                                <LandingTextWrap>
                                    <LandingText
                                        dangerouslySetInnerHTML={{ __html: text }}
                                    />
                                    <LandingTextBgSvg src={landingTextMobileSVG} alt="" />
                                </LandingTextWrap>
                            </Col>
                        </Row>
                    </LandingContent>
                </LandingWrapper>
                {youtubeVideoID !== "" && youtubeVideoID !== null &&
                    <ModalAngled isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalAngledClose onClick={this.toggle} />
                        <ModalBody>
                            <Container>
                                <Row className="justify-content-center">
                                {this.state.modal &&
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe
                                            width="560"
                                            height="315"
                                            className="embed-responsive-item"
                                            src={youtubeSrc}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title="APtimise video"></iframe>
                                    </div>
                                }
                                </Row>
                            </Container>
                        </ModalBody>
                    </ModalAngled>
                }
            </>
        )
    }
}

LandingBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default LandingBlock