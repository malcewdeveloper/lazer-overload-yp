import { AxiosRequestConfig } from "axios";
import { authApi } from "../../service";
import { TPostLeaderboardResponce, TPostLeaderboardsRequest } from "./types";

export const postLeaderboard = (
    data: TPostLeaderboardResponce,
    config?: AxiosRequestConfig,
) => {
    return authApi.post<TPostLeaderboardResponce>("/leaderboard", data, config);
};

export const postLeaderboards = (
    data: TPostLeaderboardsRequest,
    config?: AxiosRequestConfig,
) => {
    return authApi.post<TPostLeaderboardsRequest>(
        "/leaderboard/all",
        data,
        config,
    );
};
