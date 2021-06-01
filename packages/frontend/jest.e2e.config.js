module.exports = {
  preset: "jest-playwright-preset",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  roots: ["<rootDir>/src"],
  // Test spec file resolution pattern
  // Should match files ending with .e2e.ts, .e2e.js,
  testMatch: ["**/*.e2e.(j|t)s"],

  // Ignores looking into node_modules for test files
  testPathIgnorePatterns: ["/node_modules/"],

  setupFilesAfterEnv: ["expect-playwright"],
};
