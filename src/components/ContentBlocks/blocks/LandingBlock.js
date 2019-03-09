import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "reactstrap"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Text from "components/shared/Text"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"

import image from "images/backgrounds/landing-home-bg.jpg"

const LandingWrapper = styled(Container)`
    max-width: 1600px;
    padding: 0;
`

const LandingContent = styled(ContainerMaxWidth)`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20%;
    color: ${props => props.theme.colors.white};
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

            <svg viewBox="0 0 1152 728">  
                <defs>  
                    <clipPath id="desktopClip">  
                        <path d="M1258 328V0L1103.52 1.99892H-16V594L575 728L1258 328Z" fill="black" />
                    </clipPath>  
                </defs>
                <image clip-path="url(#desktopClip)" href={image} width="100%" height="100%" />
            </svg>
            
            <LandingContent>
                <Row>
                    <Col md={8} lg={5}>
                        <h1>
                            {title}
                        </h1>
                        <Text
                            dangerouslySetInnerHTML={{ __html: text }}
                            size="lg"
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