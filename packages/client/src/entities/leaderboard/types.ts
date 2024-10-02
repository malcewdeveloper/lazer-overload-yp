export type TPostLeaderboardResponce = {
    data: {
        myField: string;
        otherField: number;
    };
};

export interface TPostLeaderboardsRequest {
    ratingFieldName: string;
    cursor: number;
    limit: number;
}
