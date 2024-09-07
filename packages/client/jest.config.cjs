import dotenv from "dotenv";
dotenv.config();

export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
    globals: {
        /* eslint-disable no-undef */
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
};
