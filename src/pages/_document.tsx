import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      style={{
        height: "100%",
        backgroundColor: "rgb(237,233,235)",
        backgroundImage:
          "linear-gradient(0deg, rgba(230,224,208,1) 0%, rgba(237,233,235,1) 100%)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Head />
      <body
        style={{
          margin: 0,
          height: "fit",
          backgroundImage: "url(/rotated%20rectangle.svg)",
          backgroundSize: "fill",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 50% top 80px",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
