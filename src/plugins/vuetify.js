import {createVuetify} from "vuetify";
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import locale from '../i18n'
import petIcons from "@/assets/pet-icons/icons";
import petTheme from './pet-theme';

const vuetify = createVuetify({
    components,
    directives,
    locale,
    defaults: {
        VApp:{
            class:'px-2'
        },
        VTextField: {
            variant: "solo",
            color: "primary",
            class: "pet-input elevation-0"
        },
        VCombobox: {
            variant: "solo",
            color: "primary",
            class: "pet-input "
        },
        VBtn:{
            class:'pet-btn'
        }
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
            pet: petIcons
        }
    },
    theme: {
        defaultTheme: 'petTheme',
        themes: {
            petTheme
        },
    },
})
export default vuetify