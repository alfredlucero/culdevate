import "styled-components";

interface Fonts {
  headerFontFamily: string;
  bodyFontFamily: string;
}

interface Colors {
  white: string;
  platinum: string;
  yellow: string;
  red: string;
  teal: string;
  blue: string;
  blueGray: string;
  orange: string;
  gray: string;
  lightGray: string;
}

// Extend the DefaultTheme
declare module "styled-components" {
  export interface DefaultTheme {
    fonts: Fonts;
    colors: Colors;
  }
}
