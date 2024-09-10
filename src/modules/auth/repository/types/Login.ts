export interface LoginPasswordPayload {
    username: string;
    password: string;
}

export interface LoginPhonePayload {
    phone: string;
}

export interface LoginResponse {
    readonly data: {
        readonly token: string;
    };
}

export interface LoginPhoneResponse {
    readonly success: boolean;
}
