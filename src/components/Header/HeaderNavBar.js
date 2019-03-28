import React from "react"
import { Link } from "gatsby";
import { Row, Col } from "reactstrap"
import styled from "styled-components"
import { media } from "utils/Media";
import AptimiseLogo from "components/shared/AptimiseLogo"
import XeroLogo from "components/shared/XeroLogo"
import Button from "components/shared/Button"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"

const NavBar = styled.div`
    width: 100%;
    padding: .5rem 0;
    background-color: ${props => props.theme.colors.white};

    @media ${media.sm} {
        padding: .5rem;
    }
`
const NavBarContainer = styled(ContainerMaxWidth)`
    padding-left: 1rem;
    padding-right: 1rem;
`

const LogoWrap = styled(Col)`
    display: flex;
`

const XeroWrap = styled.span`
    display: none;

    @media ${media.md} {
        display: flex;
        align-items: center;
        padding-left: 1rem;
    }
`

const HeaderNavBar = (props) => {
    return(
        <NavBar>
            <NavBarContainer>
                <Row className="justify-content-between align-items-center">
                    <LogoWrap xs="auto">
                        <Link to="/">
                            <AptimiseLogo />
                        </Link>
                        {typeof props.data !== 'undefined' && props.data.pagesJson.id === "xero" &&
                            <XeroWrap>
                                <XeroLogo width="35" height="35" />
                                <Text size="sm" className="pl-2" style={{ lineHeight: 1}}>connected <br />app</Text>
                            </XeroWrap>
                        }
                    </LogoWrap>
                    <Col xs="auto">
                        <Button as="button" className="trigger-bookdemo-modal">Book a demo</Button>
                    </Col>
                </Row>
            </NavBarContainer>
        </NavBar>
    )
}

export default HeaderNavBar