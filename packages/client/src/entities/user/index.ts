import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getUser } from "./queries";
import { TGetUserResponse } from "./types";
import { AxiosRequestConfig } from "axios";

type TUserData = {
    name: string;
    secondName: string;
};

type TUserState = {
    data: TUserData | null;
    isLoading: boolean;
};

type TUserActions = {
    getUser: (
        config?: AxiosRequestConfig,
    ) => Promise<TGetUserResponse | undefined>;
};

type TUserStore = TUserActions & TUserState;

const initialState: TUserState = {
    data: null,
    isLoading: false,
};

export const useUserStore = create<TUserStore>()(
    devtools(
        (set) => ({
            ...initialState,
            getUser: async (config) => {
                set((store) => {
                    store.isLoading = true;
                    return store;
                });

                // eslint-disable-next-line no-useless-catch
                try {
                    const response = await getUser(config);
                    const { data } = response;

                    set((store) => {
                        store.data = data;
                        store.isLoading = false;
                        return store;
                    });

                    return data;
                } catch (error: unknown) {
                    throw error;
                }
            },
        }),
        { name: "User store" },
    ),
);
