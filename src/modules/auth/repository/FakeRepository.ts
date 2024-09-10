import { LoginPasswordPayload, LoginPhonePayload, LoginPhoneResponse, LoginResponse } from './types/Login.ts';
import { AuthRepository } from './';
import { api } from '@src/lib/ky';
import { Endpoints } from './';
import { ValidateCodePayload } from './types/Code.ts';
import { FailResponse } from '@src/base/repositories';

export default class FakeRepository implements AuthRepository {
    public async login(json: LoginPasswordPayload): Promise<LoginResponse> {
        return api
            .extend({
                hooks: {
                    beforeRequest: [
                        () => {
                            let status = 422;
                            let responseJson: LoginResponse | FailResponse = {
                                success: false,
                                message: 'Неверные имя пользователя или пароль',
                            };

                            if (json.username === 'admin' && json.password === 'admin') {
                                status = 200;
                                responseJson = {
                                    data: {
                                        token: 'Fake',
                                    },
                                };
                            }

                            return new Response(JSON.stringify(responseJson), { status });
                        },
                    ],
                },
            })
            .post(Endpoints.Login, { json })
            .json<LoginResponse>();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async phoneLogin(json: LoginPhonePayload): Promise<LoginPhoneResponse> {
        return api
            .extend({
                hooks: {
                    beforeRequest: [
                        () => {
                            let status = 422;
                            let responseJson: LoginPhoneResponse | FailResponse = {
                                success: false,
                                message: 'Номер не существует в системе',
                            };

                            if (json.phone === '8888') {
                                status = 200;
                                responseJson = {
                                    success: true,
                                };
                            }

                            return new Response(JSON.stringify(responseJson), { status });
                        },
                    ],
                },
            })
            .post(Endpoints.PhoneLogin, { json })
            .json<LoginPhoneResponse>();
    }

    public async validateCode(json: ValidateCodePayload): Promise<LoginResponse> {
        return api
            .extend({
                hooks: {
                    beforeRequest: [
                        () => {
                            let status = 422;
                            let responseJson: LoginResponse | FailResponse = {
                                success: false,
                                message: 'Неверный код',
                            };

                            if (json.code === '1111') {
                                responseJson = {
                                    data: {
                                        token: 'Fake',
                                    },
                                };
                                status = 200;
                            }

                            return new Response(JSON.stringify(responseJson), { status });
                        },
                    ],
                },
            })
            .post(Endpoints.ValidateCode, { json })
            .json<LoginResponse>();
    }
}
