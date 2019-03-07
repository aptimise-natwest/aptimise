import React, { Component } from "react"
import { TimelineMax } from "gsap/all"
import { withTheme } from 'styled-components'

class Accurate extends Component {
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
        const { theme } = this.props
        const topPathTimeline = new TimelineMax()
        const bottomPathTimeline = new TimelineMax()

        topPathTimeline
            .to(this.topPath, .3, { y: 48, delay: 1 }) 
            .to(this.topPath, .3, { y: 0, delay: .1 })

        bottomPathTimeline
            .to(this.bottomPath, .4, { x: 0, y: 0, opacity: 1 })
            .to(this.bottomPath, 0, { fill: theme.colors.yellow, delay: .9 }) 
            .to(this.bottomPath, .3, { x: 48, y: 20, opacity: 0, delay: .4 })
            .to(this.bottomPath, 0, { fill: theme.colors.turquoise, x: -48, y: -20 }) 
            .to(this.bottomPath, .4, { x: 0, y: 0, opacity: 1 })

        this.masterTimeline
            .add([topPathTimeline, bottomPathTimeline]).repeat(1)
    }

    render() {
        const { theme } = this.props
        return (
            <svg viewBox="0 0 75 90.7" 
                style={{
                    overflow: "visible",
                    maxWidth: "100%"
                }}
            >
                <path fill={theme.colors.turquoise} d="M0 68.82L37.45 90.7 75 68.65 37.45 47.33 0 68.82z" ref={(bottomPath) => this.bottomPath = bottomPath} />
                <path fill={theme.colors.purpleDark} d="M0 21.48l37.45 21.88L75 21.32 37.45 0 0 21.48z" ref={(topPath) => this.topPath = topPath} />
            </svg>
        )
    }
}

Accurate.defaultProps = {
    play: true
}

export default withTheme(Accurate)