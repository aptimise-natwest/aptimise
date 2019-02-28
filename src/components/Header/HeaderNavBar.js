import React from "react"
import { Link } from "gatsby";
import { Container, Row, Col } from "reactstrap"
import styled from "styled-components"
import AptimiseLogo from "components/shared/AptimiseLogo"
import Button from "components/shared/Button"

const NavBar = styled.div`
    width: 100%;
    padding: .5rem;
    background-color: ${props => props.theme.colors.white};
`

const HeaderNavBar = () => (
    <NavBar>
        <Container>
            <Row className="justify-content-between align-items-center">
                <Col xs="auto">
                    <Link to="/">
                        <AptimiseLogo />
                    </Link>
                </Col>
                <Col xs="auto">
                    <Button href="#">book a demo</Button>
                </Col>
            </Row>
        </Container>
    </NavBar>
)

export default HeaderNavBar