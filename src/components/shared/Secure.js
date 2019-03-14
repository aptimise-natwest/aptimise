import React, { Component } from "react"
import { TimelineMax } from "gsap"
import { withTheme } from "styled-components"
import SvgWrap from "components/shared/SvgWrap"

class Secure extends Component {
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
        const whitePathTimeline = new TimelineMax()
        const topPathTimeline = new TimelineMax()
        const leftPathTimeline = new TimelineMax()
        const leftPath2Timeline = new TimelineMax()
        const rightPathTimeline = new TimelineMax()
        const rightPath2Timeline = new TimelineMax()

        whitePathTimeline.from(this.whitePath, .2, { opacity: 0, delay: .4 })
            .to(this.whitePath, .1, { opacity: 1 })
            .to(this.whitePath, .1, { opacity: 0 })
            .to(this.whitePath, 0, { x: 50, y: -85 })
            .to(this.whitePath, .1, { opacity: 1, })
            .to(this.whitePath, .1, { opacity: 0, delay: .2 })
            .to(this.whitePath, 0, { x: -45, y: -85 })
            .to(this.whitePath, .1, { opacity: 1, })
            .to(this.whitePath, .1, { opacity: 0, delay: .2 })
            .to(this.whitePath, 0, { x: 0, y: -55 })
            .to(this.whitePath, .1, { opacity: 1 })
            .to(this.whitePath, .1, { opacity: 0, delay: .2 })

        topPathTimeline.to(this.topPath, .3, { y: 15, scale: .94, transformOrigin: '50% 100%' })
        leftPathTimeline.to(this.leftPath, .3, { x: 10, y: -5 })
        leftPath2Timeline.to(this.leftPath2, .3, { x: 10, y: -31 })
        rightPathTimeline.to(this.rightPath, .3, { x: -10, y: -5 })
        rightPath2Timeline.to(this.rightPath2, .3, { x: -10, y: -31 })

        this.masterTimeline
            .add(whitePathTimeline)
            .add([topPathTimeline, leftPathTimeline, leftPath2Timeline, rightPathTimeline, rightPath2Timeline])
    }

    render() {
        const { theme } = this.props
        const ratio = 100 * 309.9 / 288
        return (
            <SvgWrap style={{ paddingBottom: `${ratio}%` }}>
                <svg viewBox="0 0 288 309.9"
                    style={{
                        overflow: "visible",
                        maxWidth: "100%"
                    }}
                >
                    <path fill={theme.colors.purpleDark} d="M144 0L0 81l144 81 144-81L144 0z" ref={(topPath) => this.topPath = topPath} />
                    <path fill={theme.colors.yellow} d="M135 182.4L0 106.5v51l135 75.9v-51z" ref={(leftPath) => this.leftPath = leftPath} />
                    <path fill={theme.colors.turquoise} d="M135 258.9L0 183v51l135 75.9v-51z" ref={(leftPath2) => this.leftPath2 = leftPath2} />
                    <path fill={theme.colors.pink} d="M153 182.4v51l135-75.9v-51l-135 75.9z" ref={(rightPath) => this.rightPath = rightPath} />
                    <path fill={theme.colors.blue} d="M153 258.9v51L288 234v-51l-135 75.9z" ref={(rightPath2) => this.rightPath2 = rightPath2} />
                    <path fill={theme.colors.white} d="M144 108.42l-48 27 48 27 48-27-48-27z" ref={(whitePath) => this.whitePath = whitePath} />
                </svg>
            </SvgWrap>
        )
    }
}

Secure.defaultProps = {
    play: true
}

export default withTheme(Secure)
