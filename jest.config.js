/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["types", "index.ts"],
};
