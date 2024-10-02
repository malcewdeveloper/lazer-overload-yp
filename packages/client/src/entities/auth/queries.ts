import { AxiosRequestConfig } from "axios";
import { authApi } from "../../service";
import {
    TGetClientIdRequest,
    TGetClientResponce,
    TGetMeReponce,
    TSigInRequest,
    TSignInOAuth,
    TSignUpResponce,
    TSigUpRequest,
} from "./types";

export const signIn = (data: TSigInRequest, config?: AxiosRequestConfig) => {
    return authApi.post<void>("/auth/signin", data, config);
};

export const signUp = (data: TSigUpRequest, config?: AxiosRequestConfig) => {
    return authApi.post<TSignUpResponce>("/auth/signup", data, config);
};

export const signOut = (config?: AxiosRequestConfig) => {
    return authApi.post<void>("/auth/logout", config);
};

export const getMe = (config?: AxiosRequestConfig) => {
    return authApi.get<TGetMeReponce>("/auth/user", config);
};

export const getClientId = (
    params?: TGetClientIdRequest,
    config?: AxiosRequestConfig,
) => {
    return authApi.get<TGetClientResponce>("/oauth/yandex/service-id", {
        ...config,
        params,
    });
};

export const signInOAuth = (
    data?: TSignInOAuth,
    config?: AxiosRequestConfig,
) => {
    return authApi.post<TGetClientResponce>("/oauth/yandex", data, config);
};
