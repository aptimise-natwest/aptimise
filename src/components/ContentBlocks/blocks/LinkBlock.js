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

  @media ${media.md} {
    width: auto;
    margin-right: 0.5rem;
  }

  &.internalLink {
    color: ${props => props.theme.colors.blackOff};
    background-color: ${props => props.theme.colors.grey};
    &:hover {
      color: ${props => props.theme.colors.white};
      background-color: ${props => props.theme.colors.purpleDark};
    }
  }
`;

const LinkBlock = props => {
  const data = useStaticQuery(graphql`
    query {
      allContentBlocksJson {
        edges {
          node {
            id
            links {
              link
              linkText
              download
            }
          }
        }
      }
    }
  `);

  // Retrieve block
  const block = data.allContentBlocksJson.edges.filter(
    ({ node }) => props.id === node.id
  )[0];
  const links = block.node.links.map((link, i) => {
    if (link.link.charAt(0) === "/") {
      // Switch to gatsby Link if internal
      let linkButton;
      if (!link.download) {
        linkButton = (
          <LinkButton key={i} as={Link} className="internalLink" to={link.link}>
            {link.linkText}
          </LinkButton>
        );
      } else {
        linkButton = (
          <LinkButton
            key={i}
            className="internalLink"
            as="a"
            href={link.link}
            download
          >
            {link.linkText}
          </LinkButton>
        );
      }
      return linkButton;
    } else {
      return (
        <LinkButton
          key={i}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.linkText}
        </LinkButton>
      );
    }
  });

  return (
    <ContainerMaxWidth className="py-3 py-lg-4">{links}</ContainerMaxWidth>
  );
};

LinkBlock.propTypes = {
  id: PropTypes.node.isRequired
};

export default LinkBlock;
