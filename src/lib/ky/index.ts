import ky from 'ky';
import { getApiBaseUrl } from '../../base/helpers/getApiBaseUrl.ts';

export const apiBaseUrl = getApiBaseUrl();

export const api = ky.create({
    prefixUrl: apiBaseUrl,
});
