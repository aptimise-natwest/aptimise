import React, { Component } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col, Modal, ModalBody } from "reactstrap"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { media } from "utils/Media"
import Text from "components/shared/Text"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import ButtonPlaySvg from "components/shared/ButtonPlaySvg"
import ModalAngled from "components/shared/ModalAngled"
import ModalAngledClose from "components/shared/ModalAngledClose"


const LandingWrapper = styled(Container)`
    max-width: 1500px;
    padding: 0;
    position: relative;
    overflow: hidden;
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
        opacity: .3;
    }

    @media ${media.md} {
        display: block;
    }
`

const DesktopSvg = styled.svg`
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 4px);
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

    @media ${media.md} {
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

    @media ${media.md} {
        padding: 0;
    }
`

const LandingTextSvg = styled.svg`
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

const MobileImgSvgTop = styled.svg`
    position: absolute;
    z-index: 1;
    top: -1px;
    width: 100%;

    @media ${media.md} {
        display: none;
    }
`

const MobileImgSvgBottom = styled.svg`
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
                                    fluid(maxWidth: 1400) {
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
                            youtubeVideo
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

        const { title, text, imageDesktop, imageMobile, videoText, youtubeVideo } = block.node

        return (
            <>
                <LandingWrapper>
                    <DesktopImg fluid={imageDesktop.childImageSharp.fluid} alt="" />
                    <DesktopSvg viewBox="0 0 1152 427">                 
                        <path d="M1152 0L576 338L0 206.5V427H1152V0Z" fill="white" />
                        <path d="M1152 190L576 423L0 289V190H1152Z" fill="url(#paint0_linear)" />
                        <defs>
                            <linearGradient id="paint0_linear" x1="566" y1="1032.87" x2="566" y2="-1316" gradientUnits="userSpaceOnUse">
                                <stop offset="0.231544" stopColor="#89969F" />
                                <stop offset="0.322652" stopColor="#89969F" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </DesktopSvg>
                    <LandingContent>
                        <Row>
                            <Col md={8} xl={5}>
                                <LandingH1 dangerouslySetInnerHTML={{ __html: title }} />
                                <MobileImgWrap>
                                    <MobileImgSvgTop viewBox="0 0 320 34.7">
                                        <polygon points="160,34.7 320,0 0,0" fill="white" />
                                    </MobileImgSvgTop>

                                    <MobileImg fluid={imageMobile.childImageSharp.fluid} alt="" />
                                    <WatchNowButton onClick={this.toggle}>
                                        <ButtonPlaySvg />
                                        <span className="ml-3">
                                            {videoText}
                                        </span>
                                    </WatchNowButton>

                                    <MobileImgSvgBottom viewBox="0 0 320 86">
                                        <polygon points="0,65 160,86 320,0 320,86 0,86" fill="white"/>
                                    </MobileImgSvgBottom>
                                </MobileImgWrap>

                                <LandingTextWrap>
                                    <LandingText
                                        dangerouslySetInnerHTML={{ __html: text }}
                                    />
                                    <LandingTextSvg viewBox="0 0 320 280" fill="none">
                                        <path opacity="0.25" d="M320 223L160 280L0 224.5V0H320V223Z" fill="url(#paint0_linear)" />
                                        <defs>
                                            <linearGradient id="paint0_linear" x1="157.222" y1="505.123" x2="157.222" y2="-146.244" gradientUnits="userSpaceOnUse">
                                                <stop offset="0.10612" />
                                                <stop offset="0.460759" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </LandingTextSvg>
                                </LandingTextWrap>
                            </Col>
                        </Row>
                    </LandingContent>
                </LandingWrapper>
                {youtubeVideo !== "" && youtubeVideo !== null &&
                    <ModalAngled isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalAngledClose onClick={this.toggle} />
                        <ModalBody>
                            <Container>
                                <Row className="justify-content-center">
                                {this.state.modal &&
                                    <iframe
                                        width="560"
                                        height="315"
                                        src="https://www.youtube.com/embed/aJoo79OwZEI?autoplay=1&amp;rel=0"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
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