import './assets/css/main.css'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/lib/util/colors'

import '@mdi/font/css/materialdesignicons.css'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


import store from './store'

import i18n from "@/i18n";

const vuetify = createVuetify({
    components,
    directives,
    defaults: {
        VTextField: {
            variant: "solo",
            color: "primary",
            class: "pet-input mb-5"
        },
        VCombobox: {
            variant: "solo",
            color: "primary",
            class: "pet-input mb-5"
        }
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.blue.darken4, // #E53935
                    secondary: colors.blue.lighten4, // #FFCDD2

                }
            },
        },
    },
})

createApp(App)
    .use(router)
    .use(store)
    .use(i18n)
    .use(vuetify)
    .component('VueDatePicker', VueDatePicker)
    .mount('#app')
