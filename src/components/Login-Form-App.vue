<template>
  <v-app class="px-2">
    <v-container class="container" >
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

      <v-form ref="form">
        <v-row class="d-flex justify-start mb-1">
          <v-text-field
              autofocus
              clearable
              clear-icon="mdi-close"
              variant="solo"
              rounded
              validate-on="blur"
              v-model="email"
              :rules="rules.email"
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
              validate-on="blur"
              :rules="[v=>v.length>=6 || 'Короткий пароль']"
              @keydown.enter="login"
          ></v-text-field>
        </v-row>
      </v-form>
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
        >
          Войти
        </v-btn>
      <div class="mt-4 text-center">
        <span class="subtitle-1">У вас нет профиля? </span>
        <a href="/registration">Зарегистрироваться</a>
      </div>
    </v-container>
  </v-app>

</template>

<script>
import * as validators from '../utils/validators'
import isFormValid from "@/utils/isFormValid";
import api from "@/api";
export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      rules:{...validators},
    };
  },
  mounted() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (email && password) {
      this.email = email;
      this.password = password;
    }
  },
  methods: {
    async login() {
      if (await isFormValid(this.$refs.form)) {
        // все поля формы валидны, выполняем вход
        let promise = await api.loginUser({email:this.email,password:this.password})
        this.$router.push('/profile');
      }
    }
  },
};
</script>
<style>

</style>