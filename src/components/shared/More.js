import React, { Component } from "react"
import { TimelineMax } from "gsap"
import { withTheme } from 'styled-components'

class More extends Component {
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
        const middlePath1Timeline = new TimelineMax()
        const middlePath2Timeline = new TimelineMax()
        const bottomPathTimeline = new TimelineMax()

        topPathTimeline
            .from(this.topPath, .3, { opacity: 0, y: 40 })
            .to(this.topPath, .3, { opacity: 1, y: 0 })

        middlePath1Timeline
            .from(this.middlePath1, .3, { opacity: 0, y: 40 })
            .to(this.middlePath1, .3, { opacity: 1, y: 0 })

        middlePath2Timeline
            .from(this.middlePath2, .3, { opacity: 0, y: 40 })
            .to(this.middlePath2, .3, { opacity: 1, y: 0 })

        bottomPathTimeline
            .from(this.bottomPath, .3, { opacity: 0, y: 40 })
            .to(this.bottomPath, .3, { opacity: 1, y: 0 })

        this.masterTimeline
            .add(topPathTimeline)
            .add(middlePath1Timeline)
            .add(middlePath2Timeline)
            .add(bottomPathTimeline)
    }

    render() {
        const { theme } = this.props
        return (
            <svg viewBox="0 0 176 298"
                style={{
                    overflow: "visible",
                    maxWidth: "100%"
                }}
            >
                <path d="M87.7764 199.071L0 248.535L87.7764 298L175.65 248.535L87.7764 199.071Z" fill={theme.colors.blue} ref={(bottomPath) => this.bottomPath = bottomPath} />
                <path d="M87.7764 134.665L0 184.13L87.7764 233.594L175.65 184.13L87.7764 134.665Z" fill={theme.colors.turquoise} ref={(middlePath2) => this.middlePath2 = middlePath2} />
                <path d="M87.7764 67.3325L0 116.797L87.7764 166.262L175.65 116.797L87.7764 67.3325Z" fill={theme.colors.yellow} ref={(middlePath1) => this.middlePath1 = middlePath1} />
                <path d="M87.7764 0L0 49.4647L87.7764 98.9295L175.65 49.4647L87.7764 0Z" fill={theme.colors.purpleDark}  ref={(topPath) => this.topPath = topPath} />
            </svg>

        )
    }
}

More.defaultProps = {
    play: true
}

export default withTheme(More)