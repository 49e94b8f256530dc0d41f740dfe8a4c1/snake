module.exports = {
  collectCoverage: true,
  coverageReporters: ["html", "json", "lcov"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif)$": "<rootDir>/tests/assetTransformer.js",
    ".+\\.(css|styl|less|sass|scss|png|jpg|gif|ttf|woff|woff2)$":
      "identity-obj-proxy",
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  verbose: true,
};
