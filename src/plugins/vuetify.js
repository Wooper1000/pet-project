import {createVuetify} from "vuetify";
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import locale from '../i18n'
import petIcons from "@/assets/pet-icons/icons";
import petTheme from './pet-theme';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

const vuetify = createVuetify({
    components: {
        ...components,
        VSkeletonLoader
    },
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
        VTextarea: {
            variant: "solo",
            color: "primary",
            class: "pet-input "
        },
        VBtn:{
            class:'pet-btn'
        },
        VCheckbox: {
            falseIcon: "mdi-checkbox-blank-outline",
            trueIcon: "mdi-checkbox-marked-outline"
        },
        VCheckboxBtn: {
            falseIcon: "mdi-checkbox-blank-outline",
            trueIcon: "mdi-checkbox-marked-outline"
        },
        VChip: {
            class: 'bg-blue-aqua mr-2',
            size: 'large',
            style: 'color:white !important'
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