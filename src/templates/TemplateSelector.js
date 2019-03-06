import React, { Component } from "react"
import { graphql } from 'gatsby';
import DefaultTemplate from "./DefaultTemplate";

class TemplateSelector extends Component {
    render() {

        const data = this.props.data
        const template = data.template

        switch (template) {
            // case "home-template":
            //     return <HomeTemplate data={data} />
            default:
                return <DefaultTemplate data={data} />
        }

    }
}

export default TemplateSelector

export const query = graphql`
query($id: String!) {
    markdownRemark(id: { eq: $id }) {
        id
        frontmatter {
            title
            metaDescription
            path
        }
        fields {
            page
        }
    }
}
`