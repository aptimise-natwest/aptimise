import React, {Component} from "react"
import PropTypes from "prop-types"
import {StaticQuery, graphql} from "gatsby"
import {Row, Col} from "reactstrap"
import ContainerMaxWidth from "components/shared/ContainerMaxWidth"
import Text from "components/shared/Text"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.scss"
import "slick-carousel/slick/slick-theme.css"
import HexagonShape from "images/hexagon.svg"

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
                                image
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

const sliderCommonSettings = {
    fade: true,
    infinite: true,
    draggable: true,
    focusOnSelect: true,
    arrows: false
}

class Blocks extends Component {

    constructor(props) {
        super(props)

        this.state = {
            carouselTop: null,
            carouselUnderImages: null,
            carouselBottom: null,
            slideIndex: 0
        }

        this.getBlock = this.getBlock.bind(this)
        this.syncSliders = this.syncSliders.bind(this)
        this.changeSliders = this.changeSliders.bind(this)
        this.changeImages = this.changeImages.bind(this)
    }

    componentDidMount() {
        this.setState({
            carouselTop: this.carouselTop,
            carouselUnderImages: this.carouselUnderImages,
            carouselBottom: this.carouselBottom
        })
    }

    syncSliders(current, next, name) {
        if (name === 'carouselTop') {
            this.carouselUnderImages.slickGoTo(next)
            this.carouselBottom.slickGoTo(next)
        }
        if (name === 'carouselUnderImages') {
            this.carouselTop.slickGoTo(next)
            this.carouselBottom.slickGoTo(next)
        }
        if (name === 'carouselBottom') {
            this.carouselTop.slickGoTo(next)
            this.carouselUnderImages.slickGoTo(next)
        }

        // TODO: Simon - This causing error. As soon as the setState is removed, everything works fine.
        this.changeImages(next)
    }

    changeSliders(next) {
        console.log(next)
        this.carouselTop.slickGoTo(next)
        this.carouselUnderImages.slickGoTo(next)
        this.carouselBottom.slickGoTo(next)
    }

    changeImages(next) {
        this.setState({
            slideIndex: next
        })
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

        const carouselTop = block.node.carouselBlocks.map((block, i) => {
            return (
                <div key={i}>
                    <Text size="lg" className="pb-3">{block.title}</Text>
                    <Text dangerouslySetInnerHTML={{__html: block.topText}}/>
                </div>
            )
        })

        const carouselImages = block.node.carouselBlocks.map((block, i) => {
            return (
                <img src={HexagonShape} className={`hexagon ${this.state.slideIndex === i ? 'active' : ''}`} key={i} onClick={() => this.changeSliders(i)} alt="" width="194" />
            )
        })


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
                        </Col>
                        <Col xs={12} md={6}>
                            Video
                        </Col>
                    </Row>
                </div>
            )
        })

        return (
            <ContainerMaxWidth className="py-3">
                <Row>
                    <Col xs={12} md={6}>
                        <Slider
                            ref={slider => (this.carouselTop = slider)}
                            // asNavFor={this.state.carouselUnderImages}
                            className="carouselTop"
                            beforeChange={(current, next) => this.syncSliders(current, next, 'carouselTop')}
                            // beforeChange={(current, next) => this.setState({slideIndex: next})}
                            {...sliderCommonSettings}
                        >
                            {carouselTop}
                        </Slider>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        {carouselImages}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Slider
                            ref={slider => (this.carouselUnderImages = slider)}
                            // asNavFor={this.state.carouselBottom}
                            className="carouselUnderImages"
                            beforeChange={(current, next) => this.syncSliders(current, next, 'carouselUnderImages')}
                            // beforeChange={(current, next) => this.setState({slideIndex: next})}
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
                            // asNavFor={this.state.carouselTop}
                            className="carouselBottom"
                            beforeChange={(current, next) => this.syncSliders(current, next, 'carouselBottom')}
                            // beforeChange={(current, next) => this.setState({slideIndex: next})}
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