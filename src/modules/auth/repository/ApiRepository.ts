import { LoginPasswordPayload, LoginPhonePayload, LoginPhoneResponse, LoginResponse } from './types/Login.ts';
import { api } from '@src/lib/ky';
import { ValidateCodePayload } from './types/Code.ts';
import { AuthRepository, Endpoints } from './index.ts';

export default class ApiRepository implements AuthRepository {
    public async login(json: LoginPasswordPayload) {
        return api.post(Endpoints.Login, { json }).json<LoginResponse>();
    }

    public async phoneLogin(json: LoginPhonePayload) {
        return api.post(Endpoints.PhoneLogin, { json }).json<LoginPhoneResponse>();
    }

    public async validateCode(json: ValidateCodePayload) {
        return api.post(Endpoints.ValidateCode, { json }).json<LoginResponse>();
    }
}
