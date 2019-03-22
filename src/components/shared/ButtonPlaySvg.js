import React, { Component } from "react"
import { TimelineMax } from "gsap/all"
import "js/DrawSVGPlugin"

class ButtonPlaySvg extends Component {

    constructor(props) {
        super(props)
        this.masterTimeline = new TimelineMax()
        this.animation = this.animation.bind(this)
        this.play = this.play.bind(this)
    }

    componentDidMount() {
        // create animation
        this.animation()
    }

    componentWillUnmount() {
        // Kill on unmount
        this.masterTimeline.kill()
    }

    play() {
        this.masterTimeline.play(0)
    }

    animation() {
        const borderStroke = new TimelineMax()

        borderStroke
            .from(this.border, 1, { drawSVG: "0%" })
            .to(this.border, 1, { drawSVG: "100%" })

        this.masterTimeline.add(borderStroke)
    }

    render() {
        return(
            <svg viewBox="0 0 36 41" width="36px" height="41px" onMouseEnter={this.play}>
                <path d="M1,10.6l17-9.4l17,9.4v19.8l-17,9.4L1,30.4V10.6z" fill="none" stroke="white" strokeWidth="2" ref={(border) => this.border = border}/>
                <path d="M14,28V14l11,7L14,28z" fill="none" stroke="white" strokeWidth="2" />
            </svg>
        )
    }
}

export default ButtonPlaySvg