import React, { Component } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { Container, Row, Col, ModalBody } from "reactstrap";
import WhitePaperForm from "components/WhitePaperForm/WhitePaperForm";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import Text from "components/shared/Text";
import Button from "components/shared/Button";
import ModalAngled from "components/shared/ModalAngled";
import ModalAngledClose from "components/shared/ModalAngledClose";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { media } from "utils/Media";
import LinkBlock from "./LinkBlock";

import FormAngleGrinder from "images/backgrounds/svg-lines.svg";
import Laptop from "images/product-overviews/svg/laptop.svg";
import Invoice from "images/product-overviews/svg/invoice.svg";
import Clock from "images/product-overviews/svg/clock.svg";
import Box from "images/product-overviews/svg/safe.svg";
import SageLogo from "images/logos/Sage_logo.svg";
import XeroLogo from "images/logos/Xero_logo.svg";
import QBOLogo from "images/logos/qbo-logo.svg";

const FormBlock = props => (
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
              form
              background
              align
              mainComponent
              thankYouTitle
              thankYouMessage
              links {
                link
                linkText
                download
              }
            }
          }
        }
      }
    `}
    // render={data => <WhitePaper data={data} id={props.id} log={props.log} />}
    render={data => <Form data={data} id={props.id} {...props} />}
  />
);

const DownloadForm = styled.span`
  display: ${props => props.display};
`;

const IntroText = styled(Text)`
  line-height: 1.7;
  p {
    font-size: 1.2rem;
  }
  margin-bottom: 2rem;
`;

const FormHeaderSection = styled.div`
  /* display: none; */
  h4 {
    font-size: 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  @media ${media.md} {
    display: block;

    h1 {
      font-size: 2.5rem;
    }
  }

  .smallPrint {
    font-size: 0.75em;
    width: auto;
    margin-top: 20px;
    margin-left: 20px;
  }

  .icon-row {
    display: flex;
    margin: 10px 0;
    min-height: 90px;
  }

  .icon-content {
    h6 {
      margin-bottom: 0;
    }
    p {
      font-size: 1rem;
    }
  }

  .logo {
    /* height: 60px;
    width: 60px; */

    display: block;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    /* box-shadow: rgba(204, 125, 247, 0.18) 0px 1px 24px 1px; */
    background: white;
    border-radius: 100%;

    background-repeat: no-repeat;
    background-position: center center;

    background-size: 55px 150px;
    width: 70px;
    height: 60px;
    margin-top: 20px;
    margin-left: 20px;
  }

  .sageLogo {
    background-image: url(${SageLogo});
  }

  .xeroLogo {
    background-image: url(${XeroLogo});
  }

  .qboLogo {
    border-radius: 0;
    background-size: cover;
    width: 140px;
    background-image: url(${QBOLogo});
  }

  .logoGradient {
    height: 60px;
    width: 60px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    box-shadow: rgba(204, 125, 247, 0.18) 0px 1px 24px 1px;
    background: white;
    margin: 0px 10px 0 0;
    border-radius: 100%;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: 30px;
  }

  .laptop {
    background-image: url(${Laptop});
  }

  .invoice {
    background-size: 15px;
    background-image: url(${Invoice});
  }

  .clock {
    background-image: url(${Clock});
  }

  .box {
    background-image: url(${Box});
  }
`;

const ContainerMW = styled(ContainerMaxWidth)`
  padding-right: 15px;
  padding-left: 15px;

  @media ${media.md} {
    padding-right: 2rem;
    padding-left: 2rem;
  }
`;

const FluidContainer = styled.div`
  font-family: ${props => props.theme.font.family.base};

  font-family: ${props =>
    props.mainComponent === true
      ? props.theme.font.family.base
      : props.theme.font.family.light};

  ${props =>
    props.mainComponent === true
      ? "p {color: #525f7f;letter-spacing: -0.03rem} background-repeat: no-repeat;background-position: right -300px bottom;background-size: contain;"
      : ""};

  ${props => (props.mainComponent === true ? "top:-40px" : "")};

  background-image: ${props =>
    props.disableSideContent === true || props.background !== null
      ? "none"
      : "linear-gradient(#f5f8fa, white)"};

  @media ${media.lg} {
    background-image: ${props =>
      props.disableSideContent === true || props.background !== null
        ? "url(" + FormAngleGrinder + ")"
        : "linear-gradient(#f5f8fa, white)"};

    ${props =>
      props.disableSideContent === true || props.background !== null
        ? "background-position: right -400px bottom;"
        : ""}
  }

  @media ${media.xl} {
    background-image: ${props =>
      props.disableSideContent === true || props.background !== null
        ? "url(" + FormAngleGrinder + ")"
        : "linear-gradient(#f5f8fa, white)"};

    ${props =>
      props.disableSideContent === true || props.background !== null
        ? "background-position: right -300px bottom;"
        : ""}
  }

  width: 100%;
  padding-right: ${props =>
    props.disableSideContent === true ? "0px" : "15px"};
  padding-left: ${props =>
    props.disableSideContent === true ? "0px" : "15px"};
  margin-right: auto;
  margin-left: auto;
  margin-top: ${props => (props.disableSideContent === true ? "0px" : "90px")};

  .container {
    padding: ${props => (props.disableSideContent === true ? "0 2rem" : "rem")};
  }

  @media ${media.sm} {
    .container {
      padding: ${props =>
        props.disableSideContent === true ? "0 0rem" : "4rem"};
    }
  }

  margin-top: 40px;

  @media ${media.md} {
    margin-top: 90px;
  }

  @media ${media.md} {
    position: relative;
    ${props => (props.disableSideContent === true ? "top:-141px" : "")};
  }
`;

const ThankYouContainer = styled.span`
  display: "block";
  text-align: center;
  font-weight: 600;
  font-family: "RN House Sans W01 Bold";
  font-size: 1.1em;

  p {
    padding-top: 1em;
  }
`;
const LinkWrap = styled.div`
  padding: 1rem 0;
  display: block;
  align-items: center;
  text-align: center;

  img {
    width: 100%;
  }
`;

const LinkItem = styled.a`
  padding: 1rem 1.25rem;
  color: ${props => props.theme.colors.white};
  font-size: 1.5rem;
  transition: ${props => props.theme.transitionBase};

  @media ${media.sm} {
    padding: 1rem;
  }

  &:first-child {
    padding-left: 0;
  }

  &:hover {
    color: ${props => props.theme.colors.purple};
  }
`;

const RowVerticalAlign = styled(Row)`
  display: flex;
  align-items: ${props => props.align};
  text-align: left;
`;

const FullGrey = styled.div`
  background-color: ${props => props.theme.colors.greyLight};
`;

const ContentWrap = styled.div`
  box-shadow: 0px 0px 4px 2px rgba(232, 227, 236, 0.417647);
  padding: 20px;
  margin: 15px 0;
  background-color: white;

  @media ${media.sm} {
    padding: 40px;
    margin: 0px;
  }
`;

const ThanksYou = props => {
  var thankYouBlock;

  const {
    id,
    title,
    textHTML,
    buttonText,
    form,
    background,
    align,
    mainComponent,
    thankYouTitle,
    thankYouMessage,
    links
  } = props.block.node;

  if (props.downloaded) {
    thankYouBlock = (
      <ThankYouContainer>
        <Text dangerouslySetInnerHTML={{ __html: thankYouTitle }} size="lg" />
        <Text dangerouslySetInnerHTML={{ __html: thankYouMessage }} size="lg" />

        <p>
          <Button
            as="button"
            className="trigger-bookdemo-modal"
            onClick={props.toggleModal}
            display={links.length === 0 ? "true" : "false"}
          >
            Schedule now
          </Button>
          <LinkBlock id={id} />
          <p>
            <LinkWrap>
              <LinkItem
                href="https://twitter.com/NatWestBusiness"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} color="#42145F" />
              </LinkItem>
              <LinkItem
                href="https://www.linkedin.com/company/natwest-business"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} color="#42145F" />
              </LinkItem>
              <LinkItem
                href="https://www.facebook.com/NatWestBusiness"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} color="#42145F" />
              </LinkItem>
            </LinkWrap>
          </p>
        </p>
      </ThankYouContainer>
    );
  }

  return <>{thankYouBlock}</>;
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      block: null,
      components: []
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount() {
    // console.log(this.state);
    // console.log(window.location);
    this.setState(prevState => ({
      modal:
        window.location.search.includes("thankyou") &&
        (window.location.search.includes("pricing") ||
          window.location.search.includes("consultation")),
      downloaded:
        window.location.search.includes("thankyou") &&
        (window.location.search.includes("pricing") ||
          window.location.search.includes("consultation"))
    }));
    //console.log("---FORMSSSS-----");
    //console.log(this.props);
    // console.log("--------");

    const block = this.props.data.allContentBlocksJson.edges.filter(
      ({ node }) => this.props.id === node.id
    )[0];

    this.setState({
      block: block
    });

    this.addComponent(block.node.form);
  }

  addComponent = type => {
    console.log(`Loading ${type} component...`);

    try {
      import(`./Forms/${type}.js`)
        .then(component =>
          this.setState({
            components: this.state.components.concat(component.default)
          })
        )
        .catch(error => {
          console.error(`"${type}" not yet supported`);
        });
    } catch (error) {
      console.error(`"${error}"`);
    }
  };

  render() {
    // Retrieve block
    const block = this.props.data.allContentBlocksJson.edges.filter(
      ({ node }) => this.props.id === node.id
    )[0];
    const {
      title,
      textHTML,
      buttonText,
      form,
      background,
      align,
      mainComponent,
      thankYouTitle,
      thankYouMessage
    } = block.node;

    const { components } = this.state;

    if (components.length === 0) return <div>Loading...</div>;

    const componentsElements = components.map(Component => (
      <Component key="sfsfsdfsdre" />
    ));
    // console.log("this.props");
    // console.log(align);
    // console.log(this.props.disableSideContent);
    const ContainerSwitch = flag => {};

    return (
      <FluidContainer
        disableSideContent={this.props.disableSideContent}
        background={background}
        mainComponent={mainComponent}
      >
        <ContainerMW className="py-3 py-lg-4">
          <RowVerticalAlign align={align}>
            <Col
              lg={{
                size: this.props.disableSideContent === true ? "" : "5",
                order: 2
              }}
              xs={{
                order: 2
              }}
            >
              <ContentWrap>{componentsElements}</ContentWrap>
            </Col>
            <Col
              lg={{ size: 7, order: 1 }}
              xs={{
                order: 1
              }}
              className={this.props.disableSideContent === true ? "d-none" : ""}
            >
              <FormHeaderSection>
                {mainComponent === true ? <h1>{title}</h1> : <h4>{title}</h4>}
                <IntroText
                  dangerouslySetInnerHTML={{ __html: textHTML }}
                  className="py-2"
                />
              </FormHeaderSection>
            </Col>
          </RowVerticalAlign>
        </ContainerMW>
        <ModalAngled
          isOpen={this.state.modal}
          toggle={this.toggle}
          background={true}
        >
          <ModalAngledClose onClick={this.toggle} />
          <ModalBody>
            <Container>
              <Row className="justify-content-center">
                <Col md={6} lg={6}>
                  <ThanksYou
                    downloaded={this.state.downloaded}
                    toggleModal={this.toggle}
                    {...this.state}
                  />
                </Col>
              </Row>
            </Container>
          </ModalBody>
        </ModalAngled>
      </FluidContainer>
    );
  }
}

FormBlock.propTypes = {
  id: PropTypes.node.isRequired
};

export default FormBlock;
