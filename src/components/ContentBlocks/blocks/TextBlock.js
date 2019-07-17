import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import Text from "components/shared/Text";
import styled from "styled-components";

const Content = styled.div`
  h4 {
    font-size: 2rem;
  }
  p {
    font-size: 1.3em;
  }
`;
const TextBlock = props => {
  const data = useStaticQuery(graphql`
    query {
      allContentBlocksJson {
        edges {
          node {
            id
            size
            weight
            textHTML
          }
        }
      }
    }
  `);

  // Retrieve block
  const block = data.allContentBlocksJson.edges.filter(
    ({ node }) => props.id === node.id
  )[0];

  const { size, weight, textHTML } = block.node;

  return (
    <ContainerMaxWidth className="py-3 py-lg-4">
      <Content
        dangerouslySetInnerHTML={{ __html: textHTML }}
        size={size}
        weight={weight}
      />
    </ContainerMaxWidth>
  );
};

TextBlock.propTypes = {
  id: PropTypes.node.isRequired
};

export default TextBlock;
