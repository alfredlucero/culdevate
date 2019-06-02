import "styled-components";
import { CuldevateTheme } from "../components/themeTypes";

// Extend the DefaultTheme
// IMPORTANT: in the case where @types/styled-components's version of
// DefaultTheme is what types the theme as any when importing styled-components,
// you MUST import this file after importing styled-components
// i.e. import styled, { css } from 'styled-components' -> takes from @types/styled-components
//      import ../../../moduleTypes/styled-components.d.ts -> overrides DefaultTheme so our theme is strictly typed
// it also must include the .d.ts for storybook to understand the import
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends CuldevateTheme {}
}
