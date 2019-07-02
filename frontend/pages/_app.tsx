import React from "react";
import App, { Container, NextAppContext } from "next/app";
import Page from "../components/__common__/Page";
import console = require("console");

class CuldevateApp extends App {
  public static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  public render() {
    const { Component, pageProps } = this.props;
    const test = { blah: "blah" };
    console.log(test);

    return (
      <Container>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    );
  }
}

export default CuldevateApp;
