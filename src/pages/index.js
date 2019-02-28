import React from "react"
import { Link } from "gatsby"

import Layout from "components/Layout/Layout"
import SEO from "utils/Seo"

import Fast from "components/shared/Fast"
import Accurate from "components/shared/Accurate"
import Secure from "components/shared/Secure"
import Simple from "components/shared/Simple"

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

		<Link to="/page-2/" className="btn">Go to page 2</Link>
	</Layout>
)

export default IndexPage
