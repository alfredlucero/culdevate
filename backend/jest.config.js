module.exports = {
  // Mongoose does not support jsdom and things like setTimeout won't work as expected
  // unless we set the test environment to node
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
