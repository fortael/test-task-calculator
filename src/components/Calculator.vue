<template>
    <div class="calculator">
        <div class="calculator__title">Калькулятор</div>
        <div class="calculator__body">
            <div class="calculator-selector">
                <div class="calculator-selector__label space-between">
                    <span>Я хочу взять</span>
                    <span>{{ textMoney }}</span>
                </div>
                <div class="calculator-selector__slider">
                    <vue-slider v-bind="amount.props" v-model="amount.value"/>
                </div>
            </div>
            <div class="calculator-selector">
                <div class="calculator-selector__label space-between">
                    <span>На</span>
                    <span>{{ days.value }} {{ textDays }}</span>
                </div>
                <div class="calculator-selector__slider">
                    <vue-slider v-bind="days.props" v-model="days.value"/>
                </div>
            </div>

            <div class="container">
                <div class="container__column">
                    <button role="button" class="btn">Взять деньги</button>
                </div>
                <div class="container__column container__column--right">
                    <div class="space-between">
                        <span class="text-muted mb">Сумма</span>
                        <span>{{ returnMoney}}</span>
                    </div>
                    <div class="space-between">
                        <span class="text-muted">Дата возврата</span>
                        <span class="text-green">{{ returnDate }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vueSlider from 'vue-slider-component';
    import {DateTime} from 'luxon'

    function formatMoney(value) {
        let val = (value / 1).toFixed(2).replace('.', ',');

        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' ₽'
    }

    function getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        return five;
    }

    export default {
        name: "calculator",
        components: {vueSlider},
        computed: {
            textMoney() {
                return formatMoney(this.amount.value);
            },
            textDays() {
                return getNoun(this.days.value, 'день', 'дня', 'дней')
            },
            returnMoney() {
                let amount;

                amount = this.amount.value * this.days.value * 0.000333;
                amount += this.amount.value;

                return formatMoney(amount);
            },
            returnDate() {
                return DateTime.local().plus({days: this.days.value}).setLocale('ru').toFormat("d MMMM y")
            }
        },
        data() {
            return {
                amount: {
                    value: 10000,
                    props: {
                        "dot-size": 32,
                        min: 1000,
                        max: 35000,
                        interval: 1000,
                        class: "slider",
                        "use-keyboard": true,
                        tooltip: false,
                        "slider-style": {
                            height: "2rem",
                            width: "2rem",
                        }
                    }
                },
                days: {
                    value: 10,
                    props: {
                        "dot-size": 32,
                        min: 5,
                        max: 45,
                        class: "slider",
                        "use-keyboard": true,
                        tooltip: false,
                        "slider-style": {
                            height: "2rem",
                            width: "2rem",
                        }
                    }
                },
            }
        }
    }
</script>