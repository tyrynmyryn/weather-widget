<template>
    <div class="weather-widget__container">
        <Weather
            v-if="activeScreen === 'weather'"
            ref="section"
            @changeScreen="changeScreen"
        />
        <Settings
            v-if="activeScreen === 'settings'"
            ref="section"
            @changeScreen="changeScreen"
        />
    </div>
</template>

<script>
    import Weather from '@/components/Weather';
    import Settings from '@/components/Settings';
    import gsap from 'gsap';

    import { mapState, mapMutations, mapActions } from 'vuex';

    export default {
        data: () => ({
            activeTab: 'weather',
            newCity: '',
        }),
        components: {
            Weather,
            Settings,
        },

        mounted() {
            this.init();
        },

        computed: {
            ...mapState({
                data: (state) => state.data,
                activeScreen: (state) => state.activeScreen,
            }),
        },

        methods: {
            ...mapMutations({
                setScreen: 'setScreen',
            }),

            ...mapActions({
                init: 'initAction',
            }),

            changeScreen(tab) {
                gsap.to(this.$refs.section.$el, {
                    duration: 0.2,
                    rotateY: 90,
                    onComplete: () => {
                        this.setScreen(tab);
                        this.$nextTick(() => {
                            gsap.from(this.$refs.section.$el, {
                                duration: 0.2,
                                rotateY: -90,
                            });
                        });
                    },
                });
            },
        },
    };
</script>

<style lang="scss">
    .weather-widget__container {
        width: 100%;
    }
</style>
