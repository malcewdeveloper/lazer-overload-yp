import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { postLeaderboard, postLeaderboards } from "./queries";
import { TPostLeaderboardResponce, TPostLeaderboardsRequest } from "./types";
import { AxiosRequestConfig, isAxiosError } from "axios";
import { TAuthError } from "../../service";
import { notification } from "antd";

type TLeaderboardActions = {
    postLeaderboard: (
        data: TPostLeaderboardResponce,
        config?: AxiosRequestConfig,
    ) => Promise<void>;

    postLeaderboards: (
        data: TPostLeaderboardsRequest,
        config?: AxiosRequestConfig,
    ) => Promise<void>;
};

type TInitialState = {
    leaders: unknown[];
};

export const initialState = {
    leaders: [],
};

export const useLeaderboardStore = create<
    TLeaderboardActions & TInitialState
>()(
    devtools(
        (set) => ({
            ...initialState,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            postLeaderboard: async (data, config) => {
                // eslint-disable-next-line no-useless-catch
                try {
                    const reponce = await postLeaderboard(data, config);

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

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            postLeaderboards: async (data, config) => {
                // eslint-disable-next-line no-useless-catch
                try {
                    const responce = await postLeaderboards(data, config);

                    set((store) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        store.leaders = data;
                        return store;
                    });

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
        }),
        { name: "Leaderboard store" },
    ),
);
