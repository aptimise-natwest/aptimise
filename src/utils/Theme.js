// match bootstrap size, plus add xs and xxl
const sizes = {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1600px"
};

const mediaBreakpointUp = {
    xs: `(min-width: ${sizes.xs})`,
    sm: `(min-width: ${sizes.sm})`,
    md: `(min-width: ${sizes.md})`,
    lg: `(min-width: ${sizes.lg})`,
    xl: `(min-width: ${sizes.xl})`,
    xxl: `(min-width: ${sizes.xxl})`
};

// @media ${ props => props.theme.mediaBreakpointUp.md } {
//     display: none;
// }

export default {
    mediaBreakpointUp,
    transitionBase: "all .4s ease-in-out",
    colors: {
        white: "#ffffff",
        black: "#000000",
        blue: "#516CBE",
        grey: "#E5E5E5",
        pink: "#E84261",
        purple: "#702283",
        purpleDark: "#42145F",
        yellow: "#FFB624",
        turquoise: "#00ADB9"
    }
};