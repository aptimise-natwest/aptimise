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

const GridBlock = props => (
  <StaticQuery
    query={graphql`
      query {
        allContentBlocksJson {
          edges {
            node {
              id
              title
              desc
              renderSingleRow
              separator
              gridBlocks {
                icon {
                  childImageSharp {
                    fluid(quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                displayIcon
                title
                textHTML
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
    props.gradient === 'true' ? "" : "0 1px 24px 1px rgba(204, 125, 247, 0.18)"};
`;

const GridWrap = styled(Row)`
  padding-bottom: 0rem;
  text-align: center;
`;
const GridSectionHeader = styled(Row)`
  padding-top: 5rem;
  padding-bottom: 0rem;
  text-align: center;
  width: 100%;
`;

const GridHeader = styled.div`
  text-align: center;
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
  text-align: center;
  font-size: 1.25em;
`;

const ItemTitle = styled.div`
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 3;
`;

const Item = styled.div`
  margin: 20px 0px;
`;

const IconImg = styled(Img)`
  width: ${props => (props.gradient === 'true' ? "100%" : "54px")};
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
        <Item key={shortid.generate()}>
          {props.block.displayIcon && (
            <Icon gradient={props.singlerow}>
              <IconImg
                fluid={props.block.icon.childImageSharp.fluid}
                gradient={props.singlerow}
              />
            </Icon>
          )}

          <ItemTitle>{props.block.title}</ItemTitle>

          <ItemDesc
            dangerouslySetInnerHTML={{ __html: props.block.textHTML }}
          />
        </Item>
      );
    };

    const GridColumns = props => (
      <Col
        xl={props.singlerow === "true" ? 2 : 4}
        className={props.className}
        singlerow={props.singlerow}
      >
        <GridItems
          block={props.block}
          i={props.i}
          key={props.i}
          singlerow={props.singlerow}
        />
      </Col>
    );

    const GridBlocks = props => {
      function renderBlocks(singlerow) {
        return function(block, i, arr) {
          return (
            <React.Fragment key={shortid.generate()}>
              {(i + 1) % 3 === 0 ? (
                <GridColumns
                  key={shortid.generate()}
                  block={block}
                  i={i}
                  singlerow={singlerow ? "true" : "false"}
                />
              ) : (
                <GridColumns
                  key={shortid.generate()}
                  block={block}
                  i={i}
                  className={
                    singlerow
                      ? i === 0
                        ? "offset-xl-2"
                        : ""
                      : arr.length % 3 === 0
                      ? ""
                      : i > 0 && i % 3 === 0
                      ? "offset-xl-2"
                      : ""
                  }
                  singlerow={singlerow ? "true" : "false"}
                />
              )}
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
        <GridSectionHeader>
          <GridHeader>
            <h4>{contentBlock.node.title}</h4>
            <p>{contentBlock.node.desc} </p>
          </GridHeader>
        </GridSectionHeader>

        <GridWrap>
          {/* {faqBlocks} */}
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

GridBlock.propTypes = {
  id: PropTypes.node.isRequired
};

Blocks.propTypes = {
  data: PropTypes.any.isRequired
};

export default withTheme(GridBlock);
