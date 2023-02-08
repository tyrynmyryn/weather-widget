export const objToQuery = (obj) => {
    let queryString = '';
    const keys = Object.keys(obj);
    keys.forEach((key, i) => {
        i === 0
            ? (queryString += `?${key}=${obj[key]}`)
            : (queryString += `&${key}=${obj[key]}`);
    });
    return queryString;
};

export const setlLocalStorage = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item));
};

export const getLocalStorageItem = (name) => {
    return JSON.parse(localStorage.getItem(name));
};

export const getUserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.split('-')[0] || 'en';
};

export const getCurrentDate = (utcOffset = 0) => {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + utcOffset * 1000);
    const time = localTime.toLocaleTimeString();

    const dateValue =
        localTime
            .toLocaleString(getUserLanguage(), { month: 'long' })
            .slice(0, 3) +
        '. ' +
        localTime.getDate() +
        ' ' +
        localTime.getFullYear();

    return [time, dateValue];
};
