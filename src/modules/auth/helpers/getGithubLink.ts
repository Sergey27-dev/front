import {getEnvParam} from "@src/base/helpers/envGetter.ts";

export const getGithubLink = () => {
    const clientId = getEnvParam('VITE_CLIENT_ID');
    // const redirectUri = getEnvParam('VITE_CURRENT_HOST') + login.path;
    const redirectUri = 'http://localhost:5173/auth/login';
    return `https://github.com/login/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user user:email`
}
