<template>
    <v-container class="container">
      <v-row>
        <v-col cols="2">
          <v-icon @click="$router.go(-1)">mdi-chevron-left</v-icon>
        </v-col>
        <v-col cols="8">
          <h4 class="text-center">{{ $t('notifications') }}</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-list lines="three" select-strategy="classic" v-for="note in notifications.new" :key="note">
            <v-list-subheader>{{ $t('new-notifications') }}</v-list-subheader>

            <v-list-item value="notifications">
              <template v-slot:prepend>
                <v-avatar color="surface-variant" size="50"></v-avatar>
              </template>

              <v-list-item-title>{{ note.title }}</v-list-item-title>

              <v-list-item-subtitle>
                {{ note.description }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list lines="three" select-strategy="classic" v-for="note in notifications.old" :key="note">
            <v-list-subheader>{{ $t('old-notifications') }}</v-list-subheader>

            <v-list-item value="notifications">
              <template v-slot:prepend>
                <v-avatar color="surface-variant" size="50"></v-avatar>
              </template>

              <v-list-item-title>{{ note.title }}</v-list-item-title>

              <v-list-item-subtitle>
                {{ note.description }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>

export default {
  data: () => ({
    notifications: {
      new: [{title: 'Электрон', description: '21.08.2023 вышла новая версия приложения. Рекомендуем обновить Вашу версию для более стабильной работы'}],
      old: [{title: 'Электрон', description: '14.07.2023 на сервере будут проводится технические работы. Приносим извинения за доставленные неудосбвта'}]
    }
  }),
}
</script>