import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import { Draggable } from "gsap/all"
import styled from "styled-components"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import dial from "images/dial.png"

const CalculatorContainer = styled(ContainerMaxWidth)`
    position: relative;
    padding-bottom: 4rem;
`

const CalculatorBgSvg = styled.svg`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
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
                            textParymentRuns
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
            empolyees: 1,
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
                $this.calculateHours()
            }
            
        })

        Draggable.create(this.paymentsDial, {
            type: "rotation", 
            throwProps: true,
            dragClickables: true,
            onDrag: function () {
                const rotation = parseInt(this.rotation % 1000, 10)
                const payments = (rotation < 0) ? rotation + 1000 : rotation
                $this.setState({
                    payments
                }) 
                $this.calculateHours()
            }
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
            textParymentRuns,
            textEmployees,
            textSummary,
            textButton 
        } = block.node

        const sliderSettings = {
            // dots: true,
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            draggable: false,
            swipe: false,
            touchMove: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        }

        return (
            <CalculatorContainer className="py-3 py-lg-4">
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


                <Row className="py-3">
                    <Col>
                        <img 
                            src={dial} 
                            ref={invoiceDial => this.invoiceDial = invoiceDial} 
                            alt="Invoice dial" 
                            width="215" 
                        />
                        <Text>{textInvoices}</Text>
                        <Text>{this.state.invoices} invoices</Text>
                    </Col>
                    <Col>
                        <img 
                            src={dial} 
                            ref={paymentsDial => this.paymentsDial = paymentsDial} 
                            alt="Payments dial" 
                            width="215" 
                        />
                        <Text>{textParymentRuns}</Text>
                        <Text>£{this.state.payments}</Text>
                    </Col>
                    <Col>
                    
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