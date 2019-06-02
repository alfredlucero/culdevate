export interface CuldevateTheme {
  fontFamily: FontFamily;
  fontSize: FontSize;
  rawColors: RawColors;
  semanticColors: SemanticColors;
  forms: Forms;
}

export interface FontFamily {
  headerFontFamily: string;
  bodyFontFamily: string;
}

export interface FontSize {
  baseFontSize: string;
  bodyFontSize: string;
  smallBodyFontSize: string;
  h1FontSize: string;
  h2FontSize: string;
  h3FontSize: string;
  h4FontSize: string;
  formInputFontSize: string;
}

export interface RawColors {
  lightRed: string;
  red: string;
  darkRed: string;
  roseOrange: string;
  yellow: string;
  green: string;
  teal: string;
  lightBlue: string;
  blue: string;
  darkBlue: string;
  greenGray: string;
  darkGreenGray: string;
  gray: string;
  lightGray: string;
  disabledGray: string;
  white: string;
}

export interface SemanticColors {
  // Backgrounds
  primaryBgColor: string;
  secondaryBgColor: string;
  // Text
  normalTextColor: string;
  warningTextColor: string;
  errorTextColor: string;
  successTextColor: string;
  primaryHeaderColor: string;
  secondaryHeaderColor: string;
  // Buttons
  btnPrimaryBgColor: string;
  btnPrimaryBgHoverColor: string;
  btnPrimaryColor: string;
  btnDangerBgColor: string;
  btnDangerBgHoverColor: string;
  btnDangerColor: string;
  btnDisabledBgColor: string;
  btnSecondaryBgColor: string;
  btnSecondaryBgHoverColor: string;
  btnSecondaryColor: string;
  btnSecondaryBorderColor: string;
  btnSecondaryDangerBgColor: string;
  btnSecondaryDangerBgHoverColor: string;
  btnSecondaryDangerColor: string;
  btnSecondaryDangerBorderColor: string;
  btnSecondaryBorderDisabledColor: string;
  btnSecondaryDisabledColor: string;
  // Icons
  iconBgColor: string;
  iconColor: string;
  // Forms
  inputBorderDefaultColor: string;
  inputBorderErrorColor: string;
}

export interface Forms {
  inputBoxShadow: string;
  inputFocusShadow: string;
  inputBorderRadius: string;
  inputBorderWidth: string;
  inputPadding: string;
}
