<template>
    <div
        :class="['weather-widget__main', { ['_empty']: !data || !data.length }]"
    >
        <template v-if="!loading.main">
            <template v-if="data && data.length">
                <WeatherCard v-for="item in data" :key="item.id" :card="item" />
            </template>
            <div class="weather-widget__overlay">
                <button
                    class="weather-widget__button weather-widget__setting-button"
                    @click="$emit('changeScreen', 'settings')"
                >
                    <Icons name="settings" />
                </button>
                <div
                    v-if="!data || !data.length"
                    class="weather-widget__empty-text"
                >
                    {{ emptyText }}
                </div>
            </div>
        </template>
        <div class="weather-widget__main-loader" v-else><Loader /></div>
    </div>
</template>

<script>
    import translate from '@/helpers/translate';
    import WeatherCard from '@/components/WeatherCard';
    import { mapState } from 'vuex';

    export default {
        name: 'Weather',

        components: {
            WeatherCard,
        },

        data: () => ({
            emptyText: translate('emptyText'),
        }),

        computed: {
            ...mapState({
                data: (state) => state.data,
                loading: (state) => state.loading,
            }),
        },
    };
</script>

<style lang="scss">
    .weather-widget__main {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 20px;

        &._empty {
            min-height: 200px;
        }

        &:hover,
        &._empty {
            .weather-widget__overlay {
                opacity: 1;
                z-index: 10;
                pointer-events: all;
            }
        }
    }

    .weather-widget__overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        width: calc(100% + 32px);
        height: calc(100% + 32px);
        padding: 32px 16px;
        transform: translateX(-50%) translateY(-50%);
        background: rgba(#000000, 0.5);
        border-radius: 12px;
        opacity: 0;
        pointer-events: none;
        transition: 0.2s opacity, 0.2s z-index;
        z-index: -1;

        &._empty {
            opacity: 1;
            z-index: 10;
            pointer-events: all;
        }
    }

    .weather-widget__empty-text {
        margin-top: 24px;
        font-size: 16px;
        color: #fff;
        text-align: center;
    }

    .weather-widget__setting-button {
        width: 48px;
        height: 48px;
        background-color: transparent;

        svg {
            fill: #fff;
            animation: rotate 3s infinite steps(240);
        }
    }

    .weather-widget__image {
        width: 60px;
        height: 60px;
        object-fit: cover;
    }

    .weather-widget__main-loader {
        width: 50px;
        height: 50px;
        margin: 0 auto;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>
