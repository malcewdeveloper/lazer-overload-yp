export type TSigInRequest = {
    login: string;
    password: string;
};

export type TSigUpRequest = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export type TSignUpResponce = {
    id: number;
};

export type TGetMeReponce = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
};

export type TGetClientIdRequest = {
    redirect_uri?: string;
};

export type TGetClientResponce = {
    service_id: string;
};

export type TSignInOAuth = {
    code?: string;
    redirect_uri?: string;
};
