import React from "react";
import Document, { Head, Main, NextScript, NextDocumentContext, AnyPageProps } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class CuldevateDocument extends Document {
  public static getInitialProps({ renderPage }: NextDocumentContext) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App: React.ComponentType<AnyPageProps>) => (props: AnyPageProps) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  public render() {
    return (
      <html>
        <Head>
          {/* Step 5: Output the styles in the head  */}
          {(this.props as any).styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}