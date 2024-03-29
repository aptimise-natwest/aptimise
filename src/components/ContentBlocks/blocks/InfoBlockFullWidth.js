import React, { Component } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { Row, Col } from "reactstrap";
import VisibilitySensor from "react-visibility-sensor";
import { withTheme } from "styled-components";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import Animation from "components/shared/Animation";
import styled from "styled-components";
import Text from "components/shared/Text";

const InfoBlocksFullWidth = props => (
  <StaticQuery
    query={graphql`
      query {
        allContentBlocksJson {
          edges {
            node {
              id
              animation
              title
              textIntroHTML
              textHTML
            }
          }
        }
      }
    `}
    render={data => <Blocks data={data} id={props.id} theme={props.theme} />}
  />
);
const Content = styled.span`
  h4 {
    font-size: 2rem;
  }
`;

const ContentWrap = styled.div`
  box-shadow: rgba(40, 41, 44, 0.12) 0px 1px 10px 1px;
  padding: 30px 50px;
  p {
    list-style: disc outside none;
    display: list-item;
  }
`;
class Blocks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: false,
      partialVisible: true
    };

    this.getBlock = this.getBlock.bind(this);
    this.playAnimation = this.playAnimation.bind(this);
  }

  componentDidMount() {
    // Change to show if partially visible on smaller devices
    this.partialVisible();
  }

  partialVisible() {
    if (typeof window !== "undefined") {
      const breakpoint = this.props.theme.sizes.lg.replace("px", "");
      const partialVisible = window.innerWidth < breakpoint ? true : false;
      this.setState({
        partialVisible
      });
    }
  }

  getBlock() {
    // Retrieve the content block
    // Loop all blocks and search for matching id
    const block = this.props.data.allContentBlocksJson.edges.filter(
      ({ node }) => this.props.id === node.id
    )[0];

    return block;
  }

  playAnimation(isVisible) {
    if (isVisible) {
      this.setState({ animation: true });
    }
  }

  render() {
    const block = this.getBlock();
    const { animation, title, textIntroHTML, textHTML } = block.node;

    return (
      <ContainerMaxWidth className="py-3 py-lg-4">
        <Row>
          <VisibilitySensor
            onChange={this.playAnimation}
            partialVisibility={this.state.partialVisible}
          >
            <Col className="py-lg-4">
              <Row>
                <Col xs={3} md={2} lg={3} xl={2}>
                  <Animation type={animation} play={this.state.animation} />
                </Col>
                <Col xs={9} sm={{ offset: 1, size: 8 }} lg={7} xl={8}>
                  <Content>
                    <h4 className="pb-3">{title}</h4>

                    <Text
                      dangerouslySetInnerHTML={{ __html: textIntroHTML }}
                      size="lg"
                    />
                    <ContentWrap>
                      <Text dangerouslySetInnerHTML={{ __html: textHTML }} />
                    </ContentWrap>
                  </Content>
                </Col>
              </Row>
            </Col>
          </VisibilitySensor>
        </Row>
      </ContainerMaxWidth>
    );
  }
}

InfoBlocksFullWidth.propTypes = {
  id: PropTypes.node.isRequired
};

Blocks.propTypes = {
  data: PropTypes.any.isRequired
};

export default withTheme(InfoBlocksFullWidth);
