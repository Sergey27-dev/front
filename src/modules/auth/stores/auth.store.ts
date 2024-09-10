import { defineStore } from 'pinia';
import { LoginPasswordPayload, LoginPhonePayload, LoginResponse } from '../repository/types/Login.ts';
import { HTTPError } from 'ky';
import { ValidateCodePayload } from '../repository/types/Code.ts';
import { useAuthRepository } from '../repository';
import AuthorizationException from '../exceptions/AuthorizationException.ts';
import { FailResponse } from '@src/base/repositories';

type State = {
    token: string | null;
    loading: boolean;
    codeSent: boolean;
};

interface CodeResponse {
    sent: boolean;
    message: string;
}

export const useAuthStore = defineStore({
    id: 'auth',

    state: (): State => ({
        token: localStorage.getItem('token'),
        loading: false,
        codeSent: false,
    }),

    actions: {
        async login(payload: LoginPasswordPayload): Promise<void> {
            this.loading = true;

            try {
                const response: LoginResponse = await useAuthRepository(true)
                    .login(payload)
                    .finally(() => (this.loading = false));

                this.token = response.data.token;
                localStorage.setItem('token', this.token);
            } catch (error: unknown) {
                if (error instanceof HTTPError) {
                    const errorData: FailResponse = (await error.response.json()) as FailResponse;
                    throw new AuthorizationException(errorData.message);
                }

                throw error;
            }
        },

        async sendCode(payload: LoginPhonePayload): Promise<void> {
            this.loading = true;

            const codeResponse: CodeResponse = {
                sent: false,
                message: '',
            };

            try {
                await useAuthRepository(true)
                    .phoneLogin(payload)
                    .finally(() => (this.loading = false));

                codeResponse.sent = true;
                this.codeSent = true;
            } catch (error: unknown) {
                if (error instanceof HTTPError) {
                    const errorData: FailResponse = (await error.response.json()) as FailResponse;
                    throw new AuthorizationException(errorData.message);
                }

                throw error;
            }
        },

        async validateCode(payload: ValidateCodePayload): Promise<void> {
            this.loading = true;

            try {
                const response: LoginResponse = await useAuthRepository(true)
                    .validateCode(payload)
                    .finally(() => (this.loading = false));

                localStorage.setItem('token', (this.token = response.data.token));
                this.codeSent = false;
            } catch (error: unknown) {
                if (error instanceof HTTPError) {
                    const errorData: FailResponse = (await error.response.json()) as FailResponse;
                    throw new AuthorizationException(errorData.message);
                }

                throw error;
            }
        },

        async logout(): Promise<void> {
            localStorage.clear();
            this.token = null;
        },
    },

    getters: {
        isAuthenticated(): boolean {
            return this.token !== null;
        },

        isRequestLoading(): boolean {
            return this.loading;
        },

        isCodeSent(): boolean {
            return this.codeSent;
        },
    },
});
