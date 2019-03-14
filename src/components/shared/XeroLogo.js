import React from "react"
import xeroLogoImg from "images/logos/xero.svg"

const XeroLogo = (props) => (
    <img 
        {...props}
        src={xeroLogoImg} 
        width={props.width} 
        alt="Xero" 
    />
)

XeroLogo.defaultProps = {
    width: '35'
};

export default XeroLogo