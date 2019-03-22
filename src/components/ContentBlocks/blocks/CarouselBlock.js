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

import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faTwitter,
    faFacebookF,
    faLinkedin
} from '@fortawesome/free-brands-svg-icons'

import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const CarouselBlocks = (props) => (
    <StaticQuery
        query={graphql`
            query {
                allContentBlocksJson {
                    edges {
                        node {
                            id
                            title
                            textHTML
                            carouselBlocks {
                                imageCopy
                                name
                                position
                                textHTML
                                twitter
                                linkedIn
                                facebook
                                youtubeVideoId
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

const CarouselWrap = styled.div`
    padding-top: 1.5rem;
    padding-bottom: 3rem;
`

const LinkWrap = styled.div`
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
        color: ${props => props.theme.colors.grey};
    }
`

const HexagonCarouselContainer = styled(ContainerMaxWidth)`
    padding-left: 0;
    padding-right: 0;
    overflow-x: hidden;
`

const HexagonCarousel = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 1.5rem 0;
    
    @media ${media.md} {
        display: flex;
        /* align-items: center;
        justify-content: center; */
        /* margin-left: -70px; */
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
`

const ArrowLeft = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    font-size: 2.5rem;
    left: 2rem;
    background-color: transparent;
    border: 0;
    color: ${props => props.theme.colors.grey};
`

const ArrowRight = styled(ArrowLeft)`
    left: auto;
    right: 2rem;
`

const DesktopHexagons = styled(Col)`
    display: none;

    @media ${media.md} {
        display: block;
    }
`

const MobileHexagons = styled(Col)`
    display: block;

    @media ${media.md} {
        display: none;
    }
`

const HexagonCarouselItem = styled.div`
    margin-right: -90px;
    width: 176px;
    overflow: hidden;
    
    /* &:hover {
        >div:not(.active)  {
            opacity: 1 !important;
            z-index: 100 !important;
            >div  {
                opacity: 0.8 !important;
            }
        }
    } */
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
            carouselImages: null,
            carouselBottom: null,
            slideIndex: 0,
            maxIndex: 1
        }

        this.getBlock = this.getBlock.bind(this)
        this.leftClick = this.leftClick.bind(this)
        this.rightClick = this.rightClick.bind(this)
        this.changeSliders = this.changeSliders.bind(this)
    }

    componentDidMount() {
        const block = this.getBlock()

        this.setState({
            maxIndex: block.node.carouselBlocks.length - 1
        })
    }

    changeSliders(next) {
        setTimeout(() => {
            this.carouselBottom.slickGoTo(next)
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

        const sliderCommonSettings = {
            fade: true,
            adaptiveHeight: true,
            draggable: false,
            arrows: false,
            swipe: false
        }

        const block = this.getBlock()

        const { title, textHTML } = block.node

        const carouselBottom = block.node.carouselBlocks.map((block, i) => {
            const youtubeSrc = `https://www.youtube.com/embed/${block.youtubeVideoId}?rel=0`
            return (
                <div key={i}>
                    <Row>
                        <Col md={6}>
                            <Text size="lg" className="pb-3">{block.name}</Text>
                            <Text className="pb-3" dangerouslySetInnerHTML={{ __html: block.position }} />
                            <Text dangerouslySetInnerHTML={{__html: block.textHTML}}/>
                            <LinkWrap>
                                {block.twitter !== "" &&
                                    <LinkItem href={block.twitter} target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </LinkItem>
                                }
                                {block.linkedIn !== "" &&
                                    <LinkItem href={block.linkedIn} target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </LinkItem>
                                }
                                {/* <LinkItem href={block.google}>
                                    <FontAwesomeIcon icon={faGoogle} />
                                </LinkItem> */}
                                {block.facebook !== "" &&
                                    <LinkItem href={block.facebook} target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </LinkItem>
                                }
                            </LinkWrap>
                        </Col>
                        <Col md={6}>
                            {block.youtubeVideoId !== "" &&
                                <div className="embed-responsive embed-responsive-16by9">
                                    <iframe
                                        width="560"
                                        height="315"
                                        className="embed-responsive-item"
                                        src={youtubeSrc}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="APtimise video"></iframe>
                                </div>
                            }
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
            <>
                <CarouselWrap>
                    <ContainerMaxWidth>
                        <Row>
                            <Col xs={12} md={8} lg={6}>
                                <h4 className="pb-3">{title}</h4>
                                <Text dangerouslySetInnerHTML={{ __html: textHTML }}/>
                            </Col>
                        </Row>
                    </ContainerMaxWidth>
                    <HexagonCarouselContainer>
                        <Row>
                            <DesktopHexagons>
                                <HexagonCarousel>
                                    {returnRenderDesktopButtons}
                                </HexagonCarousel>
                            </DesktopHexagons>
                            <MobileHexagons>
                                <HexagonCarousel>
                                    <ArrowLeft onClick={this.leftClick}>
                                        <FontAwesomeIcon icon={faAngleLeft} />
                                    </ArrowLeft>
                                    <div className="absoluteHelper" style={style}>
                                        {returnRenderMobileButtons}
                                    </div>
                                    <ArrowRight onClick={this.rightClick}>
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </ArrowRight>
                                </HexagonCarousel>
                            </MobileHexagons>
                        </Row>
                    </HexagonCarouselContainer>
                    <ContainerMaxWidth>
                        <Row>
                            <Col xs={12}>
                                <Slider
                                    ref={slider => (this.carouselBottom = slider)}
                                    {...sliderCommonSettings}
                                >
                                    {carouselBottom}
                                </Slider>
                            </Col>
                        </Row>
                    </ContainerMaxWidth>
                </CarouselWrap>
            </>
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
