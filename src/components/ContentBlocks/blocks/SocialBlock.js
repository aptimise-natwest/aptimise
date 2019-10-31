import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import Text from "components/shared/Text";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { media } from "utils/Media";
import Button from "components/shared/Button";

import ThankYouTick from "images/logos/thank-you-tick.png";

const Content = styled.div`
  h4 {
    font-size: 2rem;
  }
  p {
    font-size: 1.3em;
  }

  h5 {
    line-height: 2.2em;
  }

  padding-bottom: 1em;
`;

const Container = styled(ContainerMaxWidth)`
  width: 50%;
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

const ThankYouTickIcon = styled.div`
  background-image: url(${ThankYouTick});
  background-repeat: no-repeat;
  background-position: top center;
  display: block;
  height: 30px;
  background-size: 30px;
`;

const ThankYouContainer = styled.span`
  display: block;
  text-align: center;
  font-weight: 600;
  font-family: "RN House Sans W01 Bold";
  font-size: 1.1em;
  padding-top: 1em;

  p {
    padding-top: 2em;
  }
`;
const SocialBlock = props => {
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
    <Container className="py-3 py-lg-4">
      <ThankYouContainer>
        <ThankYouTickIcon></ThankYouTickIcon>
        <Content
          dangerouslySetInnerHTML={{ __html: textHTML }}
          size={size}
          weight={weight}
        />

        <Button
          as="button"
          className="trigger-bookdemo-modal"
          onClick={props.toggleModal}
        >
          Schedule now
        </Button>

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
      </ThankYouContainer>
    </Container>
  );
};

SocialBlock.propTypes = {
  id: PropTypes.node.isRequired
};

export default SocialBlock;
