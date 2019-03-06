import React, { Component } from "react"
import { graphql } from 'gatsby';
// import DefaultTemplate from "./DefaultTemplate";

class TemplateSelector extends Component {
    render() {

        const data = this.props.data

        console.log(this.props)

        // const template = data.template

        // switch (template) {
        //     // case "home-template":
        //     //     return <HomeTemplate data={data} />
        //     default:
        //         return <DefaultTemplate data={data} />
        // }

        return ""

    }
}

export default TemplateSelector

// export const query = graphql`
// query($id: String!) {

// }
// `