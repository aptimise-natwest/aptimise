import React, { Component } from "react"
import PropTypes from "prop-types"
import { TimelineMax } from "gsap"
import VisibilitySensor from "react-visibility-sensor"

class FadeInUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            animated: false
        }
        
        this.initialTimeline = new TimelineMax()
        this.masterTimeline = new TimelineMax({ paused: true, onComplete: () => this.props.animated(true, this.props.elementId)})
        this.setInitial = this.setInitial.bind(this)
        this.fadeInUp = this.fadeInUp.bind(this)
        this.play = this.play.bind(this)
    }

    componentDidMount() {
        // set initial position as animation starts when child is visible in viewport and mastertimelien is paused
        this.setInitial()
        // create animation
        this.fadeInUp()
    }

    setInitial() {
        this.initialTimeline
            .set(this.props.elementId, { transform: "translate3d(0, 100px, 0)", opacity: 0 })
    }

    fadeInUp() {
        this.masterTimeline
            .from(this.props.elementId, 1, { transform: "translate3d(0, 100px, 0)", opacity: 0, delay: this.props.delay })
            .to(this.props.elementId, 1, { transform: "translate3d(0, 0, 0)", opacity: 1 })
    }

    play(isVisible) {
        if (isVisible && !this.state.animated) {
            this.masterTimeline.play()
            this.setState({ animated: true })
        }
    }

    render() {
        return (
            <VisibilitySensor onChange={this.play}>
                {this.props.children}
            </VisibilitySensor>
        )
    }
}

FadeInUp.propTypes = {
    children: PropTypes.node.isRequired,
    elementId: PropTypes.string.isRequired
}

FadeInUp.defaultProps = {
    animated: false,
    delay: 0
}

export default FadeInUp