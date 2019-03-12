import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import { media } from "utils/Media"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Button from "components/shared/Button"

const LinkButton = styled(Button)`
    width: 100%;
    margin-bottom: .5rem;

    @media ${media.md} {
        width: auto;
        margin-right: .5rem;
    }
`

const LinkBlock = (props) => {

    const data = useStaticQuery(graphql`
        query {
            allContentBlocksJson {
                edges {
                    node {
                        id
                        links {
                            link
                            linkText
                        }
                    }
                }
            }
        }
    `)

    // Retrieve block
    const block = data.allContentBlocksJson.edges.filter(
        ({ node }) => props.id === node.id
    )[0]

    const links = block.node.links.map( (link, i) => {

        if (link.link.charAt(0) === "/") {
            // Switch to gatsby Link if internal
            return (
                <LinkButton
                    key={i}
                    to={link.link}
                    grey
                    as={Link}
                >
                    {link.linkText}
                </LinkButton>
            )
        } else {
            return (
                <LinkButton
                    key={i}
                    href={link.link}
                    grey
                >
                    {link.linkText}
                </LinkButton>
            )
        }

    })

    return (
        <ContainerMaxWidth className="py-3 py-lg-4">
            { links }
        </ContainerMaxWidth>
    )
}

LinkBlock.propTypes = {
    id: PropTypes.node.isRequired,
}

export default LinkBlock