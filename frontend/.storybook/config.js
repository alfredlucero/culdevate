import { configure } from "@storybook/react";

// Loads all the stories underneath src folder that match *.stories.(js|jsx|ts|tsx) files
configure(require.context("../src", true, /\.stories\.(j|t)sx?$/), module);
