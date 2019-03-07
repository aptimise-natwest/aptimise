import { createGlobalStyle, withTheme } from "styled-components";
import fontFiles from "./Fonts";

const GlobalStyles = createGlobalStyle`

    @font-face{
        font-family: "RN House Sans W01 Thin";
        src: url(${fontFiles.RNHouseSansW01ThinWOFF2}) format("woff2"), url(${fontFiles.RNHouseSansW01ThinWOFF}) format("woff");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Thin Italic";
        src: url(${fontFiles.RNHouseSansW01ThinItalicWOFF2}) format("woff2"), url(${fontFiles.RNHouseSansW01ThinItalicWOFF}) format("woff");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Light";
        src: url(${fontFiles.RNHouseSansW01LightWOFF2}) format("woff2"), url(${fontFiles.RNHouseSansW01LightWOFF2}) format("woff");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Light Italic";
        src: url(${fontFiles.RNHouseSansW01LightItalicWOFF2}) format("woff2"), url(${fontFiles.RNHouseSansW01LightItalicWOFF}) format("woff");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Regular";
        src: url(${fontFiles.RNHouseSansW01RegularWOFF2}) format("woff2"), url(${fontFiles.RNHouseSansW01RegularWOFF}) format("woff");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Italic";
        src: url(${fontFiles.RNHouseSansW01ItalicWOFF2}) format("woff2"), url(${fontFiles.RNHouseSansW01ItalicWOFF}) format("woff");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Bold";
        src: url(${fontFiles.RNHouseSansW01BoldWOFF2}) format("woff2"), url(${fontFiles.RNHouseSansW01BoldWOFF}) format("woff");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Bold Italic";
        src: url(${fontFiles.RNHouseSansW01BoldItalicWOFF2}) format("woff2"), url(${fontFiles.RNHouseSansW01BoldItalicWOFF}) format("woff");
        font-display: swap;
    }

    body {
        font-family: ${props => props.theme.font.family.body};
        font-size: ${props => props.theme.font.size.base};
        font-weight: ${props => props.theme.font.weight.light};
        line-height: ${props => props.theme.font.lineHeight.base};
        -webkit-font-smoothing: antialiased;
    }

    h1,
    h2, 
    h3, 
    h4, 
    h5, 
    h6 {
        font-family: ${props => props.theme.font.family.bold};
        font-weight: ${props => props.theme.font.weight.bold};
        line-height: ${props => props.theme.font.lineHeight.headings};
    }

    h1 {
        font-size: ${props => props.theme.font.h1.size};
    }
    h2 {
        font-size: ${props => props.theme.font.h2.size};
    }
    h3 {
        font-size: ${props => props.theme.font.h3.size};
    }
    h4 {
        font-size: ${props => props.theme.font.h4.size};
    }
    h5 {
        font-size: ${props => props.theme.font.h5.size};
    }
    h6 {
        font-size: ${props => props.theme.font.h6.size};
    }
`;

export default withTheme(GlobalStyles)
