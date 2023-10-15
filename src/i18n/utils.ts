import { UI_I18N, DEFAULT_LANGUAGE } from './ui';

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in UI_I18N) return lang as keyof typeof UI_I18N;
    return DEFAULT_LANGUAGE;
}

export function useTranslations(lang: keyof typeof UI_I18N) {
    return function t(key: keyof typeof UI_I18N[typeof DEFAULT_LANGUAGE]) {
        return UI_I18N[lang][key] || UI_I18N[DEFAULT_LANGUAGE][key];
    }
}
