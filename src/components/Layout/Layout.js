import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import "scss/bootstrap.scss";
import theme from "utils/Theme";

import GlobalStyles from "utils/GlobalStyles";
import SEO from "utils/Seo";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import ModalBookDemo from "components/shared/ModalBookDemo";
import { media } from "utils/Media";
const SiteWrap = styled.div`
  padding-top: 90px;
`;

const MainWrap = styled.span`
  @media ${media.sm} {
    margin-top: 0rem !important;
    display: block;
  }
  margin-top: 1rem !important;
  display: block;
`;

class Layout extends Component {
  render() {
    let SEOMarkup;
    if (this.props.dynamicPage) {
      const { title, metaDescription } = this.props.data.pagesJson;
      SEOMarkup = <SEO title={title} description={metaDescription} />;
    }

    return (
      <ThemeProvider theme={theme}>
        <SiteWrap>
          {SEOMarkup}
          <GlobalStyles />
          <Header data={this.props.data} />
          <MainWrap>
            <main>{this.props.children}</main>
          </MainWrap>
          <Footer />
          <ModalBookDemo />
        </SiteWrap>
      </ThemeProvider>
    );
  }
}

Layout.defaultProps = {
  dynamicPage: true
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
