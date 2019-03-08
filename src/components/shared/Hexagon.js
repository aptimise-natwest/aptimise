import React from "react"
import HexagonShape from "images/hexagon.svg"

const Hexagon = (props) => (
    <img src={HexagonShape} onClick={props.changeSliders(1)} alt="" width="194" />
)

export default Hexagon