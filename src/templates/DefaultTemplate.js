import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import ContentBlocks from 'components/ContentBlocks/ContentBlocks'
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"

class DefaultTemplate extends Component {
    render() {
        const data = this.props.data

        return (
            <Layout data={data}>
                {data.pagesJson.h1 !== null &&
                    <ContainerMaxWidth >
                        <h1 className="pt-4">{data.pagesJson.title}</h1>
                    </ContainerMaxWidth>
                }
                <ContentBlocks data={data} />
            </Layout>
        )
    }
}

export default DefaultTemplate