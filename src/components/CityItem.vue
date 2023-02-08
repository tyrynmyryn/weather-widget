<template>
    <div class="city-item" ref="cityRef">
        <button class="weather-widget__button city-item__draggable-button">
            <Icons name="draggable" />
        </button>
        <div class="city-item__city-name">{{ city.city }}</div>
        <button
            class="weather-widget__button city-item__remove-button"
            @click="onDelete(city)"
        >
            <Icons name="plus" />
        </button>
    </div>
</template>

<script>
    import gsap from 'gsap';
    import { mapActions } from 'vuex';
    export default {
        name: 'CityItem',

        props: {
            city: {
                type: Object,
                default: () => {},
            },
        },

        mounted() {
            gsap.from(this.$refs.cityRef, {
                duration: 0.3,
                opacity: 0,
                padding: 0,
                height: 0,
                bottom: -100,
            });
        },

        methods: {
            ...mapActions({
                delete: 'onDelete',
            }),

            onDelete(city) {
                gsap.to(this.$refs.cityRef, {
                    duration: 0.3,
                    height: 0,
                    margin: 0,
                    padding: 0,
                    transform: 'translateY(-100%)',
                    opacity: 0,
                    onComplete: () => {
                        this.delete(city);
                    },
                });
            },
        },
    };
</script>

<style lang="scss">
    .city-item {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 12px 36px 12px 12px;
        border: 2px solid $main-gray-color;
        border-radius: 12px;
    }

    .city-item__draggable-button {
        width: 12px;
        height: 12px;
        margin-right: 12px;
        background-color: transparent;
        cursor: grab;

        &:active {
            cursor: grabbing;
        }

        svg {
            fill: $main-gray-color;
        }
    }

    .city-item__city-name {
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
        font-size: 14px;
        line-height: 18px;
        color: #000;
    }

    .city-item__remove-button {
        @include settings-circle-button($main-red-color);
        position: absolute;
        right: 12px;

        svg {
            transform: rotate(45deg);
        }
    }
</style>
