<template>
  <v-app class="px-2">
    <v-container class="container">
      <v-row>
        <v-col cols="2">
          <v-icon @click="$router.go(-1)">mdi-chevron-left</v-icon>
        </v-col>
        <v-col cols="8">
          <h4 class="text-center">{{ $t('geo') }}</h4>
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
            <v-list-item :title="$t('accept-geo')">

              <template v-slot:append>
                <v-switch inset color="primary" v-model="isGeoEnabled" @change="handleGeoToggle"></v-switch>
              </template>
            </v-list-item>
            <v-list-item :title="$t('share-geo')" @click="$router.push('/settings/geo/permissions')">

              <template v-slot:append>
                <v-btn color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
              </template>
            </v-list-item>
            <v-list-item :title="$t('share-geo-admin')">

              <template v-slot:append>
                <v-switch inset color="primary" :model-value="false"></v-switch>
              </template>
            </v-list-item>
            <v-list-item :title="$t('share-geo-external')">
              <template v-slot:append>
                <v-list-item-action>
                  <v-switch inset color="primary" :model-value="false"></v-switch>
                </v-list-item-action>
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
    isGeoEnabled:false
  }),
  methods: {
    handleGeoToggle() {
      alert('Заработает когда SSL сертификаты добавим')
      this.isGeoEnabled=false
      //после запуска сервера на SSL
      // if (!this.isGeoEnabled) {
      //   this.requestGeoData();
      // }
    },
    requestGeoData() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            this.onSuccess,
            this.onError
        );
      } else {
        console.log("Геолокация не поддерживается в этом браузере");
      }
    },
    onSuccess(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("Широта:", latitude);
      console.log("Долгота:", longitude);
      alert(`${latitude+' '+longitude}`)
    },
    onError(error) {
      console.log("Ошибка получения геоданных:", error);
    },
  },
}
</script>