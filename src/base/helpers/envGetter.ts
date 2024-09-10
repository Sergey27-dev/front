export function getEnvParam(param: keyof ImportMetaEnv, required?: false): string | undefined;
export function getEnvParam(param: keyof ImportMetaEnv, required: true): string;
export function getEnvParam(param: keyof ImportMetaEnv, required: boolean = false) {
    const envParam: string | undefined = import.meta.env[param];

    if (required && envParam === undefined) {
        throw new Error(`Env param ${param} is undefined`);
    }

    return envParam;
}
