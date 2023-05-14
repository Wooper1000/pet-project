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
        <v-col cols="12">
          <v-list v-for="addr in places" :key="addr">
          <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="addr.title"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="user in addr.peoples"
            :key="user"
            :value="user.name"
            :title="user.name"
            :prepend-avatar="user.avatar"
          >
          <template v-slot:append>
                <v-switch inset color="primary" :model-value="false"></v-switch>
              </template>
        </v-list-item>
        </v-list-group>
      </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    places: [
      {
        title: 'ул. Линии Октябрьской Железной Дороги, 15',
        peoples: [
          {name: 'Шабанский Даниил',avatar: 'https://sun9-57.userapi.com/impg/QW1aEbJDi1WTfnBoswOdQBerFgRLxDNDeDDc6w/Ka2UtInjTdg.jpg?size=1280x960&quality=95&sign=88bd54ec46b221f169b06d4d089e1ff1&type=album'},
          {name: 'Яковлев Роман',avatar: 'https://sun9-78.userapi.com/impg/DQK50cfdOk-xTQI_JnlPzYvvXI8MJ5HjuliD1A/y8DUYb82xxE.jpg?size=1280x850&quality=95&sign=d3e662461767de4bf637fe5c197b36e0&type=album'},
        ]
      }
    ]
  }),
}
</script>

<style scoped> 
.v-list-group__items .v-list-item {
  padding-inline-start: 0px !important;
}
</style>