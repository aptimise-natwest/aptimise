const sizes = {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1600px"
};

const fontSizeBase = 1;

const font = {
    family: {
        thin: "RN House Sans W01 Thin",
        thinItalic: "RN House Sans W01 Thin Italic",
        light: "RN House Sans W01 Light",
        lightItalic: "RN House Sans W01 Light Italic",
        base: "RN House Sans W01 Regular",
        italic: "RN House Sans W01 Italic",
        bold: "RN House Sans W01 Bold",
        boldItalic: "RN House Sans W01 Bold Italic",
        body: `"RN House Sans W01 Light", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
    },
    size: {
        base: `${fontSizeBase}rem`,
        sm: `${fontSizeBase * .875}rem`,
        lg: `${fontSizeBase * 1.25}rem`,
    },
    weight: {
        base: 400,
        light: 300,
        bold: 600
    },
    lineHeight: {
        base: 1.5,
        headings: 1.2
    },
    h1: {
        size: `${fontSizeBase * 2.5}rem`
    },
    h2: {
        size: `${fontSizeBase * 2}rem`
    },
    h3: {
        size: `${fontSizeBase * 1.75}rem`
    },
    h4: {
        size: `${fontSizeBase * 1.5}rem`
    },
    h5: {
        size: `${fontSizeBase * 1.25}rem`
    },
    h6: {
        size: `${fontSizeBase}rem`
    }
}

export default {
    sizes,
    font,
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