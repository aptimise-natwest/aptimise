import React, { Component } from "react"
import { Link } from "gatsby"
import { TimelineMax } from "gsap"
import VisibilitySensor from "react-visibility-sensor"
import styled from "styled-components"
import { media } from "utils/Media"
import { Container, Row, Col } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AptimiseLogo from "components/shared/AptimiseLogo"
import Text from "components/shared/Text"
import footerBg from "images/backgrounds/footer-bg.svg"
import footerTopBg from "images/backgrounds/footer-top-bg.svg"
import xeroLogo from "images/logos/xero-logo.svg"
import sageLogo from "images/logos/sage-logo.svg"
import quickbooksLogo from "images/logos/quickbooks-logo.svg"
import aqillaLogo from "images/logos/aqilla-logo.svg"
import netsuiteLogo from "images/logos/netsuite-logo.svg"
import natwestLogo from "images/logos/natwest-logo-white.svg"

import { 
    faTwitter,
    faFacebookF,
    faLinkedin,
    faGoogle
} from '@fortawesome/free-brands-svg-icons'

const FooterWrap = styled.footer`
    position: relative;
    margin-top: 100px;
    color: ${props => props.theme.colors.white};

    a {
        color: ${props => props.theme.colors.white};
    }
`

const FooterContent = styled.div`
    position: relative;
    padding: 4rem 2rem 2rem 2rem;
    background-image: url(${footerBg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    min-height: 400px;

    @media ${media.md} {
        padding-top: 6rem;
    }

    @media ${media.lg} {
        padding-top: 8rem;
    }

    @media ${media.xl} {
        padding-top: 12rem;
        min-height: 500px;
    }
`

const FooterTopBg = styled.div`
    background-image: url(${footerTopBg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    position: absolute;
    top: 0;
    width: 100%;
    min-height: 400px;
`

const LinkWrap = styled.div`
    padding: 1rem 0;
    display: flex;
    align-items: center;

    img {
        width: 100%;
    }
`

const LinkItem = styled.a`
    padding: 1rem 1.25rem;
    color: ${props => props.theme.colors.white};
    font-size: 1.5rem;
    transition:  ${props => props.theme.transitionBase};

    @media ${media.sm} {
        padding: 1rem;
    }

    &:first-child {
        padding-left: 0;
    }

    &:hover {
        color: ${props => props.theme.colors.purple};
    }
`

const CompanyLinkItem = styled(LinkItem)`
    padding: 1rem .75rem;
`

const UsefulLinks = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;

    a {
        color: ${props => props.theme.colors.white};
    }
`

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animated: false
        }
        this.masterTimeline = new TimelineMax({ paused: true })
        this.footerTopBgInitialTimeLine = new TimelineMax()
        this.footerTopBgTimeLine = new TimelineMax()
        this.footerContentTimeLine = new TimelineMax()
        this.footerContentInitialTimeLine = new TimelineMax()
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        // set initial position as mastertimeline is paused
        this.setInitial()
        // create animation
        this.fadeInFooter()
    }

    onChange(isVisible) {
        // play timeline when footer is in viewport
        if (isVisible && !this.state.animated) {
            this.masterTimeline.play()
            this.setState({
                animated: !this.state.animated
            })
        } 
    }

    setInitial() {
        this.footerTopBgInitialTimeLine
            .set(this.footerTopBg, { transform: "translate3d(0, 100px, 0)", opacity: 0 })

        this.footerContentInitialTimeLine
            .set(this.footerWrap, { transform: "translate3d(0, 100px, 0)", opacity: 0, delay: .4 })
    }

    fadeInFooter() {
        this.footerTopBgTimeLine
            .from(this.footerTopBg, .5, { transform: "translate3d(0, 100px, 0)", opacity: 0 })
            .to(this.footerTopBg, .5, { transform: "translate3d(0, -100px, 0)", opacity: 1 })

        this.footerContentTimeLine
            .from(this.footerWrap, .5, { transform: "translate3d(0, 100px, 0)", opacity: 0, delay: .4 })
            .to(this.footerWrap, 1, { transform: "translate3d(0, 0, 0)", opacity: 1 })

        this.masterTimeline.add([this.footerTopBgTimeLine, this.footerContentTimeLine])
    }

    render() {
        return (
            <VisibilitySensor 
                onChange={this.onChange}
                partialVisibility={true}
                >
                <FooterWrap>
                    <FooterTopBg ref={footerTopBg => this.footerTopBg = footerTopBg} />
                    <FooterContent ref={footerWrap => this.footerWrap = footerWrap}>
                        <Container>
                            <Link to="/">
                                <AptimiseLogo width="200" white />
                            </Link>
                            <Row>
                                <Col md={4} lg={6}>
                                    <LinkWrap>
                                        <LinkItem href="#">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </LinkItem>
                                        <LinkItem href="#">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                        </LinkItem>
                                        <LinkItem href="#">
                                            <FontAwesomeIcon icon={faGoogle} />
                                        </LinkItem>
                                        <LinkItem href="#">
                                            <FontAwesomeIcon icon={faFacebookF} />
                                        </LinkItem>
                                    </LinkWrap>
                                    <Text className="pb-3" size="md" color="white">WeWork building 8, Devonshire Square, London, EC2M 4PL</Text>
                                    <UsefulLinks>
                                        <li>
                                            <a href="mailto:">
                                                <Text size="md" color="white">Contact us</Text>
                                            </a>
                                        </li>
                                        <li>
                                            <Link to="/privacy-policy/">
                                                <Text size="md" color="white">Privacy Policy</Text>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/faqs/">
                                                <Text size="md" color="white">FAQs</Text>
                                            </Link>
                                        </li>
                                    </UsefulLinks>                            
                                </Col>
                                <Col md={{ offset: 1, size: 7}} lg={{ offset: 0, size: 6}}>
                                    <LinkWrap>
                                        <CompanyLinkItem href="#">
                                            <img src={xeroLogo} alt="Xero" style={{ maxWidth: "56px" }}/>
                                        </CompanyLinkItem>
                                        <CompanyLinkItem href="#">
                                            <img src={sageLogo} alt="Sage" style={{ maxWidth: "64px" }}/>
                                        </CompanyLinkItem>
                                        <CompanyLinkItem href="#">
                                            <img src={quickbooksLogo} alt="Quickbooks" style={{ maxWidth: "56px" }} />
                                        </CompanyLinkItem>
                                        <CompanyLinkItem href="#">
                                            <img src={aqillaLogo} alt="Aqilla" style={{ maxWidth: "51px" }} />
                                        </CompanyLinkItem>
                                        <CompanyLinkItem href="#">
                                            <img src={netsuiteLogo} alt="Netsuite" style={{ maxWidth: "113px" }} />
                                        </CompanyLinkItem>
                                    </LinkWrap>
                                    <a href="#">
                                        <img src={natwestLogo} alt="Natwest" style={{ maxWidth: "133px" }} />
                                    </a>
                                    <Text size="md" className="pt-2" color="white">
                                        Our <Link to="/privacy-policy/">Privacy Policy</Link>
                                    </Text>
                                </Col>
                            </Row>
                        </Container>
                    </FooterContent>
                </FooterWrap>
            </VisibilitySensor>
        )
    }
}

export default Footer
