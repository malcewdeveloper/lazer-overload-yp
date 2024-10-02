import dotenv from "dotenv";

dotenv.config();

export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
    setupFilesAfterEnv: ["./jest.setup.ts"],
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "babel-jest",
    },
    globals: {
        /* eslint-disable no-undef */
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
};
