import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "reactstrap"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { media } from "utils/Media"
import Text from "components/shared/Text"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"

import image from "images/backgrounds/landing-home-bg.jpg"
import imageMobile from "images/backgrounds/landing-home-bg-mobile.jpg"

const LandingWrapper = styled(Container)`
    max-width: 1500px;
    padding: 0;
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

const DesktopSvg = styled.svg`
    display: none;

    @media ${media.md} {
        display: block;
    }
`

const MobileSvg = styled.svg`
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
                        image {
                            childImageSharp  {
                                fluid(maxWidth: 1400) {
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

    const { title, text } = block.node

    return (
        <LandingWrapper>

            <DesktopSvg viewBox="0 0 1152 728">  
                <defs>  
                    <clipPath id="desktopClip">  
                        <path d="M1258 328V0L1103.52 1.99892H-16V594L575 728L1258 328Z" />
                    </clipPath>  
                </defs>
                <image clip-path="url(#desktopClip)" href={image} width="100%" height="100%" />
                <path d="M1258 328V0L1103.52 1.99892H-16V594L575 728L1258 328Z" fill="black" opacity=".3"/>
            </DesktopSvg>
            
            <LandingContent>
                <Row>
                    <Col md={8} lg={5}>
                        <LandingH1 dangerouslySetInnerHTML={{ __html: title}} />

                        <MobileSvg viewBox="0 0 320 277.7">
                            <defs>
                                <clipPath id="mobileClip">
                                    <path class="st0" d="M0,0l160,34.7L320,0v191.7l-160,86l-160-21L0,0z" />
                                </clipPath>
                            </defs>
                            <image clip-path="url(#mobileClip)" href={imageMobile} width="100%" height="100%" />
                            <path class="st0" d="M0,0l160,34.7L320,0v191.7l-160,86l-160-21L0,0z" fill="black" opacity=".3" />
                        </MobileSvg>

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