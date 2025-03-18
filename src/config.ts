import defaultConfig from './default.config.json';
import appConfigRaw from '../app.config.json';

const deepMerge = (target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> => {
    if (typeof target !== 'object' || typeof source !== 'object' || target === null || source === null) {
        return source;
    }

    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key] || typeof target[key] !== 'object') {
                target[key] = {};
            }
            deepMerge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
        } else {
            target[key] = source[key];
        }
    }

    return target;
};

if (!defaultConfig || !appConfigRaw) {
    console.error('Config files are not properly loaded');
}

const appConfig = deepMerge(defaultConfig, appConfigRaw);

const requiredKeys = ['i18n', 'defaultLanguage', 'targetLanguage'];

requiredKeys.forEach((key) => {
    if (!appConfig[key]) {
        console.error(`app.config.json should contain the "${key}" key`);
    }
});

export default appConfig;
