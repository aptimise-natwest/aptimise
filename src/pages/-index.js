import React from "react"
import { Link } from "gatsby"
import Layout from "components/Layout/Layout"
import Fast from "components/shared/Fast"
import Accurate from "components/shared/Accurate"
import Secure from "components/shared/Secure"
import Simple from "components/shared/Simple"

const IndexPage = () => (
	<Layout>
        <div style={{
            maxWidth: "200px"
        }}>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
            <p>Paragraph</p>
            <Fast />
            <Accurate />
            <Secure />
            <Simple />
        </div>

		<Link to="/page-2/" className="btn">Go to page 2</Link>
	</Layout>
)

export default IndexPage
