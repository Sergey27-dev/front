export const replaceUrlParams = (url: string, replaceParams: object): string => {
    for (const [key, value] of Object.entries(replaceParams)) {
        url = url.replace(`:${key}`, value);
    }

    return url;
};
