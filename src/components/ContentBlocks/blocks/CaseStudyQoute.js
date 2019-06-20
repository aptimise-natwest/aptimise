import React, { Component } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { Row, Col } from "reactstrap";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import Text from "components/shared/Text";
import { media } from "utils/Media";
import Hexagon from "components/shared/Hexagon";
import HexagonCopy from "components/shared/HexagonCopy";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.css";
import HexagonShape from "images/hexagon.svg";
import Button from "components/shared/Button";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";
import CaseStudyProvider from "../../shared/provider/CaseStudyProvider";
import greyAngleBg from "images/backgrounds/grey-angle-bg-flat.svg";
import aptimiseBoxes from "images/product-overviews/png/aptimise-boxes.png";

const CaseStudyQoute = props => (
  <StaticQuery
    query={graphql`
      query {
        allContentBlocksJson {
          edges {
            node {
              id
              type
              referenceBlock
              dataFilter
              carouselBlocks {
                imageCopy
                name
                position
                textHTML
                twitter
                linkedIn
                facebook
                youtubeVideoId
                links {
                  link
                  linkText
                  download
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Blocks data={data} id={props.id} />}
  />
);

const CarouselWrap = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 3rem;
`;

const LinkWrap = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 100%;
  }
`;

const LinkItem = styled.a`
  padding: 1rem 1.25rem;
  color: ${props => props.theme.colors.purpleDark};
  font-size: 1.5rem;
  transition: ${props => props.theme.transitionBase};

  @media ${media.sm} {
    padding: 1rem;
  }

  &:first-child {
    padding-left: 0;
  }

  &:hover {
    color: ${props => props.theme.colors.grey};
  }
`;

const HexagonCarouselContainer = styled(ContainerMaxWidth)`
  padding-left: 0;
  padding-right: 0;
  overflow-x: hidden;
`;

const HexagonCarousel = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 1.5rem 0;

  @media ${media.md} {
    display: flex;
    /* align-items: center;
        justify-content: center; */
    /* margin-left: -70px; */
  }

  .absoluteHelper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -70px;
  }
`;

const ArrowLeft = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  font-size: 2.5rem;
  left: 2rem;
  background-color: transparent;
  border: 0;
  color: ${props => props.theme.colors.grey};
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 2rem;
`;

const DesktopHexagons = styled(Col)`
  display: none;

  @media ${media.md} {
    display: block;
  }
`;

const MobileHexagons = styled(Col)`
  display: block;

  @media ${media.md} {
    display: none;
  }
`;

const HexagonCarouselItem = styled.div`
  margin-right: -90px;
  width: 176px;
  overflow: hidden;

  /* &:hover {
        >div:not(.active)  {
            opacity: 1 !important;
            z-index: 100 !important;
            >div  {
                opacity: 0.8 !important;
            }
        }
    } */
`;

const HexagonCarouselMobileItem = styled.div`
  width: 270px;
  margin-right: -150px;

  &.hidden {
    display: none;
  }
`;

const FluidContainer = styled.div`
  background: linear-gradient(
    180deg,
    rgba(245, 248, 250, 0.1) 0%,
    #f5f8fa 100%
  );
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 90px;
`;
const CaseItemContainer = styled.div``;

const CaseItemQoute = styled(Text)`
  p {
    font-size: 1.8em;
    line-height: 1.2;
    font-weight: bold;
  }
  &:before {
    content: "“";
    position: absolute;
    font-size: 20em;
    z-index: 999;
    top: -0.75em;
    left: -0.12em;
    transform: rotate(-10deg);
    opacity: 0.1;
  }
`;

const CaseItemQouteBy = styled.div`
  color: #1e1e1e;
  font-weight: 300;
  margin: 10px 0;
`;

const DesktopSvg = styled.img`
  display: none;

  @media ${media.md} {
    display: block;
    bottom: 0px;
    position: relative;
    width: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    max-width: none;
  }
`;

const AptimiseBox = styled.img`
  display: none;

  @media ${media.md} {
    display: block;
    max-width: 100%;
    max-height: 300px;
  }
`;

const LinkButton = styled(Button)`
  margin-bottom: 0.5rem;
  margin-top: 25px;
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
`;

class Blocks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carouselImages: null,
      carouselBottom: null,
      slideIndex: 0,
      maxIndex: 1
    };

    this.getBlock = this.getBlock.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.changeSliders = this.changeSliders.bind(this);
  }

  componentDidMount() {
    const block = this.getBlock();
  }

  changeSliders(next) {
    setTimeout(() => {
      this.carouselBottom.slickGoTo(next);
    }, 200);

    this.setState({
      slideIndex: next
    });
  }

  imgClick(id) {
    this.setState({
      slideIndex: id
    });
    this.changeSliders(id);
  }

  leftClick() {
    this.imgClick(
      this.state.slideIndex === 0
        ? this.state.maxIndex
        : this.state.slideIndex - 1
    );
  }

  rightClick() {
    this.imgClick(
      this.state.slideIndex === this.state.maxIndex
        ? 0
        : this.state.slideIndex + 1
    );
  }

  renderImage(id, block) {
    let opacity = 0.05;
    let className = "";
    const zIndex = 99 - Math.abs(this.state.slideIndex - id);

    if (this.state.slideIndex === id) {
      opacity = 1;
      className = "active";
    }

    if (this.state.slideIndex - 1 === id || this.state.slideIndex + 1 === id) {
      opacity = 0.8;
    }

    if (this.state.slideIndex - 2 === id || this.state.slideIndex + 2 === id) {
      opacity = 0.2;
    }

    let styleAux = { opacity, zIndex };
    let copyOpacity = 0;

    if (className === "active") {
      copyOpacity = 1;
    }
    return (
      <Hexagon
        src={HexagonShape}
        copy={block.imageCopy}
        className={className}
        style={styleAux}
      >
        <HexagonCopy copyOpacity={copyOpacity}>
          <div>{block.imageCopy}</div>
        </HexagonCopy>
      </Hexagon>
    );
  }

  renderMobileImage(id, block) {
    let opacity = 0.05;
    let className = "";
    const zIndex = 99 - Math.abs(this.state.slideIndex - id);

    if (this.state.slideIndex === id) {
      opacity = 1;
      className = "active";
    }

    if (this.state.slideIndex - 1 === id || this.state.slideIndex + 1 === id) {
      opacity = 0.8;
    }

    if (this.state.slideIndex - 2 === id || this.state.slideIndex + 2 === id) {
      opacity = 0.2;
      className = "active";
    }

    let styleAux = { opacity, zIndex };

    return (
      <Hexagon
        src={HexagonShape}
        copy={block.imageCopy}
        className={className}
        style={styleAux}
      >
        {className !== "" && (
          <HexagonCopy>
            <div>{block.imageCopy}</div>
          </HexagonCopy>
        )}
      </Hexagon>
    );
  }

  getBlock() {
    // Retrieve the content block
    // Loop all blocks and search for matching id
    return this.props.data.allContentBlocksJson.edges.filter(
      ({ node }) => this.props.id === node.id
    )[0];
  }

  render() {
    const CaseItem = ({ imageCopy, textHTML, position, links }) => (
      <Row>
        <Col sm={9}>
          <CaseItemContainer>
            <CaseItemQoute dangerouslySetInnerHTML={{ __html: textHTML }} />
            <CaseItemQouteBy>{position}</CaseItemQouteBy>
            <LinkButton
              className="internalLink download"
              as="a"
              href={links[0].link}
              download
            >
              Read full case study
            </LinkButton>
          </CaseItemContainer>
        </Col>
        <Col sm={3}>
          <AptimiseBox src={aptimiseBoxes} alt="" />
        </Col>
      </Row>
    );

    const sliderCommonSettings = {
      fade: true,
      adaptiveHeight: true,
      draggable: false,
      arrows: false,
      swipe: false
    };
    const block = this.getBlock();
    var dataFilter = block.node.dataFilter.replace(/'/g, '"');

    return (
      <>
        <FluidContainer>
          <ContainerMaxWidth>
            <CaseStudyProvider
              data={this.props.data}
              filter={JSON.parse(dataFilter)}
              id={block.node.referenceBlock}
            >
              {caseItem =>
                caseItem.map(({ imageCopy, textHTML, position, links }) => (
                  <CaseItem
                    imageCopy={imageCopy}
                    textHTML={textHTML}
                    position={position}
                    links={links}
                    key={shortid.generate()}
                  />
                ))
              }
            </CaseStudyProvider>
          </ContainerMaxWidth>
        </FluidContainer>
        <DesktopSvg src={greyAngleBg} alt="" />
      </>
    );
  }
}

CaseStudyQoute.propTypes = {
  id: PropTypes.node.isRequired
};

Blocks.propTypes = {
  data: PropTypes.any.isRequired
};

export default CaseStudyQoute;
