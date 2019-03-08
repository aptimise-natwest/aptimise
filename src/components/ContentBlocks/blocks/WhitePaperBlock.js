import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Container, Row, Col, ModalBody } from "reactstrap"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import Button from "components/shared/Button"
import ModalAngled from "components/shared/ModalAngled"

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

        const { title, textHTML, buttonText } = block.node

        return (
            <>
                <ContainerMaxWidth className="py-3 py-lg-4">
                    <Row>
                        <Col lg={6}>
                            <h4>{title}</h4>
                            <Text dangerouslySetInnerHTML={{ __html: textHTML }} />
                            <Button onClick={this.toggle}>{buttonText}</Button>
                        </Col>
                        <Col lg={6}>

                        </Col>
                    </Row>
                </ContainerMaxWidth>
                <ModalAngled isOpen={this.state.modal} toggle={this.toggle} background={true}>
                    <ModalBody>
                        <Container>
                            <Row className="justify-content-center">
                                <Col md={6}>
                                    <p>Lorem ipsum dolor</p>
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