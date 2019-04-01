import React, { Component } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { Row, Col, UncontrolledCollapse } from "reactstrap";
import styled from "styled-components";
import VisibilitySensor from "react-visibility-sensor";
import { media } from "utils/Media";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import Text from "components/shared/Text";
import Animation from "components/shared/Animation";
import { withTheme } from "styled-components";
import gradientSeparator from "images/backgrounds/gradient-separator.svg";
import gradientSeparatorMobile from "images/backgrounds/gradient-separator-mobile.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const FaqBlocks = props => (
  <StaticQuery
    query={graphql`
      query {
        allContentBlocksJson {
          edges {
            node {
              id
              title
              shortIntroduction
              faqBlocks {
                id
                title
                color
                animation
                faqBlockElements {
                  title
                  textHTML
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Blocks data={data} id={props.id} theme={props.theme} />}
  />
);

const GradientSeparator = styled.div`
  width: 100%;
  padding-bottom: 3rem;
  img {
    width: 100%;
  }
`;

const CollapseToggle = styled.h3`
  cursor: pointer;
  padding-bottom: 1rem;
  position: relative;
  font-size: ${props => props.theme.font.h4.size};

  @media ${media.md} {
    font-size: ${props => props.theme.font.h3.size};
  }
`;

const CollapseToggleIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: -1rem;
  top: 0.5rem;
  color: ${props => props.theme.colors.grey};
`;

const FaqWrap = styled(Row)`
  ${media.md} {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
`;

class Blocks extends Component {
  state = { isOpen: true };

  constructor(props) {
    super(props);

    this.state = {
      animation: false,
      collapseState: false,
      faqBlock0: true
    };

    this.setAnimationState = this.setAnimationState.bind(this);
    this.getBlock = this.getBlock.bind(this);
    this.playAnimation = this.playAnimation.bind(this);
    this.collapseToggleWindowWidth = this.collapseToggleWindowWidth.bind(this);
  }

  componentDidMount() {
    this.setAnimationState();
    this.collapseToggleWindowWidth();
    window.addEventListener("resize", this.collapseToggleWindowWidth, true);
    // console.log(this.state);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.collapseToggleWindowWidth, true);
  }

  setAnimationState() {
    // Set animation state for each infoblock
    let animationState = [];
    const block = this.getBlock();

    for (let i = 0; block.node.faqBlocks.length > i; i++) {
      animationState[i] = false;
    }

    this.setState({
      animation: animationState
    });
  }

  // Method to determine whether collapses should be open or closed, depending on window width
  collapseToggleWindowWidth() {
    const width = window.innerWidth;
    let collapsed = false;

    // if (width < 992) {
    //     collapsed = false;
    // } else {
    //     collapsed = true;
    // }

    this.setState({
      collapseState: collapsed
    });
  }

  getBlock() {
    // Retrieve the content block
    // Loop all blocks and search for matching id
    const block = this.props.data.allContentBlocksJson.edges.filter(
      ({ node }) => this.props.id === node.id
    )[0];

    return block;
  }

  playAnimation(isVisible, i) {
    if (isVisible) {
      let animation = [...this.state.animation];
      animation[i] = true;
      this.setState({ animation });
    }
  }

  handleClick = e => {
    var keyFaq = e.target.id;
    this.setState(prevState => ({ [keyFaq]: !prevState[keyFaq] }));
  };

  render() {
    const contentBlock = this.getBlock();

    const faqBlocks = contentBlock.node.faqBlocks.map((block, i) => {
      return (
        <VisibilitySensor
          onChange={isVisible => this.playAnimation(isVisible, i)}
          partialVisibility={true}
          key={i}
        >
          <>
            <FaqWrap>
              <Col xs={3} md={2}>
                <Animation
                  block={block}
                  type={block.animation}
                  play={i === 0 ? true : this.state.animation[i]}
                />
              </Col>
              <Col xs={9} md={10}>
                <CollapseToggle id={`faqBlock${i}`} onClick={this.handleClick}>
                  {block.title}
                  <CollapseToggleIcon
                    icon={faAngleDown}
                    className="d-md-none"
                  />
                </CollapseToggle>
                <UncontrolledCollapse
                  toggler={`#faqBlock${i}`}
                  className={`${this.state.collapseState ? "show" : ""}`}
                  isOpen={this.state[`faqBlock${i}`]}
                >
                  <Row>
                    {block.faqBlockElements.map((element, j) => {
                      return (
                        <Col
                          xs={12}
                          lg={6}
                          key={j}
                          className="pb-5 pb-lg-4"
                          id={`faqBlockElement${j}`}
                        >
                          <h5 className="pb-2">{element.title}</h5>
                          <Text
                            dangerouslySetInnerHTML={{
                              __html: element.textHTML
                            }}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </UncontrolledCollapse>
              </Col>
              {i + 1 < contentBlock.node.faqBlocks.length && (
                <GradientSeparator>
                  <img
                    src={gradientSeparator}
                    alt=""
                    className="d-none d-md-block"
                  />
                  <img
                    src={gradientSeparatorMobile}
                    alt=""
                    className="d-block d-md-none"
                  />
                </GradientSeparator>
              )}
            </FaqWrap>
          </>
        </VisibilitySensor>
      );
    });

    return (
      <ContainerMaxWidth className="pt-3 pt-lg-4">
        {faqBlocks}
      </ContainerMaxWidth>
    );
  }
}

FaqBlocks.propTypes = {
  id: PropTypes.node.isRequired
};

Blocks.propTypes = {
  data: PropTypes.any.isRequired
};

export default withTheme(FaqBlocks);
