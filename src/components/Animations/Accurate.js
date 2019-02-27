import React, { Component } from "react"
import { TimelineMax } from "gsap/all";

class Accurate extends Component {
    constructor(props) {
        super(props);
        this.masterTimeline = new TimelineMax({ paused: true })
        this.play = this.play.bind(this)
    }

    componentDidMount() {
        // create animation
        this.animation()
        // play animation
        this.play()
    }

    play() {
        this.masterTimeline.play()
    }

    animation() {
        const topPathTimeline = new TimelineMax()
        const bottomPathTimeline = new TimelineMax()
        const bottomPathTimeline2 = new TimelineMax()

        topPathTimeline
            .to(this.topPath, .3, { y: 48, delay: 1 }) 
            .to(this.topPath, .3, { y: 0, delay: .1 })

        bottomPathTimeline
            .to(this.bottomPath, .4, { x: 0, y: 0, opacity: 1 })
            .to(this.bottomPath, 0, { fill: '#ffb700', delay: .9 }) 
            .to(this.bottomPath, .3, { x: 48, y: 20, opacity: 0, delay: .4 })
            .to(this.bottomPath, 0, { fill: '#00adb9', x: -48, y: -20 }) 
            .to(this.bottomPath, .4, { x: 0, y: 0, opacity: 1 })

        this.masterTimeline
            .add([topPathTimeline, bottomPathTimeline]).repeat(1)
    }

    render() {
        return (
            <svg viewBox="0 0 75 90.7" 
                style={{
                    overflow: "visible"
                }}
            >
                <path fill="#00adb9" d="M0 68.82L37.45 90.7 75 68.65 37.45 47.33 0 68.82z" ref={(bottomPath) => this.bottomPath = bottomPath} />
                <path fill="#4b0c61" d="M0 21.48l37.45 21.88L75 21.32 37.45 0 0 21.48z" ref={(topPath) => this.topPath = topPath} />
            </svg>
        )
    }
}

export default Accurate
