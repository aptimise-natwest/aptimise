import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { Row, Col } from "reactstrap";
import { Draggable } from "gsap/all";
import styled, { css } from "styled-components";
import { media } from "utils/Media";
import { debounce } from "throttle-debounce";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import Text from "components/shared/Text";
import Button from "components/shared/Button";

import greyAngleBg from "images/backgrounds/grey-angle-bg.svg";

import rangeslider from "images/rangeslider.png";

const CalculatorContainer = styled(ContainerMaxWidth)`
  position: relative;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;

  @media ${media.md} {
    padding-bottom: 1.5rem;
  }
`;

const Container = styled.div`
  background-color: #f9f9f9;
  margin: 150px auto;
  padding: 25px 0px; 


  @media ${media.sm} {
    padding: 50px;
  }

`;

const CalculatorBgSvg = styled.img`
  display: none;
  @media ${media.md} {
    display: none;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
  }
`;

const TextSummary = styled(Text)`
  font-size: ${props => props.theme.font.size.xl};

  max-width: 100% !important;

  @media ${media.lg} {
    font-size: 1.5rem;
  }

  ${props =>
    props.textWrap &&
    css`
      white-space: nowrap;
    `}

  ${props =>
    props.large &&
    css`
      font-size: 2rem;
    `}
`;

const Dial = styled.div`
  display: inline-block;
  img {
    width: 215px;
    @media ${media.md} {
      width: 150px;
    }
  }
`;

const RangesliderWrap = styled.div`
  position: relative;
  height: 40px;
  margin-top: 0.6rem;
  text-align: left !important;
`;

const Rangeslider = styled.div`
  width: 100%;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  height: 10px;
  background-color: transparent;
  border-radius: 15px;
  border: 1px solid #dcdcdc;

  &:before {
    content: " ";
    border: 1px solid #00adb9;
    background-color: #00adb9;
    height: 10px;
    border-radius: 15px;
    width: ${props => props.width}%;
    position: absolute;
    left: 0;
  }
`;

const RangesliderControl = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1;
`;

const RangesliderPeople = styled.div`
  height: 110px;
  img {
    width: 100%;
    margin-top: 2rem;
  }
`;

const Input = styled.input`
  display: inline-block;
  width: 20px;
  /* padding-left: .5rem;
    padding-right: .5rem; */
  border: 0;
  color: ${props => props.theme.colors.purple};
  max-width: 50% !important;

  @media ${media.lg} {
    width: 25px;
  }
`;

const Slider = styled.div`
  text-align: center;
  padding: 1.5rem 0;
  position: relative;

  @media ${media.md} {
    text-align: left;
  }
`;

const Slide = styled(Col)`
  display: none;
  max-width: 434px;

  &:first-child {
    display: block;
  }

  @media ${media.md} {
    padding-left: 15px;
    padding-right: 15px;
    display: block !important;
    max-width: 100%;
  }
`;

const SlideFullWidth = styled(Slide)`
  max-width: 100% !important;
  padding-left: 15px;
  padding-right: 15px;
`;

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

  ${props =>
    props.right &&
    css`
      left: auto;
      right: -1.5rem;
    `}
`;

const MobileSummary = styled(Row)`
  text-align: left;
  padding-bottom: 1rem;
  @media ${media.md} {
    display: none;
  }
`;

const MobileSummaryLink = styled.button`
  background-color: transparent;
  border: 0;
  color: ${props => props.theme.colors.purple};
  text-decoration: underline;
`;

const SliderCounter = styled.div`
  padding: 1rem;
  text-align: center;

  @media ${media.md} {
    display: none;
  }
`;
const SliderValues = styled.span`
  color: #00adb9;
  font-size: 1.2em;
  font-weight: 600;
`;
const Saving = styled.div`
  font-weight: 400;
  text-align: center;
  color: #00adb9;
  line-height: 1;
  padding-bottom: 0.5em;
  font-size: 1em;

  .value {
    font-weight: 600;
  }

  @media ${media.lg} {
    font-size: 2em;
    text-align: right;
  }
`;

const CalculatorBlock = props => (
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
    render={data => <Calculator data={data} id={props.id} />}
  />
);

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: 50,
      payments: 1,
      employees: 1,
      slide: 0
    };

    this.createDials = this.createDials.bind(this);
    this.createRangeSlider = this.createRangeSlider.bind(this);
    this.createRangeSliderPayments = this.createRangeSliderPayments.bind(this);
    this.calculateHours = this.calculateHours.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.createDials();
    this.createRangeSlider();
    this.createRangeSliderPayments();
  }

  createDials() {
    const $this = this;

    Draggable.create(this.invoiceDial, {
      type: "rotation",
      dragClickables: true,
      throwProps: true,
      cursor: "pointer",
      onDrag: function() {
        const rotation = parseInt(this.rotation % 1000, 10);
        const invoices = rotation < 0 ? rotation + 1000 : rotation;
        // Stop lag with debounce
        debounce(200, $this.setState({ invoices }));
        //  $this.updateInputWidth($this.invoices);
      }
    });

    Draggable.create(this.paymentsDial, {
      type: "rotation",
      throwProps: true,
      dragClickables: true,
      lockAxis: true,
      cursor: "pointer",
      onDrag: function() {
        const rotation = parseInt(this.rotation % 1000, 10) * 100;
        const payments = rotation < 0 ? rotation + 1000000 : rotation;
        // Stop lag with debounce
        debounce(200, $this.setState({ payments }));
        //  $this.updateInputWidth($this.payments);
      }
    });
  }

  createRangeSlider() {
    const $this = this;
    Draggable.create(this.rangeslider, {
      type: "x",
      bounds: this.rangesliderWrap,
      dragClickables: true,
      allowEventDefault: true,
      cursor: "pointer",
      onDrag: function() {
        //min max values of rangeslider
        const min = 50;
        const max = 10000;
        // Position of control
        const position = Math.trunc(this.x);
        // Width of rangeslider minus control width
        const boundsWidth = Math.trunc(
          ReactDOM.findDOMNode($this.rangesliderWrap).getBoundingClientRect()
            .width - 40
        ); // 40 = control width

        // percentage across of control
        const percentage = (position / boundsWidth) * 100;

        // employees = percentage of max
        //let invoices = Math.trunc((percentage / 100) * max);
        let invoices = (percentage / 100) * max;

        // dont allow below min or greater than max
        invoices = invoices < min ? min : invoices;
        invoices = invoices > max ? max : invoices;

        invoices = invoices - (invoices % min);

        // Stop lag with debounce
        debounce(200, $this.setState({ invoices }));
        //  $this.updateInputWidth($this.employees);
      }
    });
  }

  createRangeSliderPayments() {
    const $this = this;

    Draggable.create(this.rangesliderPayments, {
      type: "x",
      bounds: this.rangesliderPaymentsWrap,
      dragClickables: true,
      allowEventDefault: true,
      cursor: "pointer",
      onDrag: function() {
        //min max values of rangeslider
        const min = 1;
        const max = 30;
        // Position of control
        const position = Math.trunc(this.x);
        // Width of rangeslider minus control width
        const boundsWidth = Math.trunc(
          ReactDOM.findDOMNode(
            $this.rangesliderPaymentsWrap
          ).getBoundingClientRect().width - 40
        ); // 40 = control width
        // percentage across of control
        // console.log(position);
        const percentage = (position / boundsWidth) * 100;
        // employees = percentage of max

        // Commented out the Trunc for slider width smooth rendering
        //let payments = Math.trunc((percentage / 100) * max);
        let payments = (percentage / 100) * max;
        // dont allow below min or greater than max
        payments = payments < min ? min : payments;
        payments = payments > max ? max : payments;

        // Stop lag with debounce
        debounce(200, $this.setState({ payments }));
        //  $this.updateInputWidth($this.employees);
      }
    });
  }

  calculateHours() {
    // (10 min to enter + 1 min to approve) X number of invoices) + (20 X number of payment runs per month)
    // (11 X invoices per month) + (20 X payment runs per month) = NUMBER OF HOURS SAVED PER MONTH with automation
    const invoices = this.state.invoices === "" ? 0 : this.state.invoices;
    const payments = this.state.payments === "" ? 0 : this.state.payments;

    // console.log(`invoice : ${Math.abs((invoices * 11) / 60)}`);
    // console.log(`payments : ${Math.abs((payments * 20) / 60)}`);

    let hours = Math.abs((invoices * 11) / 60) + Math.abs((payments * 20) / 60);
    return hours.toFixed(0);
  }

  updateSlide(direction) {
    let currentSlide = this.state.slide;
    let newSlideIndex;

    if (typeof direction === "string") {
      newSlideIndex =
        direction === "prev" ? currentSlide - 1 : currentSlide + 1;
    } else {
      newSlideIndex = direction;
    }

    const slides = document.getElementById("sliderInner").children;

    // Only update if slide is in range
    if (newSlideIndex >= 0 && newSlideIndex <= slides.length - 1) {
      slides[newSlideIndex].style.display = "block";
      slides[currentSlide].style.display = "none";
      this.setState({
        slide: newSlideIndex
      });
    }
  }

  updateInputWidth(target) {
    const value = target.value;
    let textWidth = 15;

    if (typeof window !== "undefined") {
      textWidth = window.innerWidth < 992 ? 18 : 28;
    }

    // Change width of input based on input
    target.style.width = value.length * textWidth + "px";
  }

  // Method to update field values in state on change
  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const number = /^[0-9\b]+$/;

    // Only update if number or empty
    if (!number.test(value)) {
      if (value === "") {
        this.setState({
          [name]: value
        });
      }
    } else {
      this.setState({
        [name]: value
      });
    }

    this.updateInputWidth(target);
  }

  render() {
    // Retrieve block
    const block = this.props.data.allContentBlocksJson.edges.filter(
      ({ node }) => this.props.id === node.id
    )[0];

    const {
      title,
      textHTML,
      textInvoices,
      textPaymentRuns,
      textEmployees,
      textSummary,
      textButton
    } = block.node;

    return (
      <Container>
        <CalculatorContainer>
          <CalculatorBgSvg src={greyAngleBg} alt="" />

          <Row>
            <Col md={8} lg={6}>
              <h4>{title}</h4>
              <Text
                className="pb-3"
                dangerouslySetInnerHTML={{ __html: textHTML }}
              />
            </Col>
          </Row>

          <Row>
            <Col md={7}>
              <div>
                <Slide name="invoiceslider">
                  <Text className="pt-4">
                    <SliderValues>{this.state.invoices}</SliderValues>{" "}
                    {textInvoices}
                  </Text>

                  <RangesliderWrap
                    ref={rangesliderWrap =>
                      (this.rangesliderWrap = rangesliderWrap)
                    }
                  >
                    <RangesliderControl
                      ref={rangeslider => (this.rangeslider = rangeslider)}
                    >
                      <img src={rangeslider} alt="Control" width="40" />
                    </RangesliderControl>
                    <Rangeslider width={this.state.invoices / 100} />
                  </RangesliderWrap>
                </Slide>
              </div>
              <div>
                <Slide name="paymentslider">
                  <Text className="pt-4">
                    <SliderValues>
                      {this.state.payments.toFixed(0)}
                    </SliderValues>{" "}
                    payment run
                    {this.state.payments > 1 ? "s" : ""} {textPaymentRuns}
                  </Text>

                  <RangesliderWrap
                    ref={rangesliderPaymentsWrap =>
                      (this.rangesliderPaymentsWrap = rangesliderPaymentsWrap)
                    }
                  >
                    <RangesliderControl
                      ref={rangesliderPayments =>
                        (this.rangesliderPayments = rangesliderPayments)
                      }
                    >
                      <img src={rangeslider} alt="Control" width="40" />
                    </RangesliderControl>
                    <Rangeslider width={(this.state.payments * 100) / 30} />
                  </RangesliderWrap>
                </Slide>
              </div>
            </Col>
            <Col md={5}>
              <TextSummary color="turquoise" className="pt-4 pb-2" large>
                <Saving>
                  <span className="value">{this.calculateHours()} hours </span>{" "}
                  {textSummary}
                </Saving>
                <Button
                  purple
                  blockMobile
                  as="button"
                  className="trigger-bookdemo-modal mt-2 float-right"
                >
                  {textButton}
                </Button>
              </TextSummary>
            </Col>
          </Row>
        </CalculatorContainer>
      </Container>
    );
  }
}

CalculatorBlock.propTypes = {
  id: PropTypes.node.isRequired
};

export default CalculatorBlock;
