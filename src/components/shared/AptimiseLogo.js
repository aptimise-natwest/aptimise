import React from "react"
import aptimiseLogoImg from "images/logos/aptimise-logo.svg"
import aptimiseLogoImgWhite from "images/logos/aptimise-logo-white.svg"

const AptimiseLogo = (props) => (
    <img 
        src={props.white ? aptimiseLogoImgWhite : aptimiseLogoImg} 
        width={props.width} 
        alt="APtimise" 
    />
)

AptimiseLogo.defaultProps = {
    width: '130',
    white: false
};

export default AptimiseLogo