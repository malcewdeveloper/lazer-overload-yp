import { isAxiosError } from "axios";
import { authApi, serverApi } from ".";
import { generatePath } from "react-router-dom";
import { routes } from "../routes";

let authApiInterceptorId: number | undefined = undefined;
let serverApiInterceptorId: number | undefined = undefined;

export const setAuthInterceptors = () => {
    authApiInterceptorId = authApi.interceptors.response.use(
        (reponce) => reponce,
        (errResponce) => {
            if (!isAxiosError(errResponce)) return errResponce;

            if (errResponce.status == 401) {
                const path = generatePath(routes.error.path);
                // history.replace(path);
            }

            return errResponce;
        },
    );

    serverApiInterceptorId = serverApi.interceptors.response.use(
        (reponce) => reponce,
        (errResponce) => {
            if (!isAxiosError(errResponce)) return errResponce;

            if (errResponce.status == 401) {
                const path = generatePath(routes.error.path);
                // history.replace(path);
            }

            return errResponce;
        },
    );

    return;
};

export const removeAuthInterceptors = () => {
    serverApiInterceptorId &&
        serverApi.interceptors.response.eject(serverApiInterceptorId);

    authApiInterceptorId &&
        authApi.interceptors.response.eject(authApiInterceptorId);
};
