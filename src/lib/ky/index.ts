import ky from 'ky';
import { getApiBaseUrl } from '../../base/helpers/getApiBaseUrl.ts';
import { ElNotification } from 'element-plus';

export const apiBaseUrl = getApiBaseUrl();

export const api = ky.create({
    prefixUrl: apiBaseUrl,

    hooks: {
        afterResponse: [
            async (_request, _options, response) => {
                if (!response.ok) {
                    return;
                }

                const json = response.status === 204 ? {} : await new Response(response.body).json();

                if (json.message) {
                    ElNotification({
                        message: json.message,
                    });
                }
            },
        ],
    },
});
