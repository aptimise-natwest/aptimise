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
import Img from "gatsby-image";
import greyAngleBg from "images/backgrounds/grey-angle-bg.svg";
import shortid from "shortid";

const ChallengeSolutionBlock = props => (
  <StaticQuery
    query={graphql`
      query {
        allContentBlocksJson {
          edges {
            node {
              id
              title
              desc
              gridBlocks {
                challenge {
                  title
                  textHTML
                  tileColor
                }
                solution {
                  title
                  textHTML
                  tileColor
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

const Icon = styled.div`
  height: 100px;
  background: white;
  width: 100px;
  margin: 0 auto;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props =>
    props.gradient === true ? "" : "0 1px 24px 1px rgba(204, 125, 247, 0.18)"};
`;

const GridWrap = styled.div`
  padding-bottom: 0rem;
  text-align: left;
`;
const GridSectionHeader = styled(Row)`
  padding-top: 5rem;
  padding-bottom: 0rem;
  text-align: center;
  width: 100%;
`;

const GridHeader = styled.div`
  text-align: left;
  width: 100%;
  h4 {
    font-size: 1.8em;
    line-height: 1.2;
    font-weight: bold;
    padding-bottom: 20px;
  }

  p {
    font-size: 1.25em;
  }
`;

const DesktopSvg = styled.img`
  display: none;

  @media ${media.md} {
    display: ${props => (props.hide ? "block" : "none")};
    bottom: 0px;
    position: relative;
    width: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    max-width: none;
  }
`;

const ItemDesc = styled(Text)`
  text-align: left;
  font-size: 1.25em;
`;

const ItemTitle = styled.div`
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 1.5;
  position: relative;
`;

const Item = styled.div`
  background-image: none;
  display: block;
  padding-bottom: 2rem;
  margin: 50px auto;
  box-shadow: rgba(40, 41, 44, 0.12) 0px 1px 10px 1px;
  &:before {
    content: unset;
  }

  @media ${media.sm} {
    margin: 20px 0px;
    box-shadow: rgb(232, 227, 236) 0px 0px 4px 2px;
    border-radius: 10px;

    margin: 50px auto;
    display: table;

    background-image: linear-gradient(
      ${props => (props.filled === "solution" ? "280deg" : "100deg")},
      ${props => props.tileColor} calc(50% - 1px),
      transparent 50%
    );

    @supports (-ms-ime-align: auto) {
      background-image: linear-gradient(
        ${props => (props.filled === "solution" ? "280deg" : "100deg")},
        ${props => props.tileColor} 0%,
        ${props => props.tileColor} 0%,
        ${props => props.tileColor} 51%,
        #ffffff 51%,
        #ffffff 51%
      );
    }

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      background-image: linear-gradient(
        ${props => (props.filled === "solution" ? "280deg" : "100deg")},
        ${props => props.tileColor} 0%,
        ${props => props.tileColor} 0%,
        ${props => props.tileColor} 51%,
        #ffffff 51%,
        #ffffff 51%
      );
    }

    border-radius: 6px;
    box-shadow: rgba(40, 41, 44, 0.12) 0px 1px 10px 1px;

    &:before,
    &:after {
      content: ‘’;
      display: table;
    }

    .solution {
      padding-top: 40px;
      padding-bottom: 20px;
      h6,
      div {
        padding-left: 30px;
      }

      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    .challenge {
      padding-top: 40px;
      padding-bottom: 20px;
      padding-left: 40px;
      padding-right: 35px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }
`;

const Tile = styled.div`
  width: 100%;
  color: black;
  display: block;
  padding: 2rem 2rem 0rem;

  h6 {
    color: ${props => (props.tileColor === null ? "#B60F7F" : "#00adb9")};
    position: relative;
  }

  @media ${media.sm} {
    padding: 20px;
    overflow: hidden;

    color: ${props => (props.tileColor === null ? "black" : "white")};

    p {
      color: ${props => (props.tileColor === null ? "black" : "white")};
      position: relative;
    }

    h6 {
      color: ${props => (props.tileColor === null ? "#B60F7F" : "white")};
      position: relative;
    }

    width: 50%;
    display: table-cell;
    padding: 3rem;
    line-height: 1.7;
  }
`;

const IconImg = styled(Img)`
  width: ${props => (props.gradient === true ? "100%" : "54px")};
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

class Blocks extends Component {
  constructor(props) {
    super(props);
  }

  getBlock() {
    // Retrieve the content block
    // Loop all blocks and search for matching id
    const block = this.props.data.allContentBlocksJson.edges.filter(
      ({ node }) => this.props.id === node.id
    )[0];

    return block;
  }

  render() {
    const contentBlock = this.getBlock();

    const GridItems = props => {
      return (
        <Item
          key={shortid.generate()}
          tileColor={
            props.block.challenge.tileColor === null
              ? props.block.solution.tileColor
              : props.block.challenge.tileColor
          }
          filled={
            props.block.challenge.tileColor === null ? "solution" : "challenge"
          }
        >
          <Tile
            xl="6"
            tileColor={props.block.challenge.tileColor}
            className="challenge"
          >
            <div className="challengeAngle" />
            <h6>CHALLENGE</h6>
            <ItemTitle>{props.block.challenge.title}</ItemTitle>

            <ItemDesc
              dangerouslySetInnerHTML={{
                __html: props.block.challenge.textHTML
              }}
            />
          </Tile>
          <Tile
            xl="6"
            tileColor={props.block.solution.tileColor}
            className="solution"
          >
            <div className="solutionAngle" />
            <h6>SOLUTION</h6>
            <ItemTitle>{props.block.solution.title}</ItemTitle>
            <ItemDesc
              dangerouslySetInnerHTML={{
                __html: props.block.solution.textHTML
              }}
            />
          </Tile>
        </Item>
      );
    };

    const GridColumns = props => (
      <GridItems block={props.block} i={props.i} key={props.i} />
    );

    const GridBlocks = props => {
      function renderBlocks(singlerow) {
        return function(block, i, arr) {
          return (
            <React.Fragment key={shortid.generate()}>
              <GridColumns key={shortid.generate()} block={block} i={i} />
            </React.Fragment>
          );
        };
      }

      const blocks = props.contentBlock.node.gridBlocks.map(
        renderBlocks(props.contentBlock.node.renderSingleRow)
      );

      return blocks;
    };

    return (
      <ContainerMaxWidth className="pt-3 pt-lg-4">
        <GridWrap>
          <GridBlocks key={shortid.generate()} contentBlock={contentBlock} />
        </GridWrap>
        <DesktopSvg
          src={greyAngleBg}
          alt={contentBlock.node.separator}
          hide={contentBlock.node.separator}
        />
      </ContainerMaxWidth>
    );
  }
}

ChallengeSolutionBlock.propTypes = {
  id: PropTypes.node.isRequired
};

Blocks.propTypes = {
  data: PropTypes.any.isRequired
};

export default withTheme(ChallengeSolutionBlock);
