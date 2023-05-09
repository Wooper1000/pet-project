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
              :rules="confirmCodeRules"
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
            :disabled="isFormDisabled"
        >
          Готово
        </v-btn>
      </v-form>
      <div class="mt-4 text-center">
        <span class="subtitle-1">Не пришёл код? </span>
        <a href="#" @click="retrySendCode">Отправить повторно</a>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import {confirmCodeRules,watcher} from './validators'
export default {
  data() {
    return {
      code: '',
      confirmCodeRules,
      isFormDisabled:true,
      form: null,
    };
  },
mounted() {
    this.form = this.$refs.form;
  },
  methods: {
    recover() {
      this.$router.push('/recovery/change-password');
    },
    retrySendCode(){
      //Логика эмита события повторения отправки кода
    }

  },
  computed:{
    codeError() {
     return this.$refs.form?.items.some(item=>!item.isValid)
    }
  },
  watch: watcher,
};
</script>
<style>
.container {
  max-width: 90%;
}
</style>