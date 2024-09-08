import dotenv from "dotenv";
dotenv.config();

export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
    globals: {
        /* eslint-disable no-undef */
        __SERVER_PORT__: process.env.SERVER_PORT,
        __EXTERNAL_SERVER_URL__: process.env.EXTERNAL_SERVER_URL,
        __INTERNAL_SERVER_URL__: process.env.INTERNAL_SERVER_URL,
    },
};
