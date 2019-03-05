import React from "react"
import { Link } from "gatsby";
import { Row, Col } from "reactstrap"
import styled from "styled-components"
import { media } from 'utils/media';
import AptimiseLogo from "components/shared/AptimiseLogo"
import Button from "components/shared/Button"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"

const NavBar = styled.div`
    width: 100%;
    padding: .5rem 0;
    background-color: ${props => props.theme.colors.white};

    @media ${media.sm} {
        padding: .5rem;
    }
`

const HeaderNavBar = () => (
    <NavBar>
        <ContainerMaxWidth>
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
        </ContainerMaxWidth>
    </NavBar>
)

export default HeaderNavBar