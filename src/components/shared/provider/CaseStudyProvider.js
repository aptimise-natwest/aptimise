const CaseStudyProvider = props => {
  let getBlock = props => {
    return props.data.allContentBlocksJson.edges.filter(
      ({ node }) => props.id === node.id
    )[0];
  };

  const block = getBlock(props).node.carouselBlocks;

  const filterValues = name => {
    return block.filter(data => {
      return data.imageCopy === name.imageCopy;
    });
  };

  let caseItem = filterValues(props.filter);
  caseItem[0].hideVideo = props.hideVideo;
  caseItem[0].headerTitle = props.headerTitle;
  caseItem[0].logos = props.logos;
  caseItem[0].layout = props.layout;

  console.log("caseItem");
  console.log(caseItem);
  console.log("caseItem");
  return props.children(caseItem);
};

export default CaseStudyProvider;
