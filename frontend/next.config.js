// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTypescript = require("@zeit/next-typescript");

module.exports = withTypescript({
  // Each page will be built as an individual serverless lambda
  target: "serverless",
});
