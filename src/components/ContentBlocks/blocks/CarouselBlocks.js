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
import GroupShape from "images/group.svg"
import Shape1Shape from "images/shape1.svg"
import ArrowLeft from "images/arrowLeft.svg"
import ArrowRight from "images/arrowRight.svg"

import styled from "styled-components";

const SliderElement = styled.div`
    img {
        // max-width: 150px;
        background-color: red;

        // position: absolute;
        // margin: 0 50px;

    }
`
const arrowStyle = {
  opacity: 0.99,
  height: '50px',
  width: '50px',
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -50%)',
  zIndex: '11'
};

const activeMobImgStyle = {
  cursor: 'pointer',
  position: 'absolute',
  zIndex: '10',
  transition: 'opacity 500ms 0ms',
  opacity: 0.99
  // transition: 'opacity 500ms 0ms, transform 500ms 0ms',
  // transform: 'translate(50%)',

};

const inactiveMobImgStyle = {
  transition: 'opacity 500ms 0ms',
  opacity: 0.6
};

const inactiveMobImgStyle2 = {
  transition: 'opacity 500ms 0ms',
  opacity: 0.2
};


const activeImgStyle = {
  cursor: 'pointer',
  position: 'absolute',
  zIndex: '10',
  transition: 'opacity 500ms 0ms',
  opacity: 0.99
  // transition: 'opacity 500ms 0ms, transform 500ms 0ms',
  // transform: 'translate(50%)',

};

const inactiveImgStyle = {
  transition: 'opacity 500ms 0ms',
  opacity: 0.6
};

const inactiveImgStyle2 = {
  transition: 'opacity 500ms 0ms',
  opacity: 0.2
};


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
    infinite: false,
    draggable: false,
    focusOnSelect: true,
    arrows: false
}

class Blocks extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // carouselTop: null,
            // carouselUnderImages: null,
            carouselImages: null,
            carouselBottom: null,
            slideIndex: 0
        }

        this.getBlock = this.getBlock.bind(this)
        // this.syncSliders = this.syncSliders.bind(this)
        this.changeSliders = this.changeSliders.bind(this)
        // this.changeImages = this.changeImages.bind(this)
    }

    componentDidMount() {
        // this.setState({
        //     carouselTop: this.carouselTop,
        //     carouselUnderImages: this.carouselUnderImages,
        //     carouselBottom: this.carouselBottom
        // })
    }

    syncSliders(current, next, name) {
        this.carouselBottom.slickGoTo(next)

        // this.changeImages(next)
    }

    changeSliders(next) {
        console.log('Index ', next)
        // this.carouselTop.slickGoTo(next)
        // this.carouselUnderImages.slickGoTo(next)
        this.carouselBottom.slickGoTo(next)

        this.setState({
            slideIndex: next
        })
    }
    //
    // changeImages(next) {
    //     this.setState({
    //         slideIndex: next
    //     })
    // }

    imgClick(id) {
      this.setState({
          slideIndex: id
      })
      this.changeSliders(id)
      // console.log('slideIndex :', this.state.slideIndex);
    }

    leftClick() {
      console.log('left');
      this.imgClick((this.state.slideIndex === 0) ? 2:(this.state.slideIndex - 1))
    }

    rightClick() {
      console.log('right');
      this.imgClick((this.state.slideIndex + 1) % 3)
    }

    // renderImage(id) {
    //   return <img src={HexagonShape} style={this.state.slideIndex === id ? activeImgStyle: inactiveImgStyle} onClick={()=> this.imgClick(id)}/>
    // }
    renderImage(id) {
      const opacity = 1 - (Math.abs(this.state.slideIndex-id) * 0.3);
      const zIndex = 10 - Math.abs(this.state.slideIndex-id);
      const transform = 'translate(50%)';
      // console.log(1-Math.abs(this.state.slideIndex-id)*0.2);
      let styleAux = {...activeImgStyle, opacity, zIndex}
      if (this.state.slideIndex === id){
        return <img src={HexagonShape} style={activeImgStyle} onClick={()=> this.imgClick(id)}/>            // WORKS PLAIN
        // return <img src={HexagonShape} style={{...activeImgStyle, left: '50%', transform}} onClick={()=> this.imgClick(id)}/>
        // return <img src={HexagonShape} style={{...activeImgStyle, transform: 'translate(50%)'}} onClick={()=> this.imgClick(id)}/>
      }else{
        return <img src={Shape1Shape} style={styleAux} onClick={()=> this.imgClick(id)}/>
      }
    }

    renderMobileImage(id) {
      const opacity = 1 - (Math.abs(this.state.slideIndex-id) * 0.3);
      const zIndex = 10 - Math.abs(this.state.slideIndex-id);
      const transform = 'translate(100%)';
      // console.log(1-Math.abs(this.state.slideIndex-id)*0.2);
      let styleAux = {...activeImgStyle, opacity, zIndex, transform}
      if (this.state.slideIndex === id){
        return <img src={HexagonShape} style={{...activeImgStyle, transform}} onClick={()=> this.imgClick(id)}/>            // WORKS PLAIN
        // return <img src={HexagonShape} style={{...activeImgStyle, left: '50%', transform}} onClick={()=> this.imgClick(id)}/>
        // return <img src={HexagonShape} style={{...activeImgStyle, transform: 'translate(50%)'}} onClick={()=> this.imgClick(id)}/>
      }else{
        return <img src={Shape1Shape} style={styleAux} onClick={()=> this.imgClick(id)}/>
      }
    }

    renderDesktopButtons() {
      return (
        <Col className="d-none d-md-block" xs={12} md={6} style={{minHeight: '219px'}}>
          <Row>
              <Col xs={3}>
                {this.renderImage(0)}
              </Col>
              <Col xs={3}>
                {this.renderImage(1)}
              </Col>
              <Col xs={3}>
                {this.renderImage(2)}
              </Col>
              <Col xs={3}>
                {this.renderImage(3)}
              </Col>
          </Row>
        </Col>
      )
    }

    renderMobileButtons() {
      return (
        <Col className="d-block d-md-none" xs={12} md={6} style={{minHeight: '219px', overflowX:'hidden'}}>
          <img src={ArrowLeft} style={arrowStyle} onClick={()=> this.leftClick()}/>
          {/*<img src={ArrowLeft} style={arrowStyle} onClick={()=> this.setState({slideIndex: this.state.slideIndex === 0 ? 3:(this.state.slideIndex - 1)})}/>8?}
          {/* <img src={ArrowLeft} style={arrowStyle} onClick={()=> this.imgClick((this.state.slideIndex - 1) % 4)}/>*/}
          <Row>
              <Col xs={3}>
                {this.renderMobileImage(0)}
              </Col>
              <Col xs={3}>
                {this.renderMobileImage(1)}
              </Col>
              <Col xs={3}>
                {this.renderMobileImage(2)}
              </Col>

          </Row>
          <img src={ArrowRight} style={{...arrowStyle, left: '100%', transform: 'translate(-100%, -50%)'}} onClick={()=> this.rightClick()}/>
          {/*
          <div style={diamond} ><img src={HexagonShape} /></div>
          <div style={spade} ><img src={HexagonShape} /></div>
          <div style={club} ><img src={HexagonShape} /></div>


            <Slider
                ref={slider => (this.carouselImages = slider)}
                // asNavFor={this.state.carouselBottom}
                className="carouselUnderImages"
                beforeChange={(current, next) => this.syncSliders(current, next, 'carouselImages')}
                // beforeChange={(current, next) => this.setState({slideIndex: next})}
                infinite={false}
                centerMode={true}
                centerPadding='20%'
            >
                {carouselImages}
            </Slider>
          */}
        </Col>
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
                <SliderElement key={i}>
                    <img src={HexagonShape} className={`hexagon ${this.state.slideIndex === i ? 'active' : ''}`} onClick={() => this.changeSliders(i)} alt=""/>
                </SliderElement>
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
                {/*<Row>*/}
                    {/*<Col xs={12} md={6}>*/}
                        {/*<Slider*/}
                            {/*ref={slider => (this.carouselTop = slider)}*/}
                            {/*asNavFor={this.state.carouselImages}*/}
                            {/*className="carouselTop"*/}
                            {/*// beforeChange={(current, next) => this.syncSliders(current, next, 'carouselTop')}*/}
                            {/*// beforeChange={(current, next) => this.setState({slideIndex: next})}*/}
                            {/*{...sliderCommonSettings}*/}
                        {/*>*/}
                            {/*{carouselTop}*/}
                        {/*</Slider>*/}
                    {/*</Col>*/}
                {/*</Row>*/}
                <Row >
                  {this.renderMobileButtons()}
                  {this.renderDesktopButtons()}
                </Row>
                {/*<Row>*/}
                    {/*<Col xs={12} md={6}>*/}
                        {/*<Slider*/}
                            {/*ref={slider => (this.carouselUnderImages = slider)}*/}
                            {/*asNavFor={this.state.carouselImages}*/}
                            {/*className="carouselUnderImages"*/}
                            {/*// beforeChange={(current, next) => this.syncSliders(current, next, 'carouselUnderImages')}*/}
                            {/*// beforeChange={(current, next) => this.setState({slideIndex: next})}*/}
                            {/*{...sliderCommonSettings}*/}
                        {/*>*/}
                            {/*{carouselUnderImages}*/}
                        {/*</Slider>*/}
                    {/*</Col>*/}
                {/*</Row>*/}
                <Row>
                    <Col xs={12}>
                        <Slider
                            ref={slider => (this.carouselBottom = slider)}
                            asNavFor={this.state.carouselImages}
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
