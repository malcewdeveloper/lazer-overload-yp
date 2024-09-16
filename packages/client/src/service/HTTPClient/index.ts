import axios, { CreateAxiosDefaults } from "axios";
import QueryString from "qs";

const baseConfig: CreateAxiosDefaults = {
    withCredentials: true,
    paramsSerializer: (params) => QueryString.stringify(params),
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
