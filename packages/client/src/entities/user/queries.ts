import { serverApi } from "../../service";
import { AxiosRequestConfig } from "axios";
import { TGetUserResponse } from "./types";

export const getUser = (config?: AxiosRequestConfig) => {
    return serverApi.get<TGetUserResponse>("/user", config);
};
