<template>
  <v-app class="px-2">
    <v-container class="container" >
      <v-row class="d-flex justify-start mb-2">
        <v-icon @click="$router.go(-1)" icon="mdi-chevron-left"/>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <h3>{{ $t('sign-in-title') }}</h3>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <div class="mb-4">
          <span class="text-subtitle-1">{{ $t('log-if-u-can') }}</span>
        </div>
      </v-row>

      <v-form ref="form">
        <v-row class="d-flex justify-start mb-1">
          <v-text-field
              clearable
              clear-icon="mdi-close"
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
              v-model="password"
              :label="$t('password')"
              required
              :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              :type="showPassword ? 'text' : 'password'"
              @click:appendInner="showPassword = !showPassword"
              validate-on="input"
              :rules="[v=>v.length>=6 || 'Короткий пароль']"
              @keydown.enter="login"
          ></v-text-field>
        </v-row>
      </v-form>
        <div class="mb-4 text-end">
          <a href="/recovery">{{$t('forgot-password')}}</a>
        </div>
      <v-row>
        <v-btn
            class="my-3 font-weight-bold"
            block
            size="x-large"
            variant="elevated"
            color="primary"
            @click="login"
        >
          {{$t('btn-sign-in')}}
        </v-btn>
      </v-row>
      <div class="mt-4 text-center">
        <span class="subtitle-1">{{$t('no-profile')}}</span>
        <a href="/registration">{{$t('signup')}}</a>
      </div>
    </v-container>
  </v-app>
  <v-snackbar
      ref="snackbar"
      v-model="snackbar.visible"
      :color="snackbar.color"
      top
      timeout="3000"
      @click:close="closeSnackbar"
  >
    {{ snackbar.text }}
  </v-snackbar>
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
    resetFields() {
      this.email = '';
      this.password = '';
    },
    closeSnackbar() {
      this.$store.commit('hideSnackbar');
    },

    async login() {
      if (await isFormValid(this.$refs.form)) {
        // все поля формы валидны, выполняем вход
        try {
          const response = await api.loginUser({ email: this.email, password: this.password });
            // если ответ 200, то выводим snackbar "Вход выполнен" и переходим на страницу профиля
            this.$store.commit('showSnackbar', { text: 'Вход выполнен', color: 'success' });
            this.$store.commit('setUser', {
              email: this.email,
              token: response.data.token,
            });
            localStorage.clear()
          console.log(response.status)
           setTimeout(()=>{
             this.closeSnackbar();
           this.$router.push('/profile/settings')}
               ,1000)
            // если ответ не 200, то выводим сообщение из ответа в snackbar
            if(response.status !== 200){
              this.$store.commit('showSnackbar', { text: response.data.message, color: 'error' });
              return this.resetFields()
            }
        } catch (error) {

          if(error.response.data.status === "NOT_FOUND"){
            this.$store.commit('showSnackbar', { text: this.$t('User with email {email} is not found',{email:this.email}), color: 'error' });
          return   this.resetFields()
          }
          if(error.response.data.status === "FORBIDDEN"){
            this.$store.commit('showSnackbar', { text: this.$t('Username or password is not correct'), color: 'error' });
          return   this.resetFields()
          }
          else if(error.response.data.status === "CONFLICT"){
           return  this.$store.commit('showSnackbar', { text: this.$t('User is not approve his email {email}',{email:this.email}), color: 'error' });
          }
          // если возникла ошибка при выполнении запроса, то выводим сообщение в snackbar
          else this.$store.commit('showSnackbar', { text: error.response.data.message, color: 'error' });
          console.log('Зачем то зашёл')
          this.resetFields()
        }
      }
    }
  },
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    },
  },
};
</script>
<style>

</style>
