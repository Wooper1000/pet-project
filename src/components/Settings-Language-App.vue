<template>
    <v-app class="px-2">
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
                        <v-list-item v-for="lang in languages" :key="lang.title" :title="lang.title" @click="changeLocale(lang.value)">
                            <template v-slot:append>
                            <v-btn
                                color="primary"
                                :icon="($vuetify.locale.current === lang.value) ? 'mdi-check' : ''"
                                variant="text"
                            ></v-btn>
                            </template>
                        </v-list-item>
        
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import { useLocale } from 'vuetify'

export default {
    setup () {
      const { current } = useLocale()

      return {
        changeLocale: locale => current.value = locale
      }
    },
    data: () => ({
        languages: [
        {
          title: 'Русский',
          value: 'ru',
        },
        {
          title: 'English',
          value: 'en',
        }
      ],
    }),
  }
</script>