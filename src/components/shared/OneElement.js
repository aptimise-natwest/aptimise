import React, { Component } from "react"
import { TimelineMax } from "gsap"
import { withTheme } from 'styled-components'

class OneElement extends Component {
    constructor(props) {
        super(props);
        this.initialTimeline = new TimelineMax()
        this.masterTimeline = new TimelineMax({ paused: true })
        this.play = this.play.bind(this)
        this.setInitial = this.setInitial.bind(this)
    }

    componentDidMount() {
        // set initial position as animation starts when child is visible in viewport and mastertimelien is paused
        this.setInitial()
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

    setInitial() {
        this.initialTimeline
            .set(this.topPath, { opacity: 0, y: 40 })
    }

    animation() {
        this.masterTimeline
            .from(this.topPath, .3, { opacity: 0, y: 40 })
            .to(this.topPath, .3, { opacity: 1, y: 0 })
    }

    render() {
        const { theme, block } = this.props
        return (
            <svg viewBox="0 0 37.18 20.91"
                style={{
                    overflow: "visible",
                    maxWidth: "100%"
                }}
            >
                <path d="M18.58,0,0,10.45,18.58,20.91l18.6-10.45Z" fill={theme.colors[`${block.color}`]} ref={(topPath) => this.topPath = topPath} />
            </svg>
        )
    }
}

OneElement.defaultProps = {
    play: true
}

export default withTheme(OneElement)