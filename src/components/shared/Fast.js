import React, { Component } from "react"
import { TimelineMax } from "gsap"
import { withTheme } from "styled-components"
import SvgWrap from "components/shared/SvgWrap"

class Fast extends Component {
    constructor(props) {
        super(props);
        this.masterTimeline = new TimelineMax({paused: true})
        this.bottomRectTimelineInitial = new TimelineMax()
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

    componentWillUnmount() {
        // Kill on unmount
        this.masterTimeline.kill()
    }

    play() {
        this.masterTimeline.play()
    }

    animation() {
        const topPathTimeline = new TimelineMax()
        const bottomRectTimeline = new TimelineMax()

        this.bottomRectTimelineInitial
            .set(this.bottomRect, { transform: "skew(-54deg) rotate(19deg)", transformOrigin: "50% 50%" })

        topPathTimeline
            .from(this.topPath , .5, { opacity: 0, y: -40 })
            .to(this.topPath , .5, { opacity: 1, y: 0 })
            .to(this.topPath , .7, { scale: 0, transformOrigin: '50% 100%' })
            .to(this.topPath, 0, { scale: 1, opacity: 0, y: -40 })
            .to(this.topPath, .5, { opacity: 1, y: 0, delay: 1.7 })

        bottomRectTimeline
            .to(this.bottomRect, .7, { attr: { width: 70 }, delay: 1.7 })
            .to(this.bottomRect, .7, { opacity: 0, delay: .3 })

        this.masterTimeline
            .add([topPathTimeline, bottomRectTimeline])
    }

    render() {

        const { theme } = this.props
        const ratio = 100 * 82 / 76.19
        return(
            <SvgWrap style={{ paddingBottom: `${ratio}%` }}>
                <svg viewBox="0 0 76.19 82" id="fast" style={{
                    overflow: "visible",
                    maxWidth: "100%"
                }}>
                    <path fill={theme.colors.purpleDark} d="M0 21.82L38 44l38.19-22.34L38 0z" ref={(topPath) => this.topPath = topPath} />
                    <path fill={theme.colors.yellow} d="M0 41.74V28.16l35.51 20.36v13.54z" />
                    <path fill={theme.colors.pink} d="M76.18 41.74V28L40.46 48.52v13.54z" />
                    <path fill={theme.colors.turquoise} d="M0 61.68V48.09l35.51 20.34V82z" />
                    <path fill={theme.colors.blue} d="M76.18 61.68V48.09L40.46 68.43V82z" />
                    <rect fill={theme.colors.purpleDark} width="0" height="23" x="183" y="8" ref={(bottomRect) => this.bottomRect = bottomRect} />
                </svg>
            </SvgWrap>
        )
    }
}

Fast.defaultProps = {
    play: true
}

export default withTheme(Fast)
