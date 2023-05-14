<template>
  <v-app class="px-2">
    <v-container class="container">
      <v-row>
        <v-col cols="2">
          <v-icon @click="$router.go(-1)">mdi-chevron-left</v-icon>
        </v-col>
        <v-col cols="8">
          <h4 class="text-center">{{ $t('about-app') }}</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-avatar color="surface-variant" rounded="xl" size="80"></v-avatar>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <span> {{ $t('version') }} {{ version }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-list>
            <v-list-item :title="$t('feedback')">

              <template v-slot:append>
                <v-btn color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
              </template>
            </v-list-item>
            <v-list-item :title="$t('privacy-police')">

              <template v-slot:append>
                <v-btn color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
              </template>
            </v-list-item>
            <v-list-item :title="$t('terms-of-use')">

              <template v-slot:append>
                <v-btn color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    version: '1.1.1'
  }),
}
</script>