<template>
  <v-app>
    <v-container class="container">
      <v-row class="d-flex justify-start mb-2">
        <v-icon @click="$router.go(-1)" icon="mdi-chevron-left"/>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <h3>Вход в личный кабинет</h3>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <div class="mb-4">
          <span class="text-subtitle-1">Войдите в личный кабинет, если у вас уже есть аккаунт</span>
        </div>
      </v-row>

      <v-form @submit.prevent="login" ref="form">
        <v-row class="d-flex justify-start mb-1">
          <v-text-field
              autofocus
              clearable
              clear-icon="mdi-close"
              variant="solo"
              rounded
              validate-on="blur"
              v-model="email"
              :rules="rules.emailRules"
              label="E-mail"
              required
              type="email"
              @keydown.enter="login"
          ></v-text-field>
        </v-row>
        <v-row class="d-flex justify-start">
          <v-text-field
              rounded
              variant="solo"
              v-model="password"
              label="Пароль"
              required
              :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              :type="showPassword ? 'text' : 'password'"
              @click:appendInner="showPassword = !showPassword"
              validate-on="input"
              :rules="rules.passwordRules"
              @keydown.enter="login"
          ></v-text-field>
        </v-row>
        <div class="mb-4 text-end">
          <a href="/recovery">Забыли пароль?</a>
        </div>

        <v-btn
            class="my-3 font-weight-bold"
            block
            rounded="xl"
            size="x-large"
            variant="elevated"
            color="primary"
            @click="login"
            :disabled="isFormDisabled"
        >
          Войти
        </v-btn>
      </v-form>

      <div class="mt-4 text-center">
        <span class="subtitle-1">У вас нет профиля? </span>
        <a href="/registration">Зарегистрироваться</a>
      </div>
    </v-container>
  </v-app>

</template>

<script>
import * as validators from './validators'
// import api from "@/api";
export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      rules:{...validators},
      isFormDisabled:true,
      form:null
    };
  },
  mounted() {
    this.form = this.$refs.form;
  },
  methods: {
    async login() {
// let promise = await api.loginUser({email:this.email,password:this.password})
//       console.log(promise)
      this.$router.push('/profile')
    },
  },
  watch: validators.watcher,
};
</script>
<style>

</style>