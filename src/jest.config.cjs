/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/test/styleMock.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)",
    "<rootDir>/src/**/?(*.)+(spec|test).(ts|tsx|js|jsx)"
  ],

  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
