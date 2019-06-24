import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "../../../@types/styled-components/index";
import Meta from "../Meta";
import { culdevateThemes } from "../../defaultTheme";
import { CuldevateTheme } from "../../themeTypes";

const StyledPage = styled.div`
  background: ${props => props.theme.semanticColors.primaryBgColor};
`;

const GlobalStyle = createGlobalStyle<{ theme: CuldevateTheme }>`
  html {
    box-sizing: border-box;
    font-size: ${props => props.theme.fontSize.baseFontSize};
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: ${props => props.theme.fontSize.bodyFontSize};
    line-height: 2;
    font-family: ${props => props.theme.fontFamily.bodyFontFamily};
    color: ${props => props.theme.semanticColors.normalTextColor};
  }
`;

class Page extends Component {
  public render() {
    return (
      // TODO: be able to toggle between themes
      <ThemeProvider theme={culdevateThemes.light}>
        <StyledPage>
          <Meta />
          <GlobalStyle />
          {this.props.children}
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
