import { getUserLanguage } from '@/helpers/helpers';

const values = {
    emptyText: {
        ru: 'Добавьте первый город в настройках',
        en: 'Add first city in settings',
    },

    inputPlaceholder: {
        ru: 'Добавить город',
        en: 'Add city',
    },

    inputAddError: {
        ru: 'Этот город уже добавлен',
        en: 'This city is on the list',
    },
};

const translate = (key) => {
    const keys = Object.keys(values);
    if (!keys.includes(key)) return '';
    return values[key][getUserLanguage()] || '';
};

export default translate;
