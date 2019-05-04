import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Meta from "../Meta";
import { culdevateDefaultTheme } from "../../defaultTheme";

const StyledPage = styled.div`
  background: ${props => props.theme.colors.white};
`;

// TODO: figure out typing for this to work with createGlobalStyle
// The theme props should be already known as it is under a ThemeProvider
const GlobalStyle = createGlobalStyle<any>`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: ${props => props.theme.fonts.bodyFontFamily};
    color: ${props => props.theme.colors.gray};
  }
`;

class Page extends Component {
  public render() {
    return (
      <ThemeProvider theme={culdevateDefaultTheme}>
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
