import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";
import { media } from "utils/Media";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import Button from "components/shared/Button";

const LinkButton = styled(Button)`
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
  width: 100%;

  background-color: ${props =>
    props.bgcolor == null
      ? props.theme.colors.turquoise
      : props.theme.colors[props.bgcolor]};

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
    background-color: ${props =>
      props.bgcolor == null
        ? props.theme.colors.turquoise
        : props.theme.colors[props.bgcolor]};

    &:hover {
      color: ${props => props.theme.colors.white};
      background-color: ${props =>
        props.bgcolor == null
          ? props.theme.colors.turquoise
          : props.theme.colors[props.bgcolor]};
    }
  }
`;
const Padded = styled(ContainerMaxWidth)`
  text-align: center;
`;

const UnPadded = styled(ContainerMaxWidth)`
  padding: 0 !important;
`;

const SpacerBlock = props => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     allContentBlocksJson {
  //       edges {
  //         node {
  //           id
  //           links {
  //             link
  //             linkText
  //             download
  //             bgColor
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);

  // // Retrieve block
  // const block = data.allContentBlocksJson.edges.filter(
  //   ({ node }) => props.id === node.id
  // )[0];

  const links = ""

  return props.padding || props.padding === undefined ? (
    <Padded className="py-3 py-lg-4">{links}</Padded>
  ) : (
    <UnPadded className="py-3 py-lg-4">{links}</UnPadded>
  );
};

SpacerBlock.propTypes = {
  id: PropTypes.node.isRequired,
  padding: PropTypes.bool
};

export default SpacerBlock;
