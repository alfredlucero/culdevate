import { CuldevateTheme, FontFamily, FontSize, RawColors, SemanticColors, Forms } from "./themeTypes";

export const fontFamily: FontFamily = {
  headerFontFamily: '"Nunito", sans-serif',
  bodyFontFamily: '"Lato", sans-serif',
};

export const fontSize: FontSize = {
  baseFontSize: "10px",
  bodyFontSize: "1.5rem",
  smallBodyFontSize: "1.25rem",
  h1FontSize: "3rem",
  h2FontSize: "2.5rem",
  h3FontSize: "2rem",
  h4FontSize: "1.75rem",
  formInputFontSize: "1.5rem",
};

export const rawColors: RawColors = {
  lightRed: "#F7C6C3",
  red: "#C13B34",
  darkRed: "#A8352F",
  roseOrange: "#E26A6A",
  yellow: "#FFFAA0",
  green: "#7FEF9D",
  teal: "#5CA4A9",
  lightBlue: "#92BEE8",
  blue: "#6399CC",
  darkBlue: "#5585B2",
  greenGray: "#EDF3F2",
  darkGreenGray: "#769893",
  gray: "#595959",
  lightGray: "#E5E5E5",
  disabledGray: "#A9A9A9",
  white: "#FCFCFC",
};
const {
  lightRed,
  red,
  darkRed,
  roseOrange,
  yellow,
  green,
  teal,
  lightBlue,
  blue,
  darkBlue,
  greenGray,
  darkGreenGray,
  gray,
  lightGray,
  disabledGray,
  white,
} = rawColors;

export const semanticColorsLightTheme: SemanticColors = {
  // Backgrounds
  primaryBgColor: white,
  secondaryBgColor: lightGray,
  // Text
  normalTextColor: gray,
  warningTextColor: yellow,
  errorTextColor: red,
  successTextColor: green,
  primaryHeaderColor: teal,
  secondaryHeaderColor: roseOrange,
  // Buttons
  btnPrimaryBgColor: blue,
  btnPrimaryBgHoverColor: darkBlue,
  btnPrimaryColor: white,
  btnSecondaryBgColor: white,
  btnSecondaryBgHoverColor: lightBlue,
  btnSecondaryColor: blue,
  btnSecondaryBorderColor: blue,
  btnSecondaryDangerBgColor: white,
  btnSecondaryDangerBgHoverColor: lightRed,
  btnSecondaryDangerColor: red,
  btnSecondaryDangerBorderColor: red,
  btnDangerBgColor: red,
  btnDangerBgHoverColor: darkRed,
  btnDangerColor: white,
  btnSecondaryBorderDisabledColor: disabledGray,
  btnSecondaryDisabledColor: disabledGray,
  btnDisabledBgColor: disabledGray,
  // Icons
  iconBgColor: greenGray,
  iconColor: darkGreenGray,
  // Forms
  inputBorderDefaultColor: lightGray,
  inputBorderErrorColor: red,
};

// TODO: finish dark theme styles
export const semanticColorsDarkTheme: SemanticColors = {
  // Backgrounds
  primaryBgColor: white,
  secondaryBgColor: lightGray,
  // Text
  normalTextColor: gray,
  warningTextColor: yellow,
  errorTextColor: red,
  successTextColor: green,
  primaryHeaderColor: teal,
  secondaryHeaderColor: roseOrange,
  // Buttons
  btnPrimaryBgColor: blue,
  btnPrimaryBgHoverColor: darkBlue,
  btnPrimaryColor: white,
  btnDangerBgColor: red,
  btnDangerBgHoverColor: darkRed,
  btnDangerColor: white,
  btnDisabledBgColor: disabledGray,
  btnSecondaryBgColor: white,
  btnSecondaryBgHoverColor: lightBlue,
  btnSecondaryColor: blue,
  btnSecondaryBorderColor: blue,
  btnSecondaryDangerBgColor: white,
  btnSecondaryDangerBgHoverColor: lightRed,
  btnSecondaryDangerColor: red,
  btnSecondaryDangerBorderColor: red,
  btnSecondaryBorderDisabledColor: disabledGray,
  btnSecondaryDisabledColor: disabledGray,
  // Icons
  iconBgColor: greenGray,
  iconColor: darkGreenGray,
  // Forms
  inputBorderDefaultColor: lightGray,
  inputBorderErrorColor: red,
};

export const formsLightTheme: Forms = {
  inputBoxShadow: "0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)",
  inputFocusShadow: `0 0 0 3px ${lightBlue}`,
  inputBorderWidth: "1px",
  inputBorderRadius: "0.25rem",
  inputPadding: "1.25rem 1rem",
};

// TODO: finish dark theme styles
export const formsDarkTheme: Forms = {
  inputBoxShadow: "0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)",
  inputFocusShadow: `0 0 0 3px ${lightBlue}`,
  inputBorderWidth: "1px",
  inputBorderRadius: "0.25rem",
  inputPadding: "1.25rem 1rem",
};

export const culdevateLightTheme: CuldevateTheme = {
  fontFamily,
  fontSize,
  rawColors,
  semanticColors: semanticColorsLightTheme,
  forms: formsLightTheme,
};

export const culdevateDarkTheme: CuldevateTheme = {
  fontFamily,
  fontSize,
  rawColors,
  semanticColors: semanticColorsDarkTheme,
  forms: formsDarkTheme,
};

interface CuldevateThemes {
  light: CuldevateTheme;
  dark: CuldevateTheme;
}

export const culdevateThemes: CuldevateThemes = {
  light: culdevateLightTheme,
  dark: culdevateDarkTheme,
};
