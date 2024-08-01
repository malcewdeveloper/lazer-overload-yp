import axios, { CreateAxiosDefaults } from "axios";

const baseConfig: CreateAxiosDefaults = {
    withCredentials: true,
};

const serverConfig: CreateAxiosDefaults = {
    ...baseConfig,
    baseURL: `http://localhost:${__SERVER_PORT__}`,
};

export const serverApi = axios.create(serverConfig);

const authConfig: CreateAxiosDefaults = {
    ...baseConfig,
    baseURL: `https://ya-praktikum.tech/api/v2`,
};

export const authApi = axios.create(authConfig);
