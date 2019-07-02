import styled, { ThemeProvider, css, createGlobalStyle } from "styled-components";
import { CuldevateTheme } from "../../components/themeTypes";

// Extend the DefaultTheme
// IMPORTANT: in the case where @types/styled-components's version of
// DefaultTheme types the DefaultTheme as any when importing styled-components,
// you MUST import this file instead of the usual node_modules styled-components
// i.e. import styled, { css } from 'styled-components' -> takes from @types/styled-components
//      import styled, { css, ... } from '../../../@types/styled-components/index' -> overrides DefaultTheme so our theme is strictly typed
// we are thus importing the styled-components functions with our CuldevateTheme attached
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends CuldevateTheme {}
}

export default styled;
export { ThemeProvider, css, createGlobalStyle };
