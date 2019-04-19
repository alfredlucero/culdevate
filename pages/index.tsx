import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { culdevateDefaultTheme } from "../components/defaultTheme";

const CuldevateApp: React.FC<{}> = () => {
  const someObject = {
    test: "test",
  };
  console.log(someObject);

  return (
    <ThemeProvider theme={culdevateDefaultTheme}>
      <Title isBlue>Culdevate App</Title>
    </ThemeProvider>
  );
};

interface TitleProps {
  isBlue: boolean;
}

const Title = styled.h1<TitleProps>`
  color: ${props => (props.isBlue ? props.theme.colors.primary : props.theme.colors.secondary)};
`;

export default CuldevateApp;
