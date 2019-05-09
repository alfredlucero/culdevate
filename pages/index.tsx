import React from "react";
import { ThemeProvider } from "styled-components";
import { culdevateDefaultTheme } from "../components/defaultTheme";

const CuldevateApp: React.FC<{}> = () => {
  const someObject = {
    test: "test",
  };
  console.log(someObject);

  return (
    <ThemeProvider theme={culdevateDefaultTheme}>
      <h1>Culdevate</h1>
    </ThemeProvider>
  );
};

export default CuldevateApp;
