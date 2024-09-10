import { getEnvParam } from '@src/base/helpers/envGetter.ts';

export const protocol: string = getEnvParam('VITE_API_PROTOCOL') ?? 'http';

export const host: string = getEnvParam('VITE_API_HOST', true);

export const path: string = getEnvParam('VITE_API_PATH') ?? '';

export const getApiBaseUrl = (): URL => {
    return new URL(path, `${protocol}://${host}`);
};
