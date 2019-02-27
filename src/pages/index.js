import React from "react"
import { Link } from "gatsby"

import Layout from "components/Layout/Layout"
import SEO from "utils/Seo"

import Fast from "components/Animations/Fast"
import Accurate from "components/Animations/Accurate"
import Secure from "components/Animations/Secure"
import Simple from "components/Animations/Simple"

const IndexPage = () => (
	<Layout>
		<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

        <div style={{
            maxWidth: "200px"
        }}>
            <Fast />
            <Accurate />
            <Secure />
            <Simple />
        </div>

		<Link to="/page-2/">Go to page 2</Link>
	</Layout>
)

export default IndexPage
