import styled, { css } from "styled-components";
import "../../../moduleTypes/styled-components.d.ts";
import { culdevateThemes } from "../../defaultTheme";

const H1 = styled.h1`
  margin: 0;
  padding: 0;
  line-height: 2;
  ${({ theme: { fontFamily, fontSize, semanticColors } }) => css`
    font-family: ${fontFamily.headerFontFamily};
    font-size: ${fontSize.h1FontSize};
    color: ${semanticColors.primaryHeaderColor};
  `}
`;
H1.defaultProps = {
  theme: culdevateThemes.light,
};

const H2 = styled.h2`
  margin: 0;
  padding: 0;
  line-height: 2;
  ${({ theme: { fontFamily, fontSize, semanticColors } }) => css`
    font-family: ${fontFamily.headerFontFamily};
    font-size: ${fontSize.h2FontSize};
    color: ${semanticColors.primaryHeaderColor};
  `}
`;
H2.defaultProps = {
  theme: culdevateThemes.light,
};

const H3 = styled.h3`
  margin: 0;
  padding: 0;
  line-height: 2;
  ${({ theme: { fontFamily, fontSize, semanticColors } }) => css`
    font-family: ${fontFamily.headerFontFamily};
    font-size: ${fontSize.h3FontSize};
    color: ${semanticColors.primaryHeaderColor};
  `}
`;
H3.defaultProps = {
  theme: culdevateThemes.light,
};

const H4 = styled.h4`
  margin: 0;
  padding: 0;
  line-height: 2;
  ${({ theme: { fontFamily, fontSize, semanticColors } }) => css`
    font-family: ${fontFamily.headerFontFamily};
    font-size: ${fontSize.h4FontSize};
    color: ${semanticColors.secondaryHeaderColor};
  `}
`;
H4.defaultProps = {
  theme: culdevateThemes.light,
};

interface PProps {
  small?: boolean;
}

const P = styled.p<PProps>`
  margin: 0;
  padding: 0;
  line-height: 1.5;
  ${({ small, theme: { fontFamily, fontSize, semanticColors } }) => css`
    font-family: ${fontFamily.bodyFontFamily};
    font-size: ${small ? fontSize.smallBodyFontSize : fontSize.bodyFontSize};
    color: ${semanticColors.normalTextColor};
  `}
`;
P.defaultProps = {
  theme: culdevateThemes.light,
};

export { P, H1, H2, H3, H4 };
