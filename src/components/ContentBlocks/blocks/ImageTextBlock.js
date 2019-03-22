import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import styled from "styled-components"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import Button from "components/shared/Button"

const ImageWrap = styled(Col)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const ImageTextBlock = (props) => {

    const data = useStaticQuery(graphql`
        query {
            allContentBlocksJson {
                edges {
                    node {
                        id
                        title
                        textHTML
                        textPosition
                        link
                        linkText
                        imageSVG
                        imageCaption
                    }
                }
            }
        }
    `)

    // Retrieve block
    const block = data.allContentBlocksJson.edges.filter(
        ({ node }) => props.id === node.id
    )[0]

    const { title, textHTML, textPosition, imageSVG, imageCaption, link, linkText } = block.node

    const textOrder = textPosition === "left" ? 2 : 1
    const imageOrder = textPosition !== "left" ? 1 : 2

    return (
        <ContainerMaxWidth className="py-3 py-lg-4">
            <Row>
                <ImageWrap xs={{ order: imageOrder }} md={6}>
                    <div>
                        <img src={imageSVG} alt={imageCaption} />
                        <Text dangerouslySetInnerHTML={{ __html: imageCaption }} className="pt-3" size="lg" />
                    </div>
                </ImageWrap>
                <Col xs={{ order: textOrder }} md={6}>
                    <h4 className="pb-3">{title}</h4>
                    <Text dangerouslySetInnerHTML={{ __html: textHTML }} />
                    {link && linkText &&
                        <Button as="a" href={link} purple>
                            {linkText}
                        </Button>
                    }
                </Col>
            </Row>
        </ContainerMaxWidth>
    )
}

ImageTextBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default ImageTextBlock