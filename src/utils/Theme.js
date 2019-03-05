const sizes = {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1600px"
};

const fontSizeBase = 1;

const fontSizes = {
    sm: `${fontSizeBase * .875}rem`,
    lg: `${fontSizeBase * 1.25}rem`,
}

export default {
    sizes,
    fontSizeBase,
    fontSizes,
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