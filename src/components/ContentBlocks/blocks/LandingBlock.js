import React, { Component } from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import { Container, Row, Col, ModalBody } from "reactstrap";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { media } from "utils/Media";
import Text from "components/shared/Text";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import ButtonPlaySvg from "components/shared/ButtonPlaySvg";
import ModalVideo from "components/shared/ModalVideo";
import ModalVideoClose from "components/shared/ModalVideoClose";

import landingBlockSVG from "images/backgrounds/landing-block.svg";
import landingProductBlockSVG from "images/backgrounds/landing-product-block.svg";
import landingTextMobileSVG from "images/backgrounds/landing-text-mobile.svg";
import landingMobileTopSVG from "images/backgrounds/landing-mobile-top.svg";
import landingMobileBottomSVG from "images/backgrounds/landing-mobile-bottom.svg";
import Button from "components/shared/Button";

import landingProductTopSVG from "images/product-overviews/svg/rocket.svg";

const LandingWrapper = styled.div`
  max-width: 1500px;
  width: 100%;
  padding: 0;
  margin: 0 auto 2rem;
  position: relative;
  overflow: hidden;
  @media ${media.md} {
    margin: 0 auto 4rem;
  }
`;

const LandingContent = styled(ContainerMaxWidth)`
  padding-left: ${props => (props.type === "product" ? "1px" : 0)};
  padding-top: ${props => (props.type === "product" ? "20px" : 0)};
  padding-right: 0;

  @media ${media.md} {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 3rem;
    color: ${props =>
      props.type === "product"
        ? props.theme.colors.black
        : props.theme.colors.white};
  }
  @media ${media.xl} {
    top: 4rem;
    color: ${props =>
      props.type === "product"
        ? props.theme.colors.black
        : props.theme.colors.white};
  }
  @media ${media.xl} {
    top: 8rem;
    color: ${props =>
      props.type === "product"
        ? props.theme.colors.black
        : props.theme.colors.white};
  }
`;

const DesktopImg = styled(Img)`
  display: none;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.black};
    opacity: 0.2;
  }

  @media ${media.md} {
    display: block;
  }
`;

const DesktopHero = styled.div`
  display: none;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.greyLight};
    opacity: 0.2;
  }

  @media ${media.md} {
    display: block;
    height: ${media.md.replace("(min-width:", "").replace(")", "")};
  }
`;

const DesktopSvg = styled.img`
  display: none;

  @media ${media.md} {
    display: block;
    bottom: -2px;
    position: absolute;
    width: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    max-width: none;
  }
`;

const MobileImg = styled(Img)`
  display: block;

  @media ${media.md} {
    display: none;
  }
`;

const LandingH1 = styled.h1`
  font-size: 2rem;
  padding: 1rem 2rem;
  @media ${media.md} {
    font-size: 2rem;
    padding: 0 0 0 0;
  }
  @media ${media.lg} {
    font-size: 3rem;
  }
`;

const HeaderTitle = styled(Text)`
  color: ${props => props.theme.colors.turquoise};
  font-family: ${props => props.theme.font.family.bold};
  letter-spacing: 3px;
`;

const LandingText = styled(Text)`
  font-size: 1rem;
  padding: 1rem 2rem;
  color: ${props =>
    props.type === "product"
      ? props.theme.colors.black
      : props.theme.colors.backOff};

  @media ${media.md} {
    color: ${props =>
      props.type === "product"
        ? props.theme.colors.black
        : props.theme.colors.white};
    padding: 0;
    font-size: 1.15rem;
    position: relative;
    top: -5px;
  }

  @media ${media.lg} {
    padding: 1rem 0;
    font-size: 1.15rem;
  }

  #fineprint {
    font-size: 0.7em;
    padding-top: 10px;
    font-weight: bold;
  }
  @media ${media.md} {
    #fineprint {
      display: block;
      text-align: right;
      position: relative;
      top: -34px;
    }
  }

  @media ${media.lg} {
    #fineprint {
      /* text-align: right; */
      text-align: right;
      position: unset;
    }
  }

  @media ${media.xl} {
    #fineprint {
      /* text-align: right; */
      text-align: left;
      position: unset;
    }
  }
`;

const LandingTextWrap = styled.div`
  position: relative;
  padding: 1rem 0 4rem;

  @media ${media.sm} {
    padding: 1rem 0 8rem;
  }

  @media ${media.md} {
    padding: 0;
  }
`;

const LandingTextBgSvg = styled.img`
  position: absolute;
  bottom: 0;
  width: 100%;

  @media ${media.md} {
    display: none;
  }
`;

const MobileImgWrap = styled.div`
  position: relative;
  display: ${props => (props.hide ? "none" : "block")};
`;

const MobileImgSvgTop = styled.img`
  position: absolute;
  z-index: 1;
  top: -1px;
  width: 100%;

  @media ${media.md} {
    display: none;
  }
`;

const ProductImgSvgTop = styled.img`
  position: absolute;
  top: -3em;
  left: 2em;
  width: 100%;
  max-width: 500px;
  z-index: -8;
  opacity: 0.4;
  transform: rotate(-15deg);
  display: none;

  @media ${media.md} {
    display: block;
  }
`;

const MobileImgSvgBottom = styled.img`
  position: absolute;
  z-index: 1;
  bottom: -1px;
  width: 100%;

  @media ${media.md} {
    display: none;
  }
`;

const WatchNowButton = styled(Button)`
  font-size: ${props => props.theme.font.size.xl};
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
  width: 100%;

  @media ${media.md} {
    width: auto;
    margin-right: 0.5rem;
  }

  &.internalLink {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.purpleDark};
    &:hover {
      color: ${props => props.theme.colors.white};
      background-color: ${props => props.theme.colors.purpleDark};
    }
  }

  &.internalPageLink {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.turquoise};
    &:hover {
      color: ${props => props.theme.colors.white};
      background-color: ${props => props.theme.colors.turquoise};
    }
  }
`;

// const LinkButton = styled(Button)`
//   margin-bottom: 0.5rem;
//   position: relative;
//   z-index: 1;
//   width: 100%;

//   @media ${media.md} {
//     width: auto;
//     margin-right: 0.5rem;
//   }

//   &.internalLink {
//     color: ${props => props.theme.colors.white};
//     background-color: ${props => props.theme.colors.purpleDark};
//     &:hover {
//       color: ${props => props.theme.colors.white};
//       background-color: ${props => props.theme.colors.purpleDark};
//     }
//   }

//   &.internalPageLink {
//     color: ${props => props.theme.colors.white};
//     background-color: ${props => props.theme.colors.turquoise};
//     &:hover {
//       color: ${props => props.theme.colors.white};
//       background-color: ${props => props.theme.colors.turquoise};
//     }
//   }
// `;

const LandingBlock = props => (
  <StaticQuery
    query={graphql`
      query {
        allContentBlocksJson {
          edges {
            node {
              id
              imageDesktop {
                childImageSharp {
                  fluid(maxWidth: 1500) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              imageMobile {
                childImageSharp {
                  fluid(maxWidth: 768) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              title
              headerTitle
              pageType
              videoText
              youtubeVideoID
              text
            }
          }
        }
      }
    `}
    render={data => <Landing data={data} id={props.id} />}
  />
);

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.onReady = this.onReady.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onReady(event) {
    event.target.playVideo();
  }

  render() {
    // Retrieve block
    const block = this.props.data.allContentBlocksJson.edges.filter(
      ({ node }) => this.props.id === node.id
    )[0];

    const {
      title,
      headerTitle,
      text,
      pageType,
      imageDesktop,
      imageMobile,
      videoText,
      youtubeVideoID
    } = block.node;

    const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        rel: 0
      }
    };

    return (
      <>
        <LandingWrapper>
          {imageDesktop != null ? (
            <>
              <DesktopImg
                fluid={imageDesktop.childImageSharp.fluid}
                alt={title}
              />
              <DesktopSvg src={landingBlockSVG} alt="" />{" "}
            </>
          ) : (
            <>
              <DesktopHero />
              <DesktopSvg src={landingProductBlockSVG} alt="" />
            </>
          )}

          <LandingContent type={imageDesktop === null ? "product" : "landing"}>
            <Row>
              <Col
                md={imageDesktop === null ? 6 : 8}
                xl={imageDesktop === null ? 6 : 5}
              >
                {imageDesktop === null ? (
                  <HeaderTitle
                    dangerouslySetInnerHTML={{ __html: headerTitle }}
                  />
                ) : (
                  <></>
                )}

                <LandingH1 dangerouslySetInnerHTML={{ __html: title }} />

                <MobileImgWrap hide={imageDesktop === null}>
                  <MobileImgSvgTop src={landingMobileTopSVG} alt="" />
                  {imageDesktop !== null && (
                    <MobileImg
                      fluid={imageMobile.childImageSharp.fluid}
                      alt=""
                    />
                  )}

                  {youtubeVideoID !== "" && youtubeVideoID !== null && (
                    <WatchNowButton onClick={this.toggle}>
                      <ButtonPlaySvg />
                      <span className="ml-3 video">{videoText}</span>
                    </WatchNowButton>
                  )}
                  <MobileImgSvgBottom src={landingMobileBottomSVG} alt="" />
                </MobileImgWrap>

                <LandingTextWrap>
                  <LandingText
                    dangerouslySetInnerHTML={{ __html: text }}
                    type={imageDesktop === null ? "product" : "landing"}
                  />
                  <LandingTextBgSvg src={landingTextMobileSVG} alt="" />
                </LandingTextWrap>
              </Col>

              {imageDesktop === null ? (
                <Col xl={4} md={6}>
                  <ProductImgSvgTop src={landingProductTopSVG} alt="" />
                </Col>
              ) : (
                <></>
              )}
            </Row>
          </LandingContent>
        </LandingWrapper>
        {youtubeVideoID !== "" && youtubeVideoID !== null && (
          <ModalVideo isOpen={this.state.modal} toggle={this.toggle}>
            <ModalVideoClose onClick={this.toggle} />
            <ModalBody>
              <Container>
                <Row className="justify-content-center">
                  {this.state.modal && (
                    <div className="embed-responsive embed-responsive-16by9">
                      <YouTube
                        videoId={youtubeVideoID}
                        opts={opts}
                        onReady={this.onReady}
                        className="embed-responsive-item"
                      />
                    </div>
                  )}
                </Row>
              </Container>
            </ModalBody>
          </ModalVideo>
        )}
      </>
    );
  }
}

LandingBlock.propTypes = {
  id: PropTypes.node.isRequired
};

export default LandingBlock;
