export type TChangePasswordRequest = {
    oldPassword: string;
    newPassword: string;
};

export type TChangePasswordResponce = {
    reason: string;
};

export type TChangeProfileRequest = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};
export type TChangeProfileResponce = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
};
