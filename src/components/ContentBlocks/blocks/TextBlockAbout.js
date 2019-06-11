import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { Row, Col } from "reactstrap";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import aptimise from "images/aptimise-boxes.svg";
import LinkBlock from "./LinkBlock";
import styled from "styled-components";
const TextBlockAbout = props => {
  const data = useStaticQuery(graphql`
    query {
      allContentBlocksJson {
        edges {
          node {
            id
            textHTML
          }
        }
      }
    }
  `);

  const AboutContent = styled.div`
    font-size: 1.3rem;
  `;

  const ImageContainer = styled.span`
    display: block;
    text-align: center;
  `;

  // Retrieve block
  const block = data.allContentBlocksJson.edges.filter(
    ({ node }) => props.id === node.id
  )[0];

  const { textHTML } = block.node;

  return (
    <ContainerMaxWidth className="py-3 py-lg-4">
      <Row>
        <Col md={10} md={8}>
          <AboutContent dangerouslySetInnerHTML={{ __html: textHTML }} />
        </Col>
        <Col xs={4} className="d-none d-md-block">
          <ImageContainer>
            <img
              src={aptimise}
              alt="APtimise"
              style={{ width: "100%", "max-width": "280px" }}
            />
          </ImageContainer>
          {/* {block.node.links !== null && <LinkBlock {...props} padding={false} />} */}
        </Col>
      </Row>
    </ContainerMaxWidth>
  );
};

TextBlockAbout.propTypes = {
  id: PropTypes.node.isRequired
};

export default TextBlockAbout;
