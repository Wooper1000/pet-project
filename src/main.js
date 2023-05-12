import './assets/css/main.css'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import 'vuetify/styles'
import 'vuetify/styles'
import vuetify from "@/plugins/vuetify";


import '@mdi/font/css/materialdesignicons.css'



import store from './store'

import i18n from "@/i18n";




createApp(App)
    .use(router)
    .use(store)
    .use(i18n)
    .use(vuetify)
    .mount('#app')
