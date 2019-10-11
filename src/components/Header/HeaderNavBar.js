import React from "react";
import { Link } from "gatsby";
import { Row, Col } from "reactstrap";
import styled from "styled-components";
import { media } from "utils/Media";
import AptimiseLogo from "components/shared/AptimiseLogo";
import XeroLogo from "components/shared/XeroLogo";
import Button from "components/shared/Button";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import Text from "components/shared/Text";
import HamMenu from "./Menu";

const NavBar = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0 1px 10px 1px rgba(40, 41, 44, 0.12);
  @media ${media.sm} {
    padding: 0.5rem;
  }
`;

const BookADemo = styled(Button)`
  font-size: 0.9em;
  @media ${media.sm} {
    font-size: 1rem;
  }
`;

const NavBarContainer = styled(ContainerMaxWidth)`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const LogoWrap = styled(Col)`
  display: flex;
`;

const BreadCrumb = styled.div`
  order: 2;
  padding-left: 1rem;
  padding-top: 0.5rem;
  font-size: 0.8rem;

  @media ${media.sm} {
    order: 0;
    padding-top: 0rem;
  }

  .default {
    color: ${props => props.theme.colors.purple};
    text-decoration: none;
  }

  .default:hover {
    text-decoration: none;
  }

  .current {
    color: #696969;
    text-decoration: none;
  }

  .current:hover {
    text-decoration: none;
  }
`;

const XeroWrap = styled.span`
  display: none;

  @media ${media.md} {
    display: flex;
    align-items: center;
    padding-left: 1rem;
  }
`;

const BreadCrumbs = props => {
  let path = props.data.path;
  let title = props.data.title;
  let jsonPath = path;
  let breadCrumb = jsonPath.split("/");
  console.log(props.data);
  if (breadCrumb[1].length > 0) {
    return breadCrumb.map((p, index, array) => {
      if (index === array.length - 1) return true;
      let linkText = p ? title : <strong>Home</strong>;
      let linkClass = p ? "current" : "default";
      let linkLink = p.length > 0 ? p : "";
      let spacer = index < array.length - 2 ? <span>&nbsp;|&nbsp;</span> : "";
      return (
        <span key={index}>
          <Link to={linkLink} key={index} className={linkClass}>
            {linkText}
          </Link>
          {spacer}
        </span>
      );
    });
  }
  return true;
};

const HeaderNavBar = props => {
  return (
    <NavBar>
      <NavBarContainer>
        <Row className="justify-content-between align-items-center">
          <Col>
            <HamMenu
              id="main-menu"
              menuItems={[
                "home",
                "product",
                "forsmallbusiness",
                "foraccountants",
                "help",
                "aboutus"
              ]}
            >
              <LogoWrap xs="auto" key="logo_wrap">
                <Link to="/">
                  <AptimiseLogo />
                </Link>

                {typeof props.data !== "undefined" &&
                  props.data.pagesJson.id === "xero" && (
                    <XeroWrap>
                      <XeroLogo width="70" />
                    </XeroWrap>
                  )}
              </LogoWrap>

              <BookADemo
                as="button"
                className="trigger-bookdemo-modal"
                key="bookdemo_button"
              >
                Book a demo
              </BookADemo>
            </HamMenu>
          </Col>
        </Row>
      </NavBarContainer>
    </NavBar>
  );
};

export default HeaderNavBar;
