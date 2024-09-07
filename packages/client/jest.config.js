const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
    globals: {
        /* eslint-disable no-undef */
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
};
