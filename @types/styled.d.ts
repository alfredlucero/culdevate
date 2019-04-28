import "styled-components";

interface Fonts {
  headerFontFamily: string;
  bodyFontFamily: string;
}

interface Colors {
  primary: string;
  secondary: string;
  white: string;
  platinum: string;
  yellow: string;
  teal: string;
  blueGray: string;
  orange: string;
  gray: string;
}

// Extend the DefaultTheme
declare module "styled-components" {
  export interface DefaultTheme {
    fonts: Fonts;
    colors: Colors;
  }
}
