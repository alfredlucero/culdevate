import { configure, addDecorator } from "@storybook/react";
import { jsxDecorator } from 'storybook-addon-jsx';

addDecorator(jsxDecorator);

const req = require.context("../components", true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
