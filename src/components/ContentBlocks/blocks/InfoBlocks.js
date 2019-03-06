// // import React from "react"
// import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
// // import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
// // import Text from "components/shared/Text"

// const InfoBlocks = (props) => {

//     const markdown = useStaticQuery(graphql`
//         query {
//             allContentBlocksJson {
//                 edges {
//                     node {
//                         id
//                     }
//                 }
//             }
//         }
//     `)

//     // Retrieve block
//     const block = markdown.allContentBlocksJson.edges.filter(
//         ({ node }) => props.id === node.id
//     )[0]

//     console.log(block)

//     return "infoblock"
// }

// InfoBlocks.propTypes = {
//     id: PropTypes.node.isRequired,
// }

// export default InfoBlocks