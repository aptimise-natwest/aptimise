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

  return props.children(caseItem);
};

export default CaseStudyProvider;
