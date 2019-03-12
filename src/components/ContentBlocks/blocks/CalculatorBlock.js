import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import { Draggable } from "gsap/all"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { media } from "utils/Media"
import { debounce } from 'throttle-debounce';
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import Button from "components/shared/Button"
import dial from "images/dial.png"
import rangeslider from "images/rangeslider.png"
import people from "images/people.png"
import pound from "images/pound.svg"
import invoice from "images/invoice.svg"
import employee from "images/employee.svg"

const CalculatorContainer = styled(ContainerMaxWidth)`
    position: relative;
    padding-top: 1.5rem;

    @media ${media.md} {
        padding-bottom: 12rem;
    }
`

const CalculatorBgSvg = styled.svg`
    display: none;
    @media  ${media.md} {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }
`

const TextSummary = styled(Text)`
    font-size: ${props => props.theme.font.size.xl};
    
    max-width: 100% !important;

    @media ${media.lg} {
        font-size: 2.25rem;
    }

    ${props => props.textWrap && css`
        white-space: nowrap;
    `}

    ${props => props.large && css`
        font-size: 2rem;
    `}
`

const Dial = styled.div`
    display: inline-block;
    img {
        width: 215px;
        @media ${media.md} {
            width: 150px;
        }
    }
`

const RangesliderWrap = styled.div`
    position: relative;
    height: 40px;
    margin-top: 1.6rem;
    text-align: left !important;
`

const Rangeslider = styled.div`
    width: 100%;
    height: 5px;
    background-color: ${props => props.theme.colors.grey};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &:after,
    &:before {
        content: "";
        background-color: ${props => props.theme.colors.grey};
        width: 2px;
        height: 40px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    &:after {
        left: auto;
        right: 0;
    }
`

const RangesliderControl = styled.div`
    position: relative;
    display: inline-block;
    z-index: 1;
`

const RangesliderPeople = styled.div`
    height: 110px;
    img {
        width: 100%;
        margin-top: 2rem;
    }
`

const Input = styled.input`
    display: inline-block;
    width: 15px;
    border: 0;
    color: ${props => props.theme.colors.purple};
    max-width: 50% !important;

    @media ${media.lg} {
        width: 25px;
    }
`

const Slider = styled.div`
    text-align: center;
    padding: 1.5rem 0;
    position: relative;

    @media ${media.md} {
        text-align: left;
    }
`

const Slide = styled(Col)`
    display: none;
    max-width: 434px;
    padding-left: 3rem;
    padding-right: 3rem;

    &:first-child {
        display: block;
    }

    @media ${media.md} {
        padding-left: 15px;
        padding-right: 15px;
        display: block !important;
        max-width: 33.3%;
    }
`

const SlideFullWidth = styled(Slide)`
    max-width: 100% !important;
    padding-left: 15px;
    padding-right: 15px;
`

const SliderNav = styled.button`
    position: absolute;
    z-index: 10;
    top: 40%;
    transform: translateY(-50%);
    height: 50px;
    width: 50px;
    left: -1.5rem;
    color: ${props => props.theme.colors.greyMedium};
    font-size: 2rem;
    background-color: transparent;
    border: 0;

    @media ${media.md} {
        display: none;
    }

    ${props => props.right && css`
        left: auto;
        right: -1.5rem;
    `}
`

const MobileSummary = styled(Row)`
    text-align: left;
    padding-bottom: 1rem;
    @media ${media.md} {
        display: none;
    }
`

const MobileSummaryLink = styled.button`
    background-color: transparent;
    border: 0;
    color: ${props => props.theme.colors.purple};
    text-decoration: underline;
`

const DemoButton = styled(Button)`
    width: 100%;
    margin-top: 1rem;
    @media ${media.md} {
        width: auto;
    }
`

const SliderCounter = styled.div`
    padding: 1rem;
    text-align: center;

    @media ${media.md} {
        display: none;
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
            slide: 0
        }

        this.createDials = this.createDials.bind(this)
        this.createRangeSlider = this.createRangeSlider.bind(this)
        this.calculateHours = this.calculateHours.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.createDials()
        this.createRangeSlider()
    }

    createDials() {

        const $this = this

        Draggable.create(this.invoiceDial, {
            type: "rotation",
            dragClickables: true,
            throwProps: true,
            cursor: "pointer",
            onDrag: function () {
                const rotation = parseInt(this.rotation % 1000, 10)
                const invoices = (rotation < 0) ? rotation + 1000 : rotation
                // Stop lag with debounce
                debounce(200, $this.setState({ invoices }))
                $this.updateInputWidth($this.invoices)
            }
        })

        Draggable.create(this.paymentsDial, {
            type: "rotation", 
            throwProps: true,
            dragClickables: true,
            lockAxis: true,
            cursor: "pointer",
            onDrag: function () {
                const rotation = parseInt(this.rotation % 1000, 10) * 100
                const payments = (rotation < 0) ? rotation + 1000000 : rotation
                // Stop lag with debounce
                debounce(200, $this.setState({ payments }))
                $this.updateInputWidth($this.payments)
            }
        })

    }

    createRangeSlider() {
        const $this = this
        Draggable.create(this.rangeslider, {
            type: "x",
            bounds: this.rangesliderWrap,
            dragClickables: true,
            allowEventDefault: true,
            cursor: "pointer",
            onDrag: function() {
                //min max values of rangeslider
                const min = 1
                const max = 5000
                // Position of control
                const position = Math.trunc(this.x)
                // Width of rangeslider minus control width
                const boundsWidth = Math.trunc(ReactDOM.findDOMNode($this.rangesliderWrap).getBoundingClientRect().width - 40) // 40 = control width
                // percentage across of control
                const percentage = (position / boundsWidth) * 100 
                // employees = percentage of max
                let employees = Math.trunc((percentage / 100) * max)
                // dont allow below min or greater than max
                employees = employees < min ? min : employees
                employees = employees > max ? max : employees
                // Stop lag with debounce
                debounce(200, $this.setState({ employees }))
                $this.updateInputWidth($this.employees)
            }
        });
    }

    calculateHours() {
        // (10 min to enter + 1 min to approve) X number of invoices) + (20 X number of payment runs per month)
        // (11 X invoices per month) + (20 X payment runs per month) = NUMBER OF HOURS SAVED PER MONTH with automation
        let hours = (11 * this.state.invoices) + (20 * this.state.payments)
        return hours
    }

    updateSlide(direction) {
        let currentSlide = this.state.slide
        let newSlideIndex

        if (typeof direction === 'string') {
            newSlideIndex = direction === 'prev' ? currentSlide - 1 : currentSlide + 1
        } else {
            newSlideIndex = direction
        }

        const slides = document.getElementById('sliderInner').children

        // Only update if slide is in range
        if (newSlideIndex >= 0 && newSlideIndex <= slides.length-1) {
            slides[newSlideIndex].style.display = 'block'
            slides[currentSlide].style.display = 'none'
            this.setState({
                slide: newSlideIndex
            })
        }
    }

    updateInputWidth(target) {
        const value = target.value
        let textWidth = 15

        if (typeof window !== 'undefined') {
            textWidth = window.innerWidth < 992 ? 15 : 25 
        }

        // Change width of input based on input
        target.style.width = ((value.length) * textWidth) + 'px';
    }

    // Method to update field values in state on change
    handleChange(e) {
        const target = e.target;
        const name = target.name
        const value = target.value
        const number = /^[0-9\b]+$/;

        // test the regex for number
        if (number.test(value)) {
            this.updateInputWidth(target)

            // Update value in state
            this.setState({
                [name]: value,
            })
        }
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
            <>
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

                    <Slider>
                        {this.state.slide !== 3 && 
                            <>
                                <SliderNav 
                                    left 
                                    onClick={() => this.updateSlide('prev')}
                                    style={{
                                        display: this.state.slide === 0 ? 'none' : 'block'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                    <span className="sr-only">Previous</span>
                                </SliderNav>
                                <SliderNav 
                                    right 
                                    onClick={() => this.updateSlide('next')}
                                >
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <span className="sr-only">Next</span>
                                </SliderNav>
                            </>
                        }
                        <Row id="sliderInner" className="justify-content-center">
                            <Slide md={4}>
                                <Dial ref={invoiceDial => this.invoiceDial = invoiceDial}>
                                    <img src={dial} alt="Invoice dial" />
                                </Dial>
                                <Text className="pt-4">{textInvoices}</Text>
                                <TextSummary size="xl" color="purple" textWrap>
                                        <Input
                                            type="text"
                                            value={this.state.invoices}
                                            name="invoices"
                                            ref={invoices => this.invoices = invoices}
                                            onChange={e => {
                                                this.handleChange(e)
                                            }}
                                        /> invoices
                                </TextSummary>
                            </Slide>
                            <Slide md={4}>
                                <Dial ref={paymentsDial => this.paymentsDial = paymentsDial}>
                                    <img src={dial} alt="Payments dial" />
                                </Dial>
                                <Text className="pt-4">{textPaymentRuns}</Text>
                                <TextSummary size="xl" color="purple" textWrap>
                                    £ 
                                    <Input
                                        type="text"
                                        value={this.state.payments}
                                        name="payments"
                                        ref={payments => this.payments = payments}
                                        onChange={e => {
                                            this.handleChange(e)
                                        }}
                                    />
                                </TextSummary>
                            </Slide>
                            <Slide md={4}>
                                <RangesliderWrap ref={rangesliderWrap => this.rangesliderWrap = rangesliderWrap}>
                                    <RangesliderControl ref={rangeslider => this.rangeslider = rangeslider}>
                                        <img src={rangeslider} alt="Control" />
                                    </RangesliderControl>
                                    <Rangeslider />
                                </RangesliderWrap>
                                <RangesliderPeople>
                                    <img src={people} alt="" />
                                </RangesliderPeople>
                                <Text className="pt-4">{textEmployees}</Text>
                                <TextSummary size="xl" color="purple" textWrap>
                                    <Input
                                        type="text"
                                        value={this.state.employees}
                                        name="employees"
                                        ref={employees => this.employees = employees}
                                        onChange={e => {
                                            this.handleChange(e)
                                        }}
                                    /> employee{this.state.employees > 1 ? 's' : ''}
                                </TextSummary>
                            </Slide>
                            <SlideFullWidth>

                                <MobileSummary>
                                    <Col>
                                        <Text size="lg">
                                            <img src={employee} alt="Invoice" className="mr-2" width="20" /> {this.state.employees} employee{this.state.employees > 1 ? 's' : ''}
                                        </Text>
                                    </Col>
                                    <Col xs={3}>
                                        <MobileSummaryLink onClick={() => this.updateSlide(2)}>change</MobileSummaryLink>
                                    </Col>
                                </MobileSummary>
                                <MobileSummary>
                                    <Col>
                                        <Text size="lg">
                                            <img src={invoice} alt="Invoice" className="mr-2" width="20" /> {this.state.invoices} invoices
                                        </Text>
                                    </Col>
                                    <Col xs={3}>
                                        <MobileSummaryLink onClick={() => this.updateSlide(0)}>change</MobileSummaryLink>
                                    </Col>
                                </MobileSummary>
                                <MobileSummary>
                                    <Col>
                                        <Text size="lg">
                                            <img src={pound} alt="Pound" className="mr-2" width="20" /> {this.state.payments} turnover
                                        </Text>
                                    </Col>
                                    <Col xs={3}>
                                        <MobileSummaryLink onClick={() => this.updateSlide(1)}>change</MobileSummaryLink>
                                    </Col>
                                </MobileSummary>

                                <TextSummary color="turquoise" className="pt-4 pb-2" large>
                                    {this.calculateHours()} {textSummary}
                                </TextSummary>
                                <DemoButton turquoise as="button" className="trigger-bookdemo-modal">{textButton}</DemoButton>
                            </SlideFullWidth>
                        </Row>
                        <SliderCounter>
                            <Text size="md" color="greyMedium">
                                {this.state.slide + 1} / 4
                            </Text>
                        </SliderCounter>
                    </Slider>
                </CalculatorContainer>
            </>
        )
    }

}

CalculatorBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default CalculatorBlock