<template>

  <v-app>
    <v-container class="container">

      <v-row class="d-flex justify-start mb-2">
        <v-icon @click="$router.go(-1)" icon="mdi-chevron-left"/>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <h3>Регистрация</h3>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <div class="mb-4">
          <span class="text-subtitle-1">Зарегистрируйтесь, чтобы рабочий процесс стал комфортным</span>
        </div>
      </v-row>

      <v-form @submit.prevent="registerUser" ref="form" autocomplete="off">
        <v-row class="d-flex justify-start">
          <v-text-field
              persistent-clear
              clearable
              clear-icon="mdi-close"
              variant="solo"
              rounded
              v-model.lazy="firstName"
              validate-on="input"
              label="Имя"
              required
              :rules="rules.firstNameRules"
              type="text"
          ></v-text-field>
        </v-row>
        <v-row class="d-flex justify-start">
          <v-text-field
              persistent-clear
              clearable
              clear-icon="mdi-close"
              variant="solo"
              rounded
              validate-on="blur"
              v-model.lazy="lastName"
              :rules="rules.lastNameRules"
              label="Фамилия"
              required
              type="text"
          ></v-text-field>
        </v-row>
        <v-row class="d-flex justify-start">
          <v-col class="pl-0 py-0">
            <v-text-field
                type="date"
                label="Дата рождения"
                v-model="birthday"
                :rules="rules.birthdayRules"
                validate-on="input"
                rounded
                variant="solo"
            ></v-text-field>
          </v-col>
          <v-col class="pr-0 py-0">
            <v-combobox
                rounded
                variant="solo"
                v-model="gender.selected"
                :items="gender.genders"
                :rules="rules.genderSelectedRules"
                validate-on="input"
                required
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-start">
          <v-text-field
              label="Телефон"
              required
              type="tel"
              inputmode="numeric"
              validate-on="blur"
              variant="solo"
              rounded
              v-model="phone"
              persistent-hint
              hint="Номер с кодом города, например +7 999 432 32 32"
              :rules="rules.phoneRules"
              @input="onPhoneInput"
          ></v-text-field>
        </v-row>
        <v-row class="d-flex justify-start">
          <v-text-field
              hint="На почту придет ссылка для подтверждения аккаунта"
              persistent-hint
              persistent-clear
              clearable
              clear-icon="mdi-close"
              variant="solo"
              rounded
              validate-on="blur"
              :rules="rules.emailRules"
              v-model.lazy="email"
              label="E-mail"
              required
              type="email"
          ></v-text-field>
        </v-row>
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

        <v-checkbox
            readonly
            v-model="is18YearsOld"
            label="Мне есть 18 лет"
        ></v-checkbox>
        <v-checkbox v-model="isAgreementChecked"
                    required
                    :rules="rules.agreementCheckRules"
        >
          <template v-slot:label>
            <div>
              Я согласен
                  <a
                      target="_blank"
                      href="https://m.obit.ru/upload/iblock/ea8/Pravila%20po%20okazanii%20uslug%20svyazi%20po%20peredachi%20dannih.pdf"
                  >
                    с условиями обработки персональных данных
                  </a>
            </div>
          </template>
        </v-checkbox>
        <v-btn
            class="my-3 font-weight-bold"
            block
            rounded="xl"
            size="x-large"
            variant="elevated"
            color="primary"
            @click="registerUser"
            :disabled="isFormDisabled"
        >
          Зарегистрироваться
        </v-btn>
      </v-form>

      <div class="mt-4 text-center">
        <span class="subtitle-1">У вас уже есть профиль? </span>
        <a href="/login">Войти</a>
      </div>

    </v-container>
  </v-app>

</template>

<script>
import * as validators from './validators';
import api from '../api'
export default {
  data() {
    return {
      birthday: new Date().toISOString().substr(0, 10),
      firstName: '',
      lastName: '',
      gender: {
        selected: 'Пол',
        genders: ['Мужской', 'Женский'],
      },
      phone: null,
      email: '',
      password1: '',
      password2: '',
      showPassword1: false,
      showPassword2: false,
      rules: {
        ...validators,
      },
      isAgreementChecked:false,
      form: null,
      isFormDisabled: true,
    };
  },

  mounted() {
    this.form = this.$refs.form;
  },

  methods: {
    onPassword1Change() {
      if(this.$refs.password2.modelValue)this.$refs.password2.validate()
    },
    async registerUser() {
      let promise = await api.registerUser({
        firstname:this.firstName,
        birthday:this.birthday,
        gender:this.gender.selected === 'Мужской' ? 'MALE' : 'FEMALE',
        email:this.email,
        phone:this.phone,
        password:this.password1
      })
      console.log(promise.data)
      this.$router.push('/login');
    },
    onPhoneInput() {
      if (this.phone.startsWith('8')) {
        this.phone = '+7' + this.phone.slice(1);
      }
      if (this.phone.startsWith('7')) {
        this.phone = '+' + this.phone;
      }
      if (this.phone.startsWith('9')) {
        this.phone = '+7' + this.phone;
      }
    },
  },

  watch: validators.watcher,

  computed: {
    is18YearsOld() {
      if (this.birthday) {
        const birthday = new Date(this.birthday)
        const now = new Date()
        const ageInMs = now.getTime() - birthday.getTime()
        const ageInYears = ageInMs / 1000 / 60 / 60 / 24 / 365
        return ageInYears >= 18
      } else {
        return false
      }
    }
  }
}
</script>
<style>
.container {
  max-width: 90%;
}
</style>