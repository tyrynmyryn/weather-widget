import { createStore } from 'vuex';
import {
    objToQuery,
    setlLocalStorage,
    getLocalStorageItem,
    getUserLanguage,
} from '../helpers/helpers';
import translate from '../helpers/translate';

const LOCAL_STORAGE_KEY = 'weater-widget-data';
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const defaultQueryObject = {
    appid: API_KEY,
    lang: getUserLanguage(),
    units: 'metric',
};

const dataParseToItem = (data) => {
    return {
        id: data.id,
        city: data.name,
        temp: Math.round(data.main.temp),
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        description: data.weather[0].description,
        timezone: data.timezone,
        timeOfDay: data.weather[0].icon.includes('n') ? 'night' : 'day',
    };
};

const store = createStore({
    state: () => ({
        data: [],
        userLanguage: getUserLanguage(),
        activeScreen: 'weather',
        newCity: '',
        loading: {
            main: true,
            add: true,
        },
        errors: {
            addCity: '',
        },
    }),

    mutations: {
        setData(state, payload) {
            state.data = payload;
        },

        setScreen(state, payload) {
            state.activeScreen = payload;
        },

        setNewCityValue(state, payload) {
            state.newCity = payload;
        },

        setError(state, payload) {
            state.errors = payload;
        },

        setLoading(state, payload) {
            state.loading = payload;
        },
    },

    actions: {
        async initAction({ state, commit, dispatch }) {
            const data = getLocalStorageItem('weater-widget-data');
            if (data && data.length) {
                const cityNames = data.map((item) => item.city);

                for (let i = 0; i < cityNames.length; i++) {
                    commit('setNewCityValue', cityNames[i]);
                    await dispatch('addCity');
                    commit('setNewCityValue', '');
                }
            } else {
                navigator.geolocation.getCurrentPosition((location) => {
                    dispatch('fetchUserCity', location);
                });
            }
            dispatch('resetLoading');
            commit('setError', {});
        },

        updateData({ state, commit, dispatch }, payload) {
            commit('setData', payload);
            setlLocalStorage(LOCAL_STORAGE_KEY, state.data);
        },

        onDelete({ state, commit, dispatch }, payload) {
            dispatch(
                'updateData',
                state.data.filter((item) => item.id !== payload.id)
            );
        },

        async addCity({ state, commit, dispatch }) {
            const currentCityNames = state.data.reduce((acc, city) => {
                return [...acc, city.city];
            }, []);

            if (currentCityNames.includes(state.newCity)) {
                commit('setError', {
                    ...state.errors,
                    addCity: translate('inputAddError'),
                });
                return;
            }

            const query = objToQuery({
                ...defaultQueryObject,
                q: state.newCity,
            });

            commit('setLoading', { ...state.loading, add: true });

            const res = await fetch(API_URL + query);
            const data = await res.json();
            if (res.ok) {
                if (currentCityNames.includes(data.name)) {
                    commit('setError', {
                        ...state.errors,
                        addCity: translate('inputAddError'),
                    });
                } else {
                    dispatch('updateData', [
                        ...state.data,
                        dataParseToItem(data),
                    ]);
                }
            } else {
                commit('setError', { ...state.errors, addCity: data.message });
            }
            commit('setLoading', { ...state.loading, add: false });
        },

        async fetchUserCity({ state, commit, dispatch }, location) {
            const { latitude, longitude } = location?.coords;
            const query = objToQuery({
                ...defaultQueryObject,
                lat: latitude,
                lon: longitude,
            });

            const res = await fetch(API_URL + query);
            const data = await res.json();

            dispatch('updateData', [dataParseToItem(data)]);
        },

        resetLoading({ state, commit }) {
            const reseted = Object.keys(state.loading).reduce((acc, key) => {
                return { ...acc, [key]: false };
            }, {});
            commit('setLoading', reseted);
        },
    },
});

export default store;
