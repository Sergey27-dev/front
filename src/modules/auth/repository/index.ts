import { LoginPasswordPayload, LoginPhonePayload, LoginPhoneResponse, LoginResponse } from './types/Login.ts';
import ApiRepository from './ApiRepository.ts';
import FakeRepository from './FakeRepository.ts';
import { ValidateCodePayload } from './types/Code.ts';

export interface AuthRepository {
    login(json: LoginPasswordPayload): Promise<LoginResponse>;
    phoneLogin(json: LoginPhonePayload): Promise<LoginPhoneResponse>;
    validateCode(json: ValidateCodePayload): Promise<LoginResponse>;
}

export enum Endpoints {
    Login = 'users/login',
    PhoneLogin = 'users/phone-login',
    ValidateCode = 'users/validate-code',
}

export function useAuthRepository(fake?: false): ApiRepository;
export function useAuthRepository(fake: true): FakeRepository;
export function useAuthRepository(fake: boolean = false): AuthRepository {
    return new (fake ? FakeRepository : ApiRepository)();
}
