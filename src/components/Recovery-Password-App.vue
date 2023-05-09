<template>
  <v-app>
    <v-container class="container">
      <v-row class="d-flex justify-start mb-2">
        <v-icon @click="$router.go(-1)" icon="mdi-chevron-left"/>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <h3>Восстановление пароля</h3>
      </v-row>
      <v-row class="d-flex justify-start mb-2 ">
        <div class="mb-4">
          <span class="text-subtitle-1">Введите e-mail, указанный при регистрации. На почту придет код для восстановления пароля</span>
        </div>
      </v-row>

      <v-form @submit.prevent="getCode" ref="form">
        <v-row class="d-flex justify-start">
          <v-text-field
              autofocus
              clearable
              clear-icon="mdi-close"
              variant="solo"
              rounded
              validate-on="input"
              v-model.lazy="email"
              :rules="rules.emailRules"
              label="E-mail"
              required
              type="email"
              @keydown.enter="getCode"
          ></v-text-field>
        </v-row>
        <v-btn
            class="my-3 font-weight-bold"
            block
            rounded="xl"
            size="x-large"
            variant="elevated"
            color="primary"
            @click="getCode"
            :disabled="isFormDisabled"
        >
          Получить код
        </v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
import * as validators from './validators'
export default {
  data() {
    return {
      email: '',
      form: null,
      rules:{...validators},
      isFormDisabled:true
    }
  },mounted() {
    this.form = this.$refs.form;
  },
  methods: {
    getCode() {
      this.$router.push('/recovery/enter-code');
    },
  },
  watch:validators.watcher

};
</script>

<style>
.container {
  max-width: 90%;
}
</style>