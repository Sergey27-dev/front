export interface FailResponse {
    readonly success: false;
    readonly message: string;
    readonly data?: object;
}
