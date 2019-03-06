import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import TextBlock from "./blocks/TextBlock"
import InfoBlocks from "./blocks/InfoBlocks"

const ContentBlocks = (props) => {

    const page = props.data.markdownRemark.fields.page

    const markdown = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        id
                        fileAbsolutePath
                        frontmatter {
                            blockType
                        }
                        fields {
                            page
                        }
                    }
                }
            }
        }
    `)

    // Filter nodes that are blocks and belong to the current page
    const contentBlocks = markdown.allMarkdownRemark.edges.filter(
        ({ node }) => (node.fields.page === page && node.fileAbsolutePath.indexOf('/__blocks/'))
    )

    let blocks = "";

    if (contentBlocks !== null) {

        blocks = contentBlocks.map((block, i) => {

            switch (block.node.frontmatter.blockType) {

                case "TextBlock":
                    return <TextBlock id={block.node.id} key={i} />

                case "InfoBlocks":
                    return <InfoBlocks id={block.node.id} key={i} />

                default:
                    return ""
            }

        })

    }

    return (
        <>
            {blocks}
        </>
    )

}

export default ContentBlocks