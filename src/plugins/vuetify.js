import {createVuetify} from "vuetify";
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/lib/util/colors'
import locale from '../i18n'

const vuetify = createVuetify({
    components,
    directives,
    locale,
    defaults: {
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
export default vuetify