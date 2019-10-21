import React, { Children } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";
import { media } from "utils/Media";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const NavBar = styled(Navbar)`
  padding: 0px;
  /* display: ${props => (props.hideMenu === true ? "none" : "flex")}; */
`;

const Navitem = styled(NavItem)`
  display: ${props =>
    props.hideMenu === true ? "none !important" : "flex !important"};
`;

const Navbartoggler = styled(NavbarToggler)`
  border: 0px;
  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgb(66, 20, 95)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
  }
`;

const UsefulLinks = styled(Nav)`
  padding: 0px;
  margin: 0;
  list-style: none;
  text-align: center;

  a {
    color: ${props => props.theme.colors.white};
  }

  li {
    display: inline;
    padding-left: 15px;
    .trigger-bookdemo-modal {
      width: 100%;
    }
  }

  @media ${media.sm} {
    li {
      display: inline;
      padding-left: 35px;
    }
  }
`;

const Text = styled.span`
  color: ${props => props.theme.colors.purpleDark};
  font-size: 0.9em;
  font-family: ${props => props.theme.font.family.base};
`;

export default class HamMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <NavBar light expand="md">
          <NavbarBrand href="/">
            <ChildMenu filter="logo_wrap" {...this.props} />
          </NavbarBrand>
          <Navbartoggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Menu {...this.props} hideMenu={this.props.hideMenu}>
              <ChildMenu filter="bookdemo_button" {...this.props} />
            </Menu>
          </Collapse>
        </NavBar>
      </div>
    );
  }
}

const ChildMenu = props => {
  return props.children.filter(r => r.key === props.filter);
};

const Menu = props => {
  const data = useStaticQuery(graphql`
    query {
      allPagesJson {
        edges {
          node {
            id
            path
            title
            menuTitle
            menuOrder
          }
        }
      }
    }
  `);

  const block = data.allPagesJson.edges;

  function multiFilter(array, filters) {
    const filterKeys = Object.keys(filters);
    // filters all elements passing the criteria
    return array
      .filter(item => {
        // dynamically validate all filter criteria
        //console.log(item)
        return filterKeys.every(key => {
          // ignores an empty filter
          if (!filters[key].length) return true;
          return filters[key].includes(item.node[key]);
        });
      })
      .sort((a, b) => a.node.menuOrder - b.node.menuOrder);
  }

  let filters = {
    id: props.menuItems
  };

  var menuLinks = multiFilter(block, filters);
  console.log("props");
  console.log(props.hideMenu);
  const links = menuLinks.map((link, i) => {
    let linkButton = (
      <Navitem key={i} hideMenu={props.hideMenu}>
        <NavLink href={link.node.path} key={i}>
          <Text>{link.node.menuTitle}</Text>
        </NavLink>
      </Navitem>
    );

    return linkButton;
  });

  return (
    <UsefulLinks className="ml-auto" navbar>
      {links}
      <NavItem>{props.children}</NavItem>
    </UsefulLinks>
  );
};

HamMenu.propTypes = {
  id: PropTypes.node.isRequired,
  menuItems: PropTypes.node.isRequired
};
