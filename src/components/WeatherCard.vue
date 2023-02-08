<template>
    <div :class="['weather-card', `_${card.timeOfDay}`]">
        <div class="weather-card__weather-info">
            <div class="weather-card__header">
                <img class="weather-card__icon" :src="card.icon" alt="" />
                <div class="weather-card__weather-description">
                    {{ card.description }}
                </div>
            </div>

            <div class="weather-card__temp">{{ card.temp }}°C</div>
        </div>
        <div class="weather-card__info">
            <div>
                <div class="weather-card__time">{{ time }}</div>
                <div class="weather-card__date">{{ date }}</div>
            </div>
            <div class="weather-card__city">{{ card.city }}</div>
        </div>
    </div>
</template>

<script>
    import { getCurrentDate } from '@/helpers/helpers';

    export default {
        name: 'WeatherCard',

        data: () => ({
            interval: null,
            time: '',
            date: '',
        }),

        props: {
            card: {
                type: Object,
                default: () => {},
            },
        },

        mounted() {
            this.setCurrentTime();
            this.interval = setInterval(() => {
                this.setCurrentTime();
            }, 1000);
        },

        beforeUnmount() {
            clearInterval(this.interval);
        },

        methods: {
            setCurrentTime() {
                const [time, date] = getCurrentDate(this.card.timezone);
                this.time = time.split(':').slice(0, -1).join(':');
                this.date = date;
            },
        },
    };
</script>

<style lang="scss">
    .weather-card {
        display: grid;
        grid-template-columns: 60% 35%;
        justify-content: space-between;
        min-width: 281px;
        min-height: 74px;
        padding: 12px;
        background-color: $weather-card-color-day;
        border-radius: 12px;

        &._night {
            background-color: $weather-card-color-night;
        }

        &._day {
            background-color: $weather-card-color-night;
        }
    }

    .weather-card__weather-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }

    .weather-card__weather {
        display: flex;
        align-items: center;
    }

    .weather-card__icon {
        width: 28px;
        height: 28px;
        margin-right: 4px;
    }

    .weather-card__weather-description {
        font-size: 12px;
        line-height: 16px;
        color: #ffffff;

        &:first-letter {
            text-transform: uppercase;
        }
    }

    .weather-card__temp {
        margin-top: 16px;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: 0.05em;
        color: #ffffff;
    }

    .weather-card__info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        text-align: right;
    }

    .weather-card__time {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #ffffff;
    }

    .weather-card__date {
        font-weight: 400;
        font-size: 12px;
        color: #ffffff;
    }

    .weather-card__city {
        width: 100%;
        overflow-wrap: anywhere;
        font-size: 12px;
        line-height: 20px;
        font-weight: 500;
        color: #ffffff;
    }

    .weather-card__date {
        margin-top: 12px;

        &:first-letter {
            text-transform: uppercase;
        }
    }
</style>
