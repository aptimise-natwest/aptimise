import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Container, Row, Col, ModalBody } from "reactstrap"
import WhitePaperForm from "components/WhitePaperForm/WhitePaperForm"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import Button from "components/shared/Button"
import ModalAngled from "components/shared/ModalAngled"
import ModalAngledClose from "components/shared/ModalAngledClose"

const WhitePaperBlock = (props) => (
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
                            image {
                                childImageSharp  {
                                    fluid(maxWidth: 865) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={data => (
            <WhitePaper data={data} id={props.id} />
        )}
    />
)


class WhitePaper extends Component {

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

        const { title, textHTML, buttonText, image } = block.node

        return (
            <>
                <ContainerMaxWidth className="py-3 py-lg-4">
                    <Row>
                        <Col lg={6}>
                            <h4>{title}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ size: 6, order: 2 }}>
                            <Img fluid={image.childImageSharp.fluid} className="my-3" alt={title} />
                        </Col>
                        <Col lg={{ size: 6, order: 1 }}>
                            <Text dangerouslySetInnerHTML={{ __html: textHTML }} className="py-2" />
                            <Button onClick={this.toggle} as="button" purple blockMobile>{buttonText}</Button>
                        </Col>
                    </Row>
                </ContainerMaxWidth>
                <ModalAngled isOpen={this.state.modal} toggle={this.toggle} background={true}>
                    <ModalAngledClose onClick={this.toggle} />
                    <ModalBody>
                        <Container>
                            <Row className="justify-content-center">
                                <Col md={6} lg={4}>
                                    <h4 className="text-center pb-5">Download Whitepaper</h4>
                                    <WhitePaperForm />
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </ModalAngled>
            </>
        )
    }

}

WhitePaperBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default WhitePaperBlock