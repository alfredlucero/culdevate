module.exports = {
  // The root of your source code; `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>/src"],

  // Jest transformations -- this adds support for TypeScript using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Adds special extended assertions to Jest
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],

  // Test spec file resolution pattern
  // Should match files ending with .test.ts, .test.tsx, .test.js, .test.jsx
  testMatch: ["**/?(*.)(test).(j|t)s?(x)"],

  // Ignores looking into node_modules for test files
  testPathIgnorePatterns: ["/node_modules/"],

  // ts-jest used as the base for Jest's configuration
  preset: "ts-jest",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Stubbing out file imports like .css files
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
  },

  // Set URL for jsdom environment for us to access location.href
  testURL: "http://localhost/",
};
