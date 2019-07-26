import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import LandingBlock from "./blocks/LandingBlock";
import TextBlock from "./blocks/TextBlock";
import TextBlockTerms from "./blocks/TextBlockTerms";
import TextBlockAbout from "./blocks/TextBlockAbout";
import InfoBlocks from "./blocks/InfoBlocks";
import InfoBlockFullWidth from "./blocks/InfoBlockFullWidth";
import CalculatorBlock from "./blocks/CalculatorBlock";
import WhitePaperBlock from "./blocks/WhitePaperBlock";
import FormBlock from "./blocks/FormBlock";

import LinkBlock from "./blocks/LinkBlock";
import DeviceBlock from "./blocks/DeviceBlock";
import CarouselBlock from "./blocks/CarouselBlock";
import ImageTextBlock from "./blocks/ImageTextBlock";
import FaqBlocks from "./blocks/FaqBlocks";
import GridBlock from "./blocks/GridBlock";
import CaseStudyQoute from "./blocks/CaseStudyQoute";
import SocialBlock from "./blocks/SocialBlock";
import ChallengeSolutionBlock from "./blocks/ChallengeSolutionBlock";

const ContentBlocks = props => {
  const pageBlocks = props.data.pagesJson.contentBlocks;

  const data = useStaticQuery(graphql`
    query {
      allContentBlocksJson {
        edges {
          node {
            id
            type
          }
        }
      }
    }
  `);

  // Filter content blocks that belong to the current page
  let contentBlocks = data.allContentBlocksJson.edges.filter(
    ({ node }) => pageBlocks.indexOf(node.id) >= 0
  );

  // Sort contentblocks to match pageBlocks order
  contentBlocks = contentBlocks
    .map(block => {
      let n = pageBlocks.indexOf(block.node.id);
      return [n, block];
    })
    .sort()
    .map(j => {
      return j[1];
    });

  let blocks = "";

  let { log } = props;

  if (contentBlocks !== null) {
    blocks = contentBlocks.map((block, i) => {
      // console.log(block.node.type)

      switch (block.node.type) {
        case "LandingBlock":
          return <LandingBlock id={block.node.id} key={i} />;

        case "TextBlock":
          return <TextBlock id={block.node.id} key={i} />;

        case "SocialBlock":
          return <SocialBlock id={block.node.id} key={i} />;

        case "TextBlockTerms":
          return <TextBlockTerms id={block.node.id} key={i} />;

        case "TextBlockAbout":
          return <TextBlockAbout id={block.node.id} key={i} />;

        case "InfoBlocks":
          return <InfoBlocks id={block.node.id} key={i} />;

        case "LinkBlock":
          return <LinkBlock id={block.node.id} key={i} />;

        case "GridBlock":
          return <GridBlock id={block.node.id} key={i} />;

        case "ChallengeSolutionBlock":
          return <ChallengeSolutionBlock id={block.node.id} key={i} />;

        case "CaseStudyQoute":
          return <CaseStudyQoute id={block.node.id} key={i} />;

        case "InfoBlockFullWidth":
          return <InfoBlockFullWidth id={block.node.id} key={i} />;

        case "CalculatorBlock":
          return <CalculatorBlock id={block.node.id} key={i} />;

        case "WhitePaperBlock":
          return <WhitePaperBlock id={block.node.id} key={i} />;
        //   return <WhitePaperBlock id={block.node.id} key={i} {...log} />;

        case "FormBlock":
          return <FormBlock id={block.node.id} key={i} />;

        case "DeviceBlock":
          return <DeviceBlock id={block.node.id} key={i} />;

        case "CarouselBlock":
          return <CarouselBlock id={block.node.id} key={i} />;

        case "ImageTextBlock":
          return <ImageTextBlock id={block.node.id} key={i} />;

        case "FaqBlocks":
          return <FaqBlocks id={block.node.id} key={i} />;

        default:
          return "";
      }
    });
  }

  return <>{blocks}</>;
};

export default ContentBlocks;
