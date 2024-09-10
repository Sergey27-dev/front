import { LoginPasswordPayload, LoginPhonePayload, LoginPhoneResponse, LoginResponse } from './types/Login.ts';
import ApiRepository from './ApiRepository.ts';
import { ValidateCodePayload } from './types/Code.ts';

export interface AuthRepository {
    authByGithub(): Promise<string>;
    login(json: LoginPasswordPayload): Promise<LoginResponse>;
    phoneLogin(json: LoginPhonePayload): Promise<LoginPhoneResponse>;
    validateCode(json: ValidateCodePayload): Promise<LoginResponse>;
}

export enum Endpoints {
    Login = 'users/login',
    PhoneLogin = 'users/phone-login',
    ValidateCode = 'users/validate-code',
}

export function useAuthRepository(): AuthRepository {
    return new ApiRepository();
}
