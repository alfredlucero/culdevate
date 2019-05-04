import styled from "styled-components";
import { culdevateDefaultTheme } from "../../defaultTheme";

const H1 = styled.h1`
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.fonts.headerFontFamily};
  font-size: 3rem;
  line-height: 2;
  color: ${props => props.theme.colors.teal};
`;

H1.defaultProps = {
  theme: culdevateDefaultTheme,
};

const H2 = styled.h2`
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.fonts.headerFontFamily};
  font-size: 2.5rem;
  line-height: 2;
  color: ${props => props.theme.colors.teal};
`;

H2.defaultProps = {
  theme: culdevateDefaultTheme,
};

const H3 = styled.h3`
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.fonts.headerFontFamily};
  font-size: 2rem;
  line-height: 2;
  color: ${props => props.theme.colors.teal};
`;

H3.defaultProps = {
  theme: culdevateDefaultTheme,
};

const H4 = styled.h4`
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.fonts.headerFontFamily};
  font-size: 1.75rem;
  line-height: 2;
  color: ${props => props.theme.colors.orange};
`;

H4.defaultProps = {
  theme: culdevateDefaultTheme,
};

interface PProps {
  small?: boolean;
}

const P = styled.p<PProps>`
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.fonts.bodyFontFamily};
  font-size: ${props => (props.small ? "1.25rem" : "1.5rem")};
  line-height: 1.5;
  color: ${props => props.theme.colors.gray};
`;

P.defaultProps = {
  theme: culdevateDefaultTheme,
};

export { P, H1, H2, H3, H4 };
