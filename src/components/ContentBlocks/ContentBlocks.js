import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import TextBlock from "./blocks/TextBlock"
import InfoBlocks from "./blocks/InfoBlocks"
import InfoBlockFullWidth from "./blocks/InfoBlockFullWidth"
import WhitePaperBlock from "./blocks/WhitePaperBlock"
import DiagramBlock from "./blocks/DiagramBlock"
import CarouselBlocks from "./blocks/CarouselBlocks"

const ContentBlocks = (props) => {

    const pageBlocks = props.data.pagesJson.contentBlocks

    const data = useStaticQuery(graphql`
        query {
            allContentBlocksJson {
                edges {
                    node {
                        id
                        type
                    }
                }
            }
        }
    `)

    // Filter content blocks that belong to the current page
    const contentBlocks = data.allContentBlocksJson.edges.filter(
        ({ node }) =>  pageBlocks.indexOf(node.id) >= 0
    )

    let blocks = "";

    if (contentBlocks !== null) {

        blocks = contentBlocks.map((block, i) => {
        
            // console.log(block.node.type)

            switch (block.node.type) {

                case "TextBlock":
                    return <TextBlock id={block.node.id} key={i} />

                case "InfoBlocks":
                    return <InfoBlocks id={block.node.id} key={i} />

                case "InfoBlockFullWidth":
                    return <InfoBlockFullWidth id={block.node.id} key={i} />

                case "WhitePaperBlock":
                    return <WhitePaperBlock id={block.node.id} key={i} />

                case "DiagramBlock":
                    return <DiagramBlock id={block.node.id} key={i} />

				case "CarouselBlocks":
                    return <CarouselBlocks id={block.node.id} key={i} />

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