import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";
import { media } from "utils/Media";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";

const UsefulLinks = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  a {
    color: ${props => props.theme.colors.white};
  }

  li {
    display: inline;
    padding-left: 35px;
  }
`;

const Text = styled.span`
  color: ${props => props.theme.colors.purpleDark};
`;

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
      <li key={i}>
        <Link to={link.node.path} key={i}>
          <Text> {link.node.menuTitle}</Text>
        </Link>
      </li>
    );

    return linkButton;
  });

  return (
    <UsefulLinks>
      {links}
      <li>{props.children}</li>
    </UsefulLinks>
  );
};

Menu.propTypes = {
  id: PropTypes.node.isRequired,
  menuItems: PropTypes.node.isRequired
};

export default Menu;
