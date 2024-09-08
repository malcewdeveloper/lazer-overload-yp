import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getMe, signIn, signOut, signUp } from "./queries";
import {
    TGetMeReponce,
    TSigInRequest,
    TSignUpResponce,
    TSigUpRequest,
} from "./types";
import { routes, TAuthError } from "../../service";
import { AxiosRequestConfig, isAxiosError, isCancel } from "axios";
import { notification } from "antd";

type TAuthActions = {
    signIn: (data: TSigInRequest, config?: AxiosRequestConfig) => Promise<void>;
    signUp: (
        data: TSigUpRequest,
        config?: AxiosRequestConfig,
    ) => Promise<TSignUpResponce | undefined>;
    signOut: (config?: AxiosRequestConfig) => Promise<void>;
    getMe: (config?: AxiosRequestConfig) => Promise<TGetMeReponce | undefined>;
};

type TAuthData = {
    me?: TGetMeReponce;
};

type TAuthStore = TAuthActions & TAuthData;

const initialState: TAuthData = {
    me: undefined,
};

export const useAuthStore = create<TAuthStore>()(
    devtools(
        (set, get) => ({
            ...initialState,
            signIn: async (data, config) => {
                try {
                    const reponce = await signIn(data, config);
                    await get().getMe(config);

                    return reponce.data;
                } catch (error: unknown) {
                    if (isAxiosError<TAuthError>(error)) {
                        notification.error({
                            message: error.response?.data.reason,
                        });
                    } else {
                        console.log(error);
                    }

                    throw error;
                }
            },
            signUp: async (data, config) => {
                try {
                    const reponce = await signUp(data, config);
                    await get().getMe();

                    return reponce.data;
                } catch (error: unknown) {
                    if (isCancel(error)) {
                        return;
                    }

                    if (isAxiosError<TAuthError>(error)) {
                        notification.error({
                            message: error.response?.data.reason,
                        });
                    } else {
                        console.log(error);
                    }

                    throw error;
                }
            },
            signOut: async (config) => {
                try {
                    const responce = await signOut(config);

                    set((store) => {
                        store.me = initialState.me;
                        return store;
                    });

                    // history.push(routes.signIn.path);

                    return responce.data;
                } catch (error: unknown) {
                    if (isAxiosError<TAuthError>(error)) {
                        notification.error({
                            message: error.response?.data.reason,
                        });
                    } else {
                        console.log(error);
                    }

                    throw error;
                }
            },
            getMe: async (config) => {
                // eslint-disable-next-line no-useless-catch
                try {
                    const responce = await getMe(config);
                    const { data } = responce;

                    set((store) => {
                        store.me = data;
                        return store;
                    });

                    return data;
                } catch (error: unknown) {
                    throw error;
                }
            },
        }),
        { name: "Auth store" },
    ),
);
