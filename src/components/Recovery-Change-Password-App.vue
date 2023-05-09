<template>
  <v-app>
    <v-container class="container">
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
              persistent-hint
              hint="от 8 символов, только латинские буквы и цифры"
              rounded
              variant="solo"
              v-model="password1"
              label="Пароль"
              required
              @input="onPassword1Change()"
              :append-inner-icon="showPassword1 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              :type="showPassword1 ? 'text' : 'password'"
              @click:appendInner="showPassword1 = !showPassword1"
              validate-on="input"
              :rules="rules.passwordRules"
          ></v-text-field>
        </v-row>
        <v-row class="d-flex justify-start">
          <v-text-field
              rounded
              variant="solo"
              v-model="password2"
              label="Ещё раз пароль"
              required
              :append-inner-icon="showPassword2 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              :type="showPassword2 ? 'text' : 'password'"
              @click:appendInner="showPassword2 = !showPassword2"
              validate-on="input"
              :rules="[v=>v===password1 || 'Пароли не совпадают']"
              ref="password2"
          ></v-text-field>
        </v-row>


        <v-btn
            class="my-3 font-weight-bold"
            block
            rounded="xl"
            size="x-large"
            variant="elevated"
            color="primary"
            @click="changePassword"
            :disabled="isFormDisabled"
        >
          Изменить пароль
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
      password1: '',
      password2: '',
    rules:{...validators},
      showPassword1: false,
      showPassword2: false,
      form: null,
      isFormDisabled:true
    };
  },
  methods: {
    changePassword() {
      this.$router.push('/login');
    },
    onPassword1Change() {
      if(this.$refs.password2.modelValue)this.$refs.password2.validate()
    },
  },
  mounted() {
    this.form = this.$refs.form;
  },
  watch: validators.watcher,

};
</script>
<style>
.container {
  max-width: 90%;
}

@media (min-width: 700px) {
  .container {
    max-width: 700px;
  }
}
</style>