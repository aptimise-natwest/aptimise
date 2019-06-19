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
const WhitePaperBlock = props => (
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
                childImageSharp {
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
    // render={data => <WhitePaper data={data} id={props.id} log={props.log} />}
    render={data => <WhitePaper data={data} id={props.id} />}
  />
);

const DownloadForm = styled.span`
  display: ${props => props.display};
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
  box-shadow: 0px 0px 4px 2px rgba(171, 168, 171, 1);
  background-color: ${props => props.theme.colors.white};
`;

const FullGrey = styled.div`
  background-color: ${props => props.theme.colors.greyLight};
`;

const ThanksYou = props => {
  var thankYouBlock;

  if (props.downloaded) {
    thankYouBlock = (
      <ThankYouContainer>
        <h2>Thank you!</h2>

        <p>Your guide to an automated future is now in your downloads.</p>

        <p>
          If you want to know more about the specific benefits of AP automation
          for your business, schedule a personalised AP consultation today.{" "}
        </p>
        <p>
          <Button
            as="button"
            className="trigger-bookdemo-modal"
            onClick={props.toggleModal}
          >
            Schedule now
          </Button>
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

class WhitePaper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
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
      modal: window.location.search.includes("thankyou"),
      downloaded: window.location.search.includes("thankyou")
    }));
    // console.log("--------");
    // console.log(this.props);
    // console.log("--------");
  }
  render() {
    // Retrieve block
    const block = this.props.data.allContentBlocksJson.edges.filter(
      ({ node }) => this.props.id === node.id
    )[0];

    const { title, textHTML, buttonText, image } = block.node;
    return (
      <FullGrey>
        <ContainerMaxWidth className="py-3 py-lg-4">
          <RowVerticalAlign>
            <Col lg={{ size: 6, order: 2 }}>
              <Img
                fluid={image.childImageSharp.fluid}
                className="my-3"
                alt={title}
              />
            </Col>
            <Col lg={{ size: 6, order: 1 }}>
              <h4>{title}</h4>
              <Text
                dangerouslySetInnerHTML={{ __html: textHTML }}
                className="py-2"
              />
              <Button
                onClick={this.toggle}
                as="button"
                purple
                blockMobile
                id="whitepaper-download-button"
              >
                {buttonText}
              </Button>
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
                  />
                  <DownloadForm
                    display={this.state.downloaded ? "none" : "block"}
                  >
                    <h4 className="text-center pb-3 pb-md-4">
                      Download Whitepaper
                    </h4>
                    <WhitePaperForm downloaded={this.state.downloaded} />
                  </DownloadForm>
                </Col>
              </Row>
            </Container>
          </ModalBody>
        </ModalAngled>
      </FullGrey>
    );
  }
}

WhitePaperBlock.propTypes = {
  id: PropTypes.node.isRequired
};

export default WhitePaperBlock;
