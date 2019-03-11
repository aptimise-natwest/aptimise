import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import { Draggable } from "gsap/all"
import styled from "styled-components"
import { media } from "utils/Media"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import Button from "components/shared/Button"
import dial from "images/dial.png"

const CalculatorContainer = styled(ContainerMaxWidth)`
    position: relative;
    padding-top: 1.5rem;
    padding-bottom: 12rem;
`

const CalculatorBgSvg = styled.svg`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
`

const TextSummary = styled(Text)`
    font-size: ${props => props.theme.font.size.xl};

    @media ${media.md} {
        font-size: 2.25rem;
    }
`

const CalculatorBlock = (props) => (
    <StaticQuery
        query={graphql`
            query {
                allContentBlocksJson {
                    edges {
                        node {
                            id
                            title
                            textHTML
                            textInvoices
                            textPaymentRuns
                            textEmployees
                            textSummary
                            textButton
                        }
                    }
                }
            }
        `}
        render={data => (
            <Calculator data={data} id={props.id} />
        )}
    />
)

class Calculator extends  Component {

    constructor(props) {
        super(props)

        this.state = {
            invoices: 0,
            payments: 0,
            employees: 1,
            hours: 0
        }

        this.createDials = this.createDials.bind(this)
        this.calculateHours = this.calculateHours.bind(this)
    }

    componentDidMount() {
        this.createDials()
    }

    createDials() {

        const $this = this

        Draggable.create(this.invoiceDial, {
            type: "rotation",
            dragClickables: true,
            throwProps: true,
            onDrag: function () {
                const rotation = parseInt(this.rotation % 1000, 10)
                const invoices = (rotation < 0) ? rotation + 1000 : rotation
                $this.setState({
                    invoices
                }) 
                // $this.calculateHours()
            },
            onDragEnd: () => this.calculateHours()
        })

        Draggable.create(this.paymentsDial, {
            type: "rotation", 
            throwProps: true,
            dragClickables: true,
            onDrag: function () {
                const rotation = parseInt(this.rotation % 1000, 10) * 100
                const payments = (rotation < 0) ? rotation + 1000000 : rotation
                $this.setState({
                    payments
                }) 
            },
            onDragEnd: () => this.calculateHours()
        })

    }

    calculateHours() {
        // (10 min to enter + 1 min to approve) X number of invoices) + (20 X number of payment runs per month)
        // (11 X invoices per month) + (20 X payment runs per month) = NUMBER OF HOURS SAVED PER MONTH with automation
        const hours = (11 * this.state.invoices) + (20 * this.state.payments)
        this.setState({
            hours
        })
    }

    render() {
        // Retrieve block
        const block = this.props.data.allContentBlocksJson.edges.filter(
            ({ node }) => this.props.id === node.id
        )[0]

        const { 
            title,
            textHTML,
            textInvoices,
            textPaymentRuns,
            textEmployees,
            textSummary,
            textButton 
        } = block.node

        return (
            <CalculatorContainer>
                <CalculatorBgSvg viewBox="0 0 1152 237">
                    <defs>
                        <linearGradient id="a" x1="576" y1="-740.87" x2="576" y2="1608" gradientTransform="matrix(1 0 0 -1 0 106)" gradientUnits="userSpaceOnUse">
                            <stop offset=".19" />
                            <stop offset=".33" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d="M1152 111L576 237 0 111v-243l1152 12z" style={{ isolation: "isolate" }} opacity=".25" fill="url(#a)" />
                </CalculatorBgSvg>

                <Row>
                    <Col md={8} lg={6}>
                        <h4>{title}</h4>
                        <Text
                            className="pb-3"
                            dangerouslySetInnerHTML={{ __html: textHTML }}
                        />
                    </Col>
                </Row>


                <Row className="text-center text-md-left py-3">
                    <Col>
                        <img 
                            src={dial} 
                            ref={invoiceDial => this.invoiceDial = invoiceDial} 
                            alt="Invoice dial" 
                            width="215" 
                        />
                        <Text className="pt-4">{textInvoices}</Text>
                        <TextSummary size="xl" color="purple">{this.state.invoices} invoices</TextSummary>
                    </Col>
                    <Col>
                        <img 
                            src={dial} 
                            ref={paymentsDial => this.paymentsDial = paymentsDial} 
                            alt="Payments dial" 
                            width="215" 
                        />
                        <Text className="pt-4">{textPaymentRuns}</Text>
                        <TextSummary size="xl" color="purple">£{this.state.payments}</TextSummary>
                    </Col>
                    <Col>
                        <Text>{textEmployees}</Text>
                        <TextSummary size="xl" color="purple">{this.state.employees} employee{this.state.employees > 1 ? 's' : ''}</TextSummary>
                    </Col>
                    <Col xs={12}>
                        <TextSummary color="turquoise" className="pt-4">
                            {this.state.hours} {textSummary}
                        </TextSummary>
                        <Button turquoise>{textButton}</Button>
                    </Col>
                </Row>
            

            </CalculatorContainer>
        )
    }

}

CalculatorBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default CalculatorBlock