import config from '../config';

export type setQandALangsReturnType = { q: string, a: string };

export const setQandALangs = (qlang: string): setQandALangsReturnType => {
    return qlang === 'default'
        ? { q: config.defaultLanguage, a: config.targetLanguage }
        : { q: config.targetLanguage, a: config.defaultLanguage };
};
