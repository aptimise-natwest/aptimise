import React from "react"
import Fast from "components/shared/Fast"
import Accurate from "components/shared/Accurate"
import Secure from "components/shared/Secure"
import Simple from "components/shared/Simple"

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
        default:
            return ""
    }

}

Animation.defaultProps = {
    type: 'fast',
    play: true
}

export default Animation