import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import { Draggable } from "gsap/all"
import styled, { css } from "styled-components"
import { media } from "utils/Media"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import Button from "components/shared/Button"
import dial from "images/dial.png"
import rangeslider from "images/rangeslider.png"

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

const Dial = styled.img`
    width: 215px;

    @media ${media.md} {
        width: 150px;
    }
`

const RangesliderWrap = styled.div`
    position: relative;
    height: 40px;
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

const RangesliderControl = styled.img`
    position: relative;
    z-index: 1;
`

const Slider = styled.div`
    text-align: center;
    padding: 1.5rem 0;

    @media ${media.md} {
        text-align: left;
    }
`

const SliderInner = styled(Row)`
    > div {
        display: none;

        &:first-child {
            display: block;
        }

        @media ${media.md} {
            display: block;
        }
    }
`

const SliderNav = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 50px;
    width: 50px;
    left: 0;

    @media ${media.md} {
        display: none;
    }

    ${props => props.right && css`
        left: auto;
        right: 0;
    `}

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
            hours: 0,
            slide: 0
        }

        this.createDials = this.createDials.bind(this)
        this.calculateHours = this.calculateHours.bind(this)
        this.customSlider = this.customSlider.bind(this)
    }

    componentDidMount() {
        this.createDials()
        this.createRangeSlider()
        this.customSlider()
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
            cursor: "pointer",
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

    createRangeSlider() {
        const $this = this
        const rangeslider = Draggable.create(this.rangeslider, {
            type: "x",
            bounds: this.rangesliderWrap,
            dragClickables: true,
            cursor: "pointer",
            onDrag: function() {
                const employees = this.x * 10;
                $this.setState({
                    employees
                })
            }
        });
    }

    calculateHours() {
        // (10 min to enter + 1 min to approve) X number of invoices) + (20 X number of payment runs per month)
        // (11 X invoices per month) + (20 X payment runs per month) = NUMBER OF HOURS SAVED PER MONTH with automation
        const hours = (11 * this.state.invoices) + (20 * this.state.payments)
        this.setState({
            hours
        })
    }

    customSlider() {
        this.sliderPrev.addEventListener('click', () => this.updateSlide('prev'))
        this.sliderNext.addEventListener('click', () => this.updateSlide('next'))
    }

    updateSlide(direction) {
        let currentSlide = this.state.slide
        const newSlideIndex = direction === 'prev' ? currentSlide - 1  : currentSlide + 1

        const slides = this.sliderInner.children
        console.log(slides.length)

        // Only update if slide is in range
        if (newSlideIndex >= 0 && newSlideIndex <= slides.length-1) {
            slides[newSlideIndex].style.display = 'block'
            slides[currentSlide].style.display = 'none'
            this.setState({
                slide: newSlideIndex
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
                    <SliderNav left ref={sliderPrev => this.sliderPrev = sliderPrev}>
                        <span className="sr-only">Previous</span>
                    </SliderNav>
                    <SliderNav right ref={sliderNext => this.sliderNext = sliderNext}>
                        <span className="sr-only">Next</span>
                    </SliderNav>
                    <SliderInner ref={sliderInner => this.sliderInner = sliderInner}>
                        <div className="col col-md-4">
                            <Dial
                                src={dial}
                                ref={invoiceDial => this.invoiceDial = invoiceDial}
                                alt="Invoice dial"
                            />
                            <Text className="pt-4">{textInvoices}</Text>
                            <TextSummary size="xl" color="purple">{this.state.invoices} invoices</TextSummary>
                        </div>
                        <div className="col col-md-4">
                            <Dial
                                src={dial}
                                ref={paymentsDial => this.paymentsDial = paymentsDial}
                                alt="Payments dial"
                            />
                            <Text className="pt-4">{textPaymentRuns}</Text>
                            <TextSummary size="xl" color="purple">£{this.state.payments}</TextSummary>
                        </div>
                        <div className="col col-md-4">
                            <RangesliderWrap ref={rangesliderWrap => this.rangesliderWrap = rangesliderWrap}>
                                <RangesliderControl src={rangeslider} alt="" ref={rangeslider => this.rangeslider = rangeslider} />
                                <Rangeslider />
                            </RangesliderWrap>
                            <Text className="pt-4">{textEmployees}</Text>
                            <TextSummary size="xl" color="purple">{this.state.employees} employee{this.state.employees > 1 ? 's' : ''}</TextSummary>
                        </div>
                        <div className="col">
                            <TextSummary color="turquoise" className="pt-4 pb-2">
                                {this.state.hours} {textSummary}
                            </TextSummary>
                            <Button turquoise>{textButton}</Button>
                        </div>
                    </SliderInner>
                </Slider>
            

            </CalculatorContainer>
        )
    }

}

CalculatorBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default CalculatorBlock