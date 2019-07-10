import React, { Component } from "react";
import Layout from "components/Layout/Layout";
import ContentBlocks from "components/ContentBlocks/ContentBlocks";
import ContainerMaxWidth from "components/shared/ContainerMaxWidth";
import shortid from "shortid";

class DefaultTemplate extends Component {
  constructor(props) {
    super(props);
    this.createChat = this.createChat.bind(this);
    // this.logGa = this.logGa.bind(this);
  }

  createChat() {
    const src = `https://embed.small.chat/TENLCNU93GHCB0RK08.js?rndstr=${shortid.generate()}`;
    const s = document.createElement("script");
    s.setAttribute("src", src);
    s.setAttribute("async", true);
    s.setAttribute("id", "chatScript");
    document.body.appendChild(s);
    window.disableSmallchatGoogleAnalytics = true;
  }

  componentDidMount() {
    // this.createChat();
  }

  // logGa() {
  //   console.log("logging GA");
  // }

  render() {
    const data = this.props.data;

    return (
      <Layout data={data}>
        {data.pagesJson.h1 !== null && (
          <ContainerMaxWidth>
            <h1 className="pt-4">{data.pagesJson.title}</h1>
          </ContainerMaxWidth>
        )}
        {/* <ContentBlocks data={data} log={this.logGa} /> */}
        <ContentBlocks data={data} />
      </Layout>
    );
  }
}

export default DefaultTemplate;
