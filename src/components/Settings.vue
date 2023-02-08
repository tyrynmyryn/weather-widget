<template>
    <div class="weather-widget__settings">
        <button
            class="weather-widget__button weather-widget__back-button"
            @click="$emit('changeScreen', 'weather')"
        >
            <Icons name="go-back" />
        </button>
        <Draggable
            v-if="!loading.main"
            v-model="dataModel"
            item-key="id"
            v-bind="{ animation: 250 }"
            handle=".city-item__draggable-button"
            class="weather-widget__settings-cities"
        >
            <template #item="{ element }">
                <CityItem
                    class="weather-widget__settings-city"
                    :city="element"
                />
            </template>
        </Draggable>
        <div v-else class="weather-widget__settings-loader"><Loader /></div>

        <div class="weather-widget__add-city">
            <input
                type="text"
                :class="[
                    'weather-widget__city-input',
                    { ['_error']: errors.addCity },
                ]"
                placeholder=" "
                :value="newCity"
                @input="(e) => onChange(e)"
                @keyup="onAdd"
            />
            <div :class="['weather-widget__input-placeholder']">
                {{ errors.addCity || placeholder }}
            </div>
            <div
                v-if="!loading.main && loading.add"
                class="weather-widget__add-loader"
            >
                <Loader />
            </div>
            <button
                v-else
                :disabled="!newCity"
                class="weather-widget__button weather-widget__add-city-button"
                @click="onAdd"
            >
                <Icons name="plus" />
            </button>
        </div>
    </div>
</template>

<script>
    import translate from '@/helpers/translate';
    import { mapState, mapMutations, mapActions } from 'vuex';
    import Draggable from 'vuedraggable';
    import CityItem from '@/components/CityItem';

    export default {
        name: 'Settings',

        components: {
            Draggable,
            CityItem,
        },

        data: () => ({
            placeholder: translate('inputPlaceholder'),
        }),

        computed: {
            ...mapState({
                data: (state) => state.data,
                newCity: (state) => state.newCity,
                errors: (state) => state.errors,
                loading: (state) => state.loading,
            }),

            dataModel: {
                get() {
                    return this.data;
                },
                set(value) {
                    this.updateData(value);
                },
            },
        },

        methods: {
            ...mapMutations({
                setNewCityValue: 'setNewCityValue',
                setError: 'setError',
            }),

            ...mapActions({
                delete: 'onDelete',
                addCity: 'addCity',
                updateData: 'updateData',
            }),

            onChange(e) {
                this.setError({ ...this.errors, addCity: '' });
                e.target.value = e.target.value.replace(/[^A-zА-я-\s]/g, '');
                this.setNewCityValue(e.target.value);
            },

            onAdd(e) {
                const enterClick = e.key && e.code === 'Enter';
                if (enterClick || e.pointerType === 'mouse') {
                    this.addCity();
                    this.setNewCityValue('');
                }
            },
        },
    };
</script>

<style lang="scss">
    .weather-widget__settings {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 16px 24px 40px;
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
    }
    .weather-widget__back-button {
        @include settings-circle-button($main-green-color);
        width: 40px;
        height: 40px;
        padding: 12px;
    }

    .weather-widget__settings-cities {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 24px;
    }

    .weather-widget__settings-city:not(:last-child) {
        margin-bottom: 12px;
    }

    .weather-widget__add-city {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: 24px;
    }

    .weather-widget__add-city-button {
        @include settings-circle-button($main-green-color);
        position: absolute;
        right: 12px;
    }

    .weather-widget__settings-loader {
        width: 50px;
        height: 50px;
        margin-top: 24px;
    }

    .weather-widget__add-loader {
        position: absolute;
        top: 50%;
        right: 7.5px;
        width: 30px;
        height: 30px;
        transform: translateY(-50%);
    }

    .weather-widget__city-input {
        width: 100%;
        padding: 12px 36px 12px 12px;
        border: 2px solid $main-gray-color;
        border-radius: 12px;
        font-size: 14px;
        line-height: 18px;
        color: #000;
        transition: 0.2s border-color;

        &:focus {
            outline: none;
        }

        &::placeholder {
            color: rgba(#000, 0.5);
        }

        &:not(:placeholder-shown) {
            + .weather-widget__input-placeholder {
                left: 14px;
                top: 0;
                transform: translateY(-50%);
                font-size: 12px;
            }
        }

        &._error {
            border-color: $main-red-color;

            + .weather-widget__input-placeholder {
                color: $main-red-color;
            }
        }
    }

    .weather-widget__input-placeholder {
        position: absolute;
        left: 16px;
        background: #fff;
        font-size: 14px;
        line-height: 16px;
        color: rgba(#000, 0.5);
        pointer-events: none;
        transition: 0.2s all;
    }
</style>
