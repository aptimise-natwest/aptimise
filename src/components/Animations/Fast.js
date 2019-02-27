import React, { Component } from "react"
import { TimelineMax } from "gsap/all";

class Fast extends Component {
    constructor(props) {
        super(props);
        this.masterTimeline = new TimelineMax({paused: true})
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
        const topPathTimeline = new TimelineMax();
        const bottomRectTimeline = new TimelineMax();

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
        return(
            <svg viewBox="0 0 76.19 82" id="fast" style={{
                overflow: "visible"
            }}>
                <path fill="#4b0c61" d="M0 21.82L38 44l38.19-22.34L38 0z" ref={(topPath) => this.topPath = topPath} />
                <path fill="#ffb700" d="M0 41.74V28.16l35.51 20.36v13.54z" />
                <path fill="#ff4062" d="M76.18 41.74V28L40.46 48.52v13.54z" />
                <path fill="#00b4bd" d="M0 61.68V48.09l35.51 20.34V82z" />
                <path fill="#406cc2" d="M76.18 61.68V48.09L40.46 68.43V82z" />
                <rect fill="#4b0c61" width="0" height="23" x="118" y="40" ref={(bottomRect) => this.bottomRect = bottomRect} 
                    style={{
                        transform: "skew(-53deg) rotate(19deg)",
                        transformOrigin: "50% 50%"
                    }}
                />
            </svg>
        )
    }
}

export default Fast
