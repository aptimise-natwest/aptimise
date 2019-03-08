import React from "react"
import Fast from "./Fast"
import Accurate from "./Accurate"
import Secure from "./Secure"
import Simple from "./Simple"
import More from "./More"

const Animation = (props) => {

    const { type, play } = props

    switch (type) {
        case "fast":
           return <Fast play={play} />
        case "accurate":
            return <Accurate play={play} />
        case "secure":
            return <Secure play={play} />
        case "simple":
            return <Simple play={play} />
        case "more":
            return <More play={play} />
        default:
            return ""
    }

}

Animation.defaultProps = {
    type: 'fast',
    play: true
}

export default Animation