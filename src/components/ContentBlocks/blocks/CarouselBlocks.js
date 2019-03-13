import React, {Component} from "react"
import PropTypes from "prop-types"
import {StaticQuery, graphql} from "gatsby"
import {Row, Col} from "reactstrap"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import { media } from "utils/Media"
import Hexagon from "components/shared/Hexagon"
import HexagonCopy from "components/shared/HexagonCopy"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.scss"
import "slick-carousel/slick/slick-theme.css"
import HexagonShape from "images/hexagon.svg"
import ArrowLeft from "images/arrowLeft.svg"
import ArrowRight from "images/arrowRight.svg"

import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faTwitter,
    faFacebookF,
    faLinkedin,
    faGoogle
} from '@fortawesome/free-brands-svg-icons'

const CarouselBlocks = (props) => (
    <StaticQuery
        query={graphql`
            query {
                allContentBlocksJson {
                    edges {
                        node {
                            id
                            carouselBlocks {
                                title
                                topText
                                imageCopy
                                name
                                position
                                textHTML
                                videoId
                            }
                        }
                    }
                }
            }
        `}
        render={data => (
            <Blocks data={data} id={props.id}/>
        )}
    />
)

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
    color: ${props => props.theme.colors.purpleDark};
    font-size: 1.5rem;
    transition:  ${props => props.theme.transitionBase};

    @media ${media.sm} {
        padding: 1rem;
    }

    &:first-child {
        padding-left: 0;
    }

    &:hover {
        color: ${props => props.theme.colors.white};
    }
`

const sliderCommonSettings = {
    fade: true,
    infinite: false,
    draggable: false,
    focusOnSelect: true,
    arrows: false
}

const HexagonCarousel = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 1.5rem 0;
    
    @media ${media.md} {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -70px;
    }
    
    .absoluteHelper {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -70px;
    }
    
    .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        width: 32px;
        
        &-left {
            left: 0;
        }
        
        &-right {
            right: 0;
        }
    }
`

const HexagonCarouselItem = styled.div`
    margin-right: -90px;
    width: 176px;
    overflow: hidden;
    
    &:hover {
        >div:not(.active)  {
            opacity: 1 !important;
            z-index: 100 !important;
            >div  {
                opacity: 0.8 !important;
            }
        }
    }
`

const HexagonCarouselMobileItem = styled.div`
    width: 270px;
    margin-right: -150px;
    
    &.hidden {
        display: none;
    }
`

class Blocks extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // carouselTop: null,
            carouselUnderImages: null,
            carouselImages: null,
            carouselBottom: null,
            slideIndex: 0,
            maxIndex: 1
        }

        this.getBlock = this.getBlock.bind(this)
        // this.syncSliders = this.syncSliders.bind(this)
        this.changeSliders = this.changeSliders.bind(this)
        // this.changeImages = this.changeImages.bind(this)
    }

    componentDidMount() {
        const block = this.getBlock()

        this.setState({
            maxIndex: block.node.carouselBlocks.length - 1
        })
    }

    changeSliders(next) {
        console.log('Index ', next)

        setTimeout(() => {
            this.carouselBottom.slickGoTo(next)
            this.carouselUnderImages.slickGoTo(next)
        }, 200)

        this.setState({
            slideIndex: next
        })
    }

    imgClick(id) {
        this.setState({
            slideIndex: id
        })
        this.changeSliders(id)
    }

    leftClick() {
        this.imgClick(this.state.slideIndex === 0 ? this.state.maxIndex : (this.state.slideIndex - 1))
    }

    rightClick() {
        console.log(this.state.maxIndex)
        this.imgClick(this.state.slideIndex === this.state.maxIndex ? 0 : (this.state.slideIndex + 1))
    }

    renderImage(id, block) {
        let opacity = 0.05
        let className = ''
        const zIndex = 99 - Math.abs(this.state.slideIndex - id)

        if (this.state.slideIndex === id) {
            opacity = 1
            className = 'active'
        }

        if (this.state.slideIndex - 1 === id || this.state.slideIndex + 1 === id) {
            opacity = 0.8
        }

        if (this.state.slideIndex - 2 === id || this.state.slideIndex + 2 === id) {
            opacity = 0.2
        }

        let styleAux = {opacity, zIndex}
        let copyOpacity = 0

        if (className === 'active') {
            copyOpacity = 1
        }
        return (
            <Hexagon
                src={HexagonShape}
                copy={block.imageCopy}
                className={className}
                style={styleAux}
            >
                <HexagonCopy copyOpacity={copyOpacity}>
                    <div>{block.imageCopy}</div>
                </HexagonCopy>
            </Hexagon>
        )
    }

    renderMobileImage(id, block) {
        let opacity = 0.05
        let className = ''
        const zIndex = 99 - Math.abs(this.state.slideIndex - id)
        const transform = 'translateX(50%)'

        if (this.state.slideIndex === id) {
            opacity = 1
            className = 'active'
        }

        if (this.state.slideIndex - 1 === id || this.state.slideIndex + 1 === id) {
            opacity = 0.8
        }

        if (this.state.slideIndex - 2 === id || this.state.slideIndex + 2 === id) {
            opacity = 0.2
            className = 'active'
        }

        let styleAux = {opacity, zIndex}

        return (
            <Hexagon
                src={HexagonShape}
                copy={block.imageCopy}
                className={className}
                style={styleAux}
            >
                {className !== '' &&
                <HexagonCopy>
                    <div>{block.imageCopy}</div>
                </HexagonCopy>
                }
            </Hexagon>
        )
    }

    renderDesktopButtons(id, block) {
        return (
            <HexagonCarouselItem key={id} onClick={() => this.imgClick(id)}>
                {this.renderImage(id, block)}
            </HexagonCarouselItem>
        )
    }

    renderMobileButtons(id, block) {
        let className = 'hidden'

        if (this.state.slideIndex === id) {
            className = ''
        }

        if (this.state.slideIndex === 0) {
            if (id === 2) {
                // className = ''
            }
        }

        if (this.state.slideIndex - 1 === id || this.state.slideIndex + 1 === id) {
            className = ''
        }

        return (
            <HexagonCarouselMobileItem key={id} className={className} onClick={() => this.imgClick(id)}>
                {this.renderMobileImage(id, block)}
            </HexagonCarouselMobileItem>
        )
    }

    getBlock() {
        // Retrieve the content block
        // Loop all blocks and search for matching id
        return this.props.data.allContentBlocksJson.edges.filter(
            ({node}) => this.props.id === node.id
        )[0]
    }

    render() {
        const block = this.getBlock()

        const carouselUnderImages = block.node.carouselBlocks.map((block, i) => {
            return (
                <div key={i}>
                    <Text size="lg" className="pb-3">{block.name}</Text>
                    <Text dangerouslySetInnerHTML={{__html: block.position}}/>
                </div>
            )
        })

        const carouselBottom = block.node.carouselBlocks.map((block, i) => {
            return (
                <div key={i}>
                    <Row>
                        <Col xs={12} md={6}>
                            <Text dangerouslySetInnerHTML={{__html: block.textHTML}}/>
                            <LinkWrap>
                                <LinkItem href={block.twitter}>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </LinkItem>
                                <LinkItem href={block.linkedin}>
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </LinkItem>
                                <LinkItem href={block.google}>
                                    <FontAwesomeIcon icon={faGoogle} />
                                </LinkItem>
                                <LinkItem href={block.facebook}>
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </LinkItem>
                            </LinkWrap>
                        </Col>
                        <Col xs={12} md={6}>
                            Video
                        </Col>
                    </Row>
                </div>
            )
        })

        const returnRenderDesktopButtons = block.node.carouselBlocks.map((block, i) => {
            return (
                this.renderDesktopButtons(i, block)
            )
        })

        const returnRenderMobileButtons = block.node.carouselBlocks.map((block, i) => {
            return (
                this.renderMobileButtons(i, block)
            )
        })

        let style = {}

        if (this.state.slideIndex === 0) {
            style = {
                marginLeft: '-10px'
            }
        }

        if (this.state.slideIndex === this.state.maxIndex) {
            style = {
                marginLeft: '-130px'
            }
        }

        return (
            <ContainerMaxWidth className="py-3">
                <Row>
                    <Col xs={12} md={8} lg={6}>
                        <Text size="lg" className="pb-3">Don’t just take our word for it</Text>
                        <Text>Find out how APtimise has helped innovative software company LEAP Legal to improve their processes and reduce time spent on Accounts Payable by an amazing 50%.</Text>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-none d-md-block" xs={12}>
                        <HexagonCarousel>
                            {returnRenderDesktopButtons}
                        </HexagonCarousel>
                    </Col>
                    <Col className="d-block d-md-none" xs={12}>
                        <HexagonCarousel>
                            <img src={ArrowLeft} className="arrow arrow-left" onClick={() => this.leftClick()}/>
                            <div className="absoluteHelper" style={style}>
                                {returnRenderMobileButtons}
                            </div>
                            <img src={ArrowRight} className="arrow arrow-right" onClick={() => this.rightClick()}/>
                        </HexagonCarousel>
                    </Col>
                </Row>
                <Row className="py-3">
                    <Col xs={12} md={6}>
                        <Slider
                            ref={slider => (this.carouselUnderImages = slider)}
                            className="carouselUnderImages"
                            {...sliderCommonSettings}
                        >
                            {carouselUnderImages}
                        </Slider>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Slider
                            ref={slider => (this.carouselBottom = slider)}
                            className="carouselBottom"
                            {...sliderCommonSettings}
                        >
                            {carouselBottom}
                        </Slider>
                    </Col>
                </Row>
            </ContainerMaxWidth>
        )
    }
}

CarouselBlocks.propTypes = {
    id: PropTypes.node.isRequired,
}

Blocks.propTypes = {
    data: PropTypes.any.isRequired,
}

export default CarouselBlocks
