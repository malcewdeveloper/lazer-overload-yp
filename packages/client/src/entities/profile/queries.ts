import { AxiosRequestConfig } from "axios";
import { authApi } from "../../service";
import {
    TChangeProfileRequest,
    TChangePasswordResponce,
    TChangePasswordRequest,
    TChangeProfileResponce,
} from "./types";

export const changePassword = (
    data: TChangePasswordRequest,
    config?: AxiosRequestConfig,
) => {
    return authApi.put<TChangePasswordResponce>("/user/password", data, config);
};

export const changeProfile = (
    data: TChangeProfileRequest,
    config?: AxiosRequestConfig,
) => {
    return authApi.put<TChangeProfileResponce>("/user/profile", data, config);
};

export const changeAvatar = (data: File, config?: AxiosRequestConfig) => {
    const form = new FormData();
    form.append("avatar", data);
    return authApi.put<TChangeProfileResponce>(
        "/user/profile/avatar",
        form,
        config,
    );
};
