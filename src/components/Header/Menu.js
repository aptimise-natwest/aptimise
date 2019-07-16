import React from "react";
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
const UsefulLinks = styled(Nav)`
  padding: 0;
  margin: 0;
  list-style: none;

  a {
    color: ${props => props.theme.colors.white};
  }

  li {
    display: inline;
    padding-left: 15px;
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
  font-family: ${props => props.theme.font.family.thin};
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
    console.log(this.props.children);
    return (
      <div>
        <Navbar light expand="md">
          <NavbarBrand href="/">
            {this.props.children.filter(r => r.key === "logo_wrap")}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {/* <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
            </Nav> */}
            <Menu menuItems={this.props.menuItems}>
              {this.props.children.filter(r => r.key === "bookdemo_button")}
            </Menu>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

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

  console.log(menuLinks);
  const links = menuLinks.map((link, i) => {
    let linkButton = (
      <NavItem key={i}>
        <NavLink href={link.node.path} key={i}>
          <Text> {link.node.menuTitle}</Text>
        </NavLink>
      </NavItem>
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
