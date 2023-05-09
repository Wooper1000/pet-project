<template>
  <v-app class="px-2">
    <v-container class="container" >
      <v-row class="d-flex justify-start mb-2">
        <v-icon @click="$router.go(-1)" icon="mdi-chevron-left"/>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <h3>Восстановление пароля</h3>
      </v-row>
      <v-row class="d-flex justify-start mb-2 ">
        <div class="mb-4">
          <span class="text-subtitle-1">Введите код, отправленный на e-mail</span>
        </div>
      </v-row>

      <v-form @submit.prevent="recover" ref="form">
        <v-row class="d-flex justify-start">
          <v-text-field
              autofocus
              clearable
              clear-icon="mdi-close"
              v-model.lazy="code"
              variant="solo"
              rounded
              validate-on="input"
              label="Код"
              required
              inputmode="numeric"
              type="text"
              maxlength="4"
              @keydown.enter="recover"
              :rules="rules.confirmCode"
          ></v-text-field>
        </v-row>
        <v-btn
            class="my-3 font-weight-bold"
            block
            rounded="xl"
            size="x-large"
            variant="elevated"
            color="primary"
            @click="recover"
        >
          Готово
        </v-btn>
      </v-form>
      <div class="mt-4 text-center">
        <span class="subtitle-1">Не пришёл код? </span>
        <span class="text-decoration-underline text-blue" @click="retrySendCode">Отправить повторно</span>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import * as rules from '../utils/validators'
import isFormValid from "@/utils/isFormValid";
export default {
  data() {
    return {
      code: '',
      rules:{...rules},
    };
  },

  methods: {
    async recover() {
      if(await isFormValid(this.$refs.form)){
      this.$router.push('/recovery/change-password');
        }
    },
    retrySendCode(){
      //Логика эмита события повторения отправки кода
    }

  },

};
</script>
<style>
</style>