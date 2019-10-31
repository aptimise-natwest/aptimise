import React from "react";
import Layout from "components/Layout/Layout";
import SEO from "utils/Seo";
import { media } from "utils/Media";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import styled from "styled-components";
import { Link } from "gatsby";

const LinkButton = styled(Link)`
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 8px 16px;
  font-family: ${props => props.theme.font.family.base};

  @media ${media.md} {
    width: auto;
    margin-right: 0.5rem;
  }

  &.internalLink {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.turquoise};
    &:hover {
      color: ${props => props.theme.colors.white};
      background-color: ${props => props.theme.colors.purpleDark};
    }
  }
`;
const Container = styled(ContainerMaxWidth)`
  text-align: center;
  line-height: 5em;
  color: ${props => props.theme.colors.purpleDark};
`;
const NotFoundPage = () => (
  <Layout dynamicPage={false}>
    <Container className="pt-3 pt-lg-4">
      <SEO title="404: Not found" />
      <h1>Page not found.</h1>
      <p>
        Sorry, we can’t seem to find the page you were looking for.
        <br></br>
        <LinkButton to="/" className="internalLink">
          Back home
        </LinkButton>
      </p>
    </Container>
  </Layout>
);

export default NotFoundPage;
