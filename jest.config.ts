import type { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/$1",
  },
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 60,
      functions: 60,
      lines: 60,
    },
  },
  coverageDirectory: "../coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/infra/database/typeorm/migrations/"
  ],
  testEnvironment: "node",
};

export default config;
