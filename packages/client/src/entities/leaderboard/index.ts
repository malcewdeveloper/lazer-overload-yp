import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { postLeaderboard, postLeaderboards } from "./queries";
import { TPostLeaderboardResponce, TPostLeaderboardsRequest } from "./types";
import { AxiosRequestConfig } from "axios";

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

export const initialState = {
    leaders: [],
};

export const useAuthStore = create<TLeaderboardActions>()(
    devtools(
        (set) => ({
            ...initialState,
            postLeaderboard: async (data, config) => {
                // eslint-disable-next-line no-useless-catch
                try {
                    const reponce = await postLeaderboard(data, config);

                    return reponce.data;
                } catch (error: unknown) {
                    throw error;
                }
            },

            postLeaderboards: async (data, config) => {
                // eslint-disable-next-line no-useless-catch
                try {
                    const responce = await postLeaderboards(data, config);

                    set((store) => {
                        store.leaders = data;
                        return store;
                    });

                    return responce.data;
                } catch (error: unknown) {
                    throw error;
                }
            },
        }),
        { name: "Leaderboard store" },
    ),
);
