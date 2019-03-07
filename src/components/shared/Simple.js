import React, { Component } from "react"
import { TimelineMax } from "gsap/all"
import { withTheme } from 'styled-components'

class Simple extends Component {
    constructor(props) {
        super(props);
        this.masterTimeline = new TimelineMax({ paused: true })
        this.play = this.play.bind(this)
    }

    componentDidMount() {
        // create animation
        this.animation()
    }

    componentDidUpdate() {
        if (this.props.play) {
            // play animation
            this.play()
        }
    }

    play() {
        this.masterTimeline.play()
    }

    animation() {
        const topPathTimeline = new TimelineMax()
        const leftPathTimeline = new TimelineMax()
        const leftPath2Timeline = new TimelineMax()
        const rightPathTimeline = new TimelineMax()
        const rightPath2Timeline = new TimelineMax()

        topPathTimeline.to(this.topPath, .5, { opacity: 0, y: -40 })

        leftPathTimeline.from(this.leftClip, 0, { y: -15 })
            .to(this.leftClip, .5, { y: 15 })

        rightPathTimeline.from(this.rightClip, 0, { y: -15 })
            .to(this.rightClip, .5, { y: 15 })

        leftPath2Timeline.to(this.leftPath, .3, { x: 5 })

        rightPath2Timeline.to(this.rightPath, .3, { x: 30, y: -17 })

        this.masterTimeline
            .add(topPathTimeline)
            .add(leftPathTimeline)
            .add(rightPathTimeline)
            .add(leftPath2Timeline)
            .add(rightPath2Timeline)
    }

    render() {

        const { theme } = this.props

        return (
            <svg viewBox="0 0 76.19 82" 
                style={{
                    overflow: "visible",
                    maxWidth: "100%"
                }}
            >
                <defs>
                    <clipPath id="clipLeftPath">
                        <path fill="#fff" d="M0 41.74V28.16l35.51 20.36v13.54z" ref={(leftClip) => this.leftClip = leftClip} />
                    </clipPath>
                    <clipPath id="clipRightPath">
                        <path fill="#fff" d="M76.18 41.74V28L40.46 48.52v13.54z" ref={(rightClip) => this.rightClip = rightClip} />
                    </clipPath>
                </defs>
                <path fill={theme.colors.purpleDark} d="M0 21.82L38 44l38.19-22.34L38 0z" ref={(topPath) => this.topPath = topPath} />
                <g id="clipLeftReveal" clipPath="url(#clipLeftPath)">
                    <path fill={theme.colors.yellow} d="M0 41.74V28.16l35.51 20.36v13.54z"  />
                </g>
                <path fill={theme.colors.turquoise} d="M0 61.68V48.09l35.51 20.34V82z" ref={(leftPath) => this.leftPath = leftPath} />
                <g clipPath="url(#clipRightPath)">
                    <path fill={theme.colors.pink} d="M76.18 41.74V28L40.46 48.52v13.54z" />
                </g>
                <path fill={theme.colors.blue} d="M76.18 61.68V48.09L40.46 68.43V82z" />              
                <path fill={theme.colors.blue} d="M76.18 61.68V48.09L40.46 68.43V82z" ref={(rightPath) => this.rightPath = rightPath} />
            </svg>
        )
    }
}

Simple.defaultProps = {
    play: true
}

export default withTheme(Simple)
