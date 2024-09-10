import ky, { HTTPError } from 'ky';
import { getApiBaseUrl } from '../../base/helpers/getApiBaseUrl.ts';
import { ElNotification } from 'element-plus';

export const apiBaseUrl = getApiBaseUrl();

export const api = ky.create({
    prefixUrl: apiBaseUrl,

    hooks: {
        beforeError: [
            async (error: HTTPError) => {
                const { response }: { response: Response } = error;

                /**
                 * response.clone() фиксит ошибку
                 * Failed to execute 'json' on 'Response': body stream already read
                 */
                const json = await new Response(response.clone().body).json();

                if (json.message) {
                    ElNotification({
                        title: 'Request Error',
                        type: 'error',
                        message: json.message,
                    });
                }

                return error;
            },
        ],

        afterResponse: [
            async (_request, _options, response) => {
                if (!response.ok) {
                    return;
                }

                const json = await new Response(response.body).json();

                if (json.message) {
                    ElNotification({
                        message: json.message,
                    });
                }
            },
        ],
    },
});
