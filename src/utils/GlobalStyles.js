import { createGlobalStyle, withTheme } from "styled-components";
import { media } from "utils/Media"
import fontFiles from "./Fonts";

const GlobalStyles = createGlobalStyle`

    @font-face{
        font-family: "RN House Sans W01 Thin";
        src: 
            url(${fontFiles.RNHouseSansW01ThinWOFF2}) format("woff2"), 
            url(${fontFiles.RNHouseSansW01ThinWOFF}) format("woff"),
            url(${fontFiles.RNHouseSansW01ThinTTF}) format("truetype");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Thin Italic";
        src: 
            url(${fontFiles.RNHouseSansW01ThinItalicWOFF2}) format("woff2"), 
            url(${fontFiles.RNHouseSansW01ThinItalicWOFF}) format("woff"),
            url(${fontFiles.RNHouseSansW01ThinItalicTTF}) format("truetype");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Light";
        src: 
            url(${fontFiles.RNHouseSansW01LightWOFF2}) format("woff2"), 
            url(${fontFiles.RNHouseSansW01LightWOFF}) format("woff"),
            url(${fontFiles.RNHouseSansW01LightTTF}) format("truetype");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Light Italic";
        src: 
            url(${fontFiles.RNHouseSansW01LightItalicWOFF2}) format("woff2"), 
            url(${fontFiles.RNHouseSansW01LightItalicWOFF}) format("woff"),
            url(${fontFiles.RNHouseSansW01LightItalicTTF}) format("truetype");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Regular";
        src: 
            url(${fontFiles.RNHouseSansW01RegularWOFF2}) format("woff2"), 
            url(${fontFiles.RNHouseSansW01RegularWOFF}) format("woff"),
            url(${fontFiles.RNHouseSansW01RegularTTF}) format("truetype");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Italic";
        src: 
            url(${fontFiles.RNHouseSansW01ItalicWOFF2}) format("woff2"), 
            url(${fontFiles.RNHouseSansW01ItalicWOFF}) format("woff"),
            url(${fontFiles.RNHouseSansW01ItalicTTF}) format("truetype");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Bold";
        src: 
            url(${fontFiles.RNHouseSansW01BoldWOFF2}) format("woff2"), 
            url(${fontFiles.RNHouseSansW01BoldWOFF}) format("woff"),
            url(${fontFiles.RNHouseSansW01BoldTTF}) format("truetype");
        font-display: swap;
    }
    @font-face{
        font-family: "RN House Sans W01 Bold Italic";
        src: 
            url(${fontFiles.RNHouseSansW01BoldItalicWOFF2}) format("woff2"), 
            url(${fontFiles.RNHouseSansW01BoldItalicWOFF}) format("woff"),
            url(${fontFiles.RNHouseSansW01BoldItalicTTF}) format("truetype");
        font-display: swap;
    }

    body {
        font-family: ${props => props.theme.font.family.body};
        font-size: ${props => props.theme.font.size.base};
        font-weight: normal;
        line-height: ${props => props.theme.font.lineHeight.sm};
        color: ${props => props.theme.colors.blackOff};
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;

        @media ${media.lg} {
            line-height: ${props => props.theme.font.lineHeight.base};
        }
    }

    h1,
    h2, 
    h3, 
    h4, 
    h5, 
    h6 {
        font-family: ${props => props.theme.font.family.light};
        font-weight: normal;
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

    a {
        color: ${props => props.theme.colors.purpleDark};
        &:hover {
            color: ${props => props.theme.colors.purpleDark};  
        }
    }

    img {
        max-width: 100%;
    }

    .modal-backdrop {
        background-color: ${props => props.theme.colors.grey};
        opacity: .3 !important;
    }

    /* Slick fade fix */
    .slick-slide.slick-active { z-index: 999; }
    .slick-slide { pointer-events: none; }
    .slick-active { pointer-events: auto; }
`;

export default withTheme(GlobalStyles)
