<template>
    <v-container class="container" >
      <v-row class="d-flex justify-start mb-2">
        <v-icon @click="$router.go(-1)" icon="mdi-chevron-left"/>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <h3>Новый пароль</h3>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <div class="mb-4">
          <span class="text-subtitle-1">Введите новый пароль</span>
        </div>
      </v-row>
      <v-form @submit.prevent="changePassword" ref="form">
        <v-row class="d-flex justify-start">
          <v-text-field
              autofocus
              persistent-hint
              hint="от 8 символов, только латинские буквы и цифры"
              variant="solo"
              v-model="password1"
              label="Пароль"
              required
              @input="onPassword1Change()"
              :append-inner-icon="showPassword1 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              :type="showPassword1 ? 'text' : 'password'"
              @click:appendInner="showPassword1 = !showPassword1"
              validate-on="input"
              :rules="rules.password"
              @keydown.enter="changePassword"
          ></v-text-field>
        </v-row>
        <v-row class="d-flex justify-start">
          <v-text-field
              variant="solo"
              v-model="password2"
              label="Ещё раз пароль"
              required
              :append-inner-icon="showPassword2 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              :type="showPassword2 ? 'text' : 'password'"
              @click:appendInner="showPassword2 = !showPassword2"
              validate-on="input"
              :rules="[v=>v===password1 || 'Пароли не совпадают']"
              @keydown.enter="changePassword"
              ref="password2"
          ></v-text-field>
        </v-row>
        <v-row>
        <v-btn
            class="my-3 font-weight-bold"
            block
            size="x-large"
            variant="elevated"
            color="blue"
            @click="changePassword"
        >
          Изменить пароль
        </v-btn>
        </v-row>
      </v-form>
    </v-container>
</template>

<script>
import * as validators from '../utils/validators'
import isFormValid from "@/utils/isFormValid";
export default {
  data() {
    return {
      password1: '',
      password2: '',
    rules:{...validators},
      showPassword1: false,
      showPassword2: false,
    };
  },
  methods: {
    async changePassword() {
      if(await isFormValid(this.$refs.form)){
        localStorage.setItem('password', this.password1);
        this.$router.push('/login');
      }
    },
    onPassword1Change() {
      if(this.$refs.password2.modelValue)this.$refs.password2.validate()
    },
  },
};
</script>
<style>
</style>