import { AxiosRequestConfig } from "axios";
import { authApi } from "../../service";
import {
    TChangeProfileRequest,
    TChangePasswordResponce,
    TChangePasswordRequest,
    TChangeProfileResponce,
} from "./types";

export const changePassword = (
    data: TChangePasswordResponce,
    config?: AxiosRequestConfig,
) => {
    return authApi.put<TChangePasswordRequest>("/user/password", data, config);
};

export const changeProfile = (
    data: TChangeProfileResponce,
    config?: AxiosRequestConfig,
) => {
    return authApi.put<TChangeProfileRequest>("/user/profile", data, config);
};
