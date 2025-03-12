import defaultConfig from './default.config.json';
import appConfigRaw from '../app.config.json';

const deepMerge = (target: any, source: any): any => {
    if (typeof target !== 'object' || typeof source !== 'object') return source;

    for (const key in source) {
        if (source[key] && typeof source[key] === 'object') {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
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
