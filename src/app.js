import Vue from 'vue'
import VueMoney from 'v-money'

Vue.use(VueMoney, {
    precision: 2,
    decimal: ",",
    thousands: " ",
    suffix: ' ₽',
});
Vue.component('calculator', require('./components/Calculator.vue'));

new Vue({ el: "#app" });