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
              validate-on="submit"
              v-model.lazy="email"
              :rules="rules.email"
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
        >
          Получить код
        </v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
import * as validators from '../utils/validators'
import isFormValid from "@/utils/isFormValid";
export default {
  data() {
    return {
      email: '',
      rules:{...validators},
    }
  },
  methods: {
   async getCode() {
      if(await isFormValid(this.$refs.form)){
        localStorage.setItem('email',this.email)
        this.$router.push('/recovery/enter-code');

      }
    },
  },

};
</script>

<style>

</style>