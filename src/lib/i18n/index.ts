import { nextTick, WritableComputedRef } from 'vue';
import { ComposerTranslation, createI18n } from 'vue-i18n';
import type { I18n } from 'vue-i18n';
import { getEnvParam } from '@src/base/helpers/envGetter.ts';

const setupI18n = (locale: string): I18n => {
    const i18n: I18n = createI18n({
        locale,
        legacy: false,
        globalInjection: true,
    });

    loadLocaleMessages(locale).then(() => setI18nLanguage(locale));

    return i18n;
};

const setI18nLanguage = (locale: string): void => {
    const globalLocale: WritableComputedRef<string> = i18n.global.locale as WritableComputedRef<string>;

    globalLocale.value = locale;
    document.querySelector('html')?.setAttribute('lang', locale);
    localStorage.setItem('locale', locale);
};

const loadLocaleMessages = async (locale: string): Promise<void> => {
    const messages = await import(`../../base/locales/${locale}.ts`);

    for (const localeModule in messages.default.module) {
        if (!(messages.default.module[localeModule] instanceof Promise)) {
            continue;
        }

        messages.default.module[localeModule] = (await messages.default.module[localeModule]).default;
    }

    // noinspection TypeScriptValidateJSTypes
    i18n.global.setLocaleMessage(locale, messages.default);

    return nextTick();
};

export const changeLocale = async (locale: string): Promise<void> => {
    await loadLocaleMessages(locale);
    setI18nLanguage(locale);
};

export const i18n: I18n = setupI18n(
    localStorage.getItem('locale') ?? getEnvParam('VITE_DEFAULT_LOCALE', true),
);
export const $t: ComposerTranslation = i18n.global.t;
