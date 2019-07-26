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

const FormHeaderSection = styled.div`
  /* display: none; */
  h4 {
    font-size: 2rem;
  }
  @media ${media.md} {
    display: block;
  }
`;

const ContainerMW = styled(ContainerMaxWidth)``;

const FluidContainer = styled.div`
  background-image: ${props =>
    props.disableSideContent === true
      ? "none"
      : "linear-gradient(#f5f8fa, white)"};
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
  align-items: center;
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
      thankYouTitle,
      thankYouMessage
    } = block.node;

    const { components } = this.state;

    if (components.length === 0) return <div>Loading...</div>;

    const componentsElements = components.map(Component => (
      <Component key="sfsfsdfsdre" />
    ));
    // console.log("this.props");
    // console.log(this.props);
    // console.log(this.props.disableSideContent);
    const ContainerSwitch = flag => {};

    return (
      <FluidContainer disableSideContent={this.props.disableSideContent}>
        <ContainerMaxWidth className="py-3 py-lg-4">
          <RowVerticalAlign>
            <Col
              lg={{
                size: this.props.disableSideContent === true ? "" : "6",
                order: 2
              }}
              xs={{
                order: 2
              }}
            >
              <ContentWrap>{componentsElements}</ContentWrap>
            </Col>
            <Col
              lg={{ size: 6, order: 1 }}
              xs={{
                order: 1
              }}
              className={this.props.disableSideContent === true ? "d-none" : ""}
            >
              <FormHeaderSection>
                <h4>{title}</h4>
                <Text
                  dangerouslySetInnerHTML={{ __html: textHTML }}
                  className="py-2"
                />
              </FormHeaderSection>
            </Col>
          </RowVerticalAlign>
        </ContainerMaxWidth>
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
