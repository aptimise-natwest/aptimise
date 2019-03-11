import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "reactstrap"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { media } from "utils/Media"
import Text from "components/shared/Text"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"

import image from "images/backgrounds/landing-home-bg.jpg"
import imageMobile from "images/backgrounds/landing-home-bg-mobile.jpg"

const LandingWrapper = styled(Container)`
    max-width: 1500px;
    padding: 0;
    position: relative;
    overflow: hidden;
`

const LandingContent = styled(ContainerMaxWidth)`
    @media ${media.md} {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 20%;
        color: ${props => props.theme.colors.white};
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
    bottom: -1%;
    left: 50%;
    transform: translateX(-50%);
    width: 102%;
`

const MobileImg = styled(Img)`
    display: block;

    @media ${media.md} {
        display: none;
    }
`

const LandingH1 = styled.h1`
    font-size: 2rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
    @media ${media.md} {
        font-size: 3rem;
        padding-bottom: 2rem;
        padding-top: 0;
    }
`

const LandingText = styled(Text)`
    font-size: 1rem;
    font-family: ${props => props.theme.font.family.base};
    padding: 1rem 0;

    @media ${media.md} {
        font-size: ${props => props.theme.font.size.lg};
    }
`

const LandingBlock = (props) => {

    const data = useStaticQuery(graphql`
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
    `)

    // Retrieve block
    const block = data.allContentBlocksJson.edges.filter(
        ({ node }) => props.id === node.id
    )[0]

    const { title, text, imageDesktop, imageMobile } = block.node

    return (
        <LandingWrapper>

            {/* <DesktopSvg viewBox="0 0 1152 728">  
                <defs>  
                    <clipPath id="desktopClip">  
                        <path d="M1258 328V0L1103.52 1.99892H-16V594L575 728L1258 328Z" />
                    </clipPath>  
                </defs>
                <image clip-path="url(#desktopClip)" href={image} width="100%" height="100%" />
                <path d="M1258 328V0L1103.52 1.99892H-16V594L575 728L1258 328Z" fill="black" opacity=".3"/>
            </DesktopSvg> */}

            <DesktopImg fluid={imageDesktop.childImageSharp.fluid} alt="" />

            <DesktopSvg viewBox="0 0 1315 492">
                <path class="cls-1" d="M0 266v226h1315V0L610.02 400 0 266z" fill="white" />
            </DesktopSvg>        
            
            <LandingContent>
                <Row>
                    <Col md={8} lg={5}>
                        <LandingH1 dangerouslySetInnerHTML={{ __html: title}} />

                        <MobileImg fluid={imageMobile.childImageSharp.fluid} alt="" />

                        <LandingText
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                    </Col>
                </Row>
            </LandingContent>
        </LandingWrapper>
    )
}

LandingBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default LandingBlock