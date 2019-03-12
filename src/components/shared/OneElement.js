import React, { Component } from "react"
import { TimelineMax } from "gsap"
import { withTheme } from 'styled-components'

class OneElement extends Component {
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

        topPathTimeline
            .from(this.topPath, .3, { opacity: 0, y: 40 })
            .to(this.topPath, .3, { opacity: 1, y: 0 })

        this.masterTimeline
            .add(topPathTimeline)
    }

    render() {
        const { theme, block } = this.props
        return (
            <svg viewBox="0 0 176 298"
                 style={{
                     overflow: "visible",
                     maxWidth: "100%"
                 }}
            >
                <path d="M87.7764 0L0 49.4647L87.7764 98.9295L175.65 49.4647L87.7764 0Z" fill={theme.colors[`${block.color}`]}  ref={(topPath) => this.topPath = topPath} />
            </svg>

        )
    }
}

OneElement.defaultProps = {
    play: true
}

export default withTheme(OneElement)