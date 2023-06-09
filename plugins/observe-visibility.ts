// https://github.com/Akryum/vue-observe-visibility
import { defineNuxtPlugin } from '#app';
import VueObserveVisibility from 'vue-observe-visibility';

// Tracks element visibility in viewport using v-on
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueObserveVisibility);
});
