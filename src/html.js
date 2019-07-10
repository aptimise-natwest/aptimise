import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        {/* <Helmet>
          <script>
            {`
			window.heap=window.heap||[],
			heap.load=function(e,t){window.heap.appid=e,
			window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,
			a=document.createElement("script");a.type="text/javascript",a.async=!0,
			a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";
			var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);
			for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},
			p=["addEventProperties","addUserProperties","clearEventProperties","identify",
			"resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],
			c=0;c<p.length;c++)heap[p[c]]=o(p[c])};
      heap.load("1332144985");
	  `}
          </script>
        </Helmet> */}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script>window.dispatchEvent(new Event("load"));</script>
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
};
