<template>

        <v-container class="container" >
            <v-row>
                <v-col cols="2">
                    <v-icon @click="$router.go(-1)">mdi-chevron-left</v-icon>
                </v-col>
                <v-col cols="8">
                    <h4 class="text-center">{{ $t('language') }}</h4>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-list>
                        <v-list-item v-for="(lang, key) in $i18n.availableLocales" :key="key" :title="languageMap[lang]" @click="changeLocale(lang)">
                            <template v-slot:append>
                            <v-btn
                                color="primary"
                                :icon="($i18n.locale === lang) ? 'mdi-check' : ''"
                                variant="text"
                            ></v-btn>
                            </template>
                        </v-list-item>
        
                    </v-list>
                </v-col>
            </v-row>
        </v-container>

</template>

<script>

export default {
    data: () => ({
        languageMap: {
          en: 'English',
          ru: 'Русский',
          by: 'Беларуская',
          ua:'Українська'
        },
    }),
  methods: {
      changeLocale(locale){
        console.log(this.$vuetify.locale)
        this.$i18n.locale = locale
      }
  }
  }
</script>