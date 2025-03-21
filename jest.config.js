export default {
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx"],
    moduleDirectories: ["node_modules", "src"],
    modulePathIgnorePatterns: ["ui-tests"]

  };