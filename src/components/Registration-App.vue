<template>
    <v-container class="container">
      <v-row class="d-flex justify-start mb-2">
        <v-icon @click="$router.go(-1)" icon="mdi-chevron-left"/>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <h3>{{ $t('registration-title') }}</h3>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <div class="mb-4">
          <span class="text-subtitle-1">{{ $t('registration-subtitle') }}</span>
        </div>
      </v-row>

      <v-form @submit.prevent="registerUser" ref="form" autocomplete="off">
        <v-row class="d-flex justify-start" >
          <v-text-field
              persistent-clear
              clearable
              clear-icon="mdi-close"
              v-model.lazy="firstName"
              validate-on="input"
              :label="$t('first-name')"
              required
              :rules="rules.firstName"
              type="text"
          ></v-text-field>
        </v-row>
        <v-row class="d-flex justify-start">
          <v-text-field
              persistent-clear
              clearable
              clear-icon="mdi-close"
              validate-on="blur"
              v-model.lazy="lastName"
              :rules="rules.lastName"
              :label="$t('last-name')"
              required
              type="text"
          ></v-text-field>
        </v-row>
        <v-row class="d-flex justify-start">
          <v-col cols="7" class="pl-0 py-0">
            <v-text-field
                type="text"
                :label="$t('birthday')"
                v-model.lazy="birthday"
                :rules="rules.birthday"
                maxlength="10"
                validate-on="blur"
                @input="formatDate"
            ><template v-slot:append-inner>
              <input
                  ref="datePicker"
                  type="date"
                  hidden
                  v-model="selectedDate"
              >
              <v-icon @click="openDatePicker">mdi-calendar</v-icon>
            </template></v-text-field>
          </v-col>
          <v-col cols="5" class="pr-0 py-0">
            <v-combobox
                :label="$t('gender')"
                :return-object="false"
                v-model="gender"
                :items="gendersList"
                validate-on="blur"
                required
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-start mb-5">
          <v-text-field
              :label="$t('phone')"
              required
              type="tel"
              inputmode="numeric"
              validate-on="blur"
              v-model="phone"
              persistent-hint
              :hint="$t('phone-hint')"
              :rules="rules.phone"
              @input="onPhoneInput"
          ></v-text-field>
        </v-row>
        <v-row class="d-flex justify-start mb-7">
          <v-text-field
              :hint="$t('email-hint')"
              persistent-hint
              persistent-clear
              clearable
              clear-icon="mdi-close"
              validate-on="blur"
              :rules="rules.email"
              v-model.lazy="email"
              label="E-mail"
              required
              type="email"
          ></v-text-field>
        </v-row>
        <v-row class="d-flex justify-start mb-3 ">
          <v-text-field
              persistent-hint
              :hint="$t('password-hint')"
              v-model="password1"
              :label="$t('password')"
              required
              @input="onPassword1Change()"
              :append-inner-icon="showPassword1 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              :type="showPassword1 ? 'text' : 'password'"
              @click:appendInner="showPassword1 = !showPassword1"
              validate-on="input"
              :rules="rules.password"
          ></v-text-field>
        </v-row>
        <v-row class="d-flex justify-start">
          <v-text-field
              v-model="password2"
              :label="$t('password-again')"
              required
              :append-inner-icon="showPassword2 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              :type="showPassword2 ? 'text' : 'password'"
              @click:appendInner="showPassword2 = !showPassword2"
              validate-on="input"
              :rules="[v=>!!v||$t('enter-password'),v=>v===password1 || $('passwords-match-reject')]"
              ref="password2"
          ></v-text-field>
        </v-row>

        <v-row class="d-flex justify-start" style="height: 35px">
          <v-checkbox
            v-model="isAgeAccepted"
            false-icon="mdi-checkbox-blank-outline"
            true-icon="mdi-checkbox-marked-outline"
            :label="$t('im-18-years-old')"
            validate-on="blur"
            :rules="rules.ageCheck"
            false-value="red"
        >
        </v-checkbox>
        </v-row>
        <v-row class="d-flex justify-start">
        <v-checkbox
            v-model="isAgreementChecked"
                    required
                    false-icon="mdi-checkbox-blank-outline"
                    true-icon="mdi-checkbox-marked-outline"
                    :rules="rules.agreementCheck"
                    validate-on="input"
        >
          <template v-slot:label>
            <div style="line-height: 18px">
              {{ $t('i-agree') }}
              <a
                  target="_blank"
                  href="https://m.obit.ru/upload/iblock/ea8/Pravila%20po%20okazanii%20uslug%20svyazi%20po%20peredachi%20dannih.pdf"
              >
                {{ $t('with-conditions') }}
              </a>
            </div>
          </template>
        </v-checkbox>
      </v-row>
        <v-row>
        <v-btn
            class="my-3 font-weight-bold"
            block
            size="x-large"
            variant="elevated"
            color="primary"
            @click="registerUser"
        >
          {{ $t('signup') }}
        </v-btn>
        </v-row>
      </v-form>
      <div class="mt-4 text-center">
        <span class="subtitle-1">{{ $t('profile-exist') }}</span>
        <a
            href="/login">{{ $t('btn-sign-in') }}</a>
      </div>
    </v-container>
  <v-snackbar
      ref="snackbar"
      v-model="snackbar.visible"
      :color="snackbar.color"
      top
      timeout="5000"
      @click:close="closeSnackbar"
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>
<script>
import * as validators from '../utils/validators';
import api from '../api'
import phoneEditor from "@/utils/phoneEditor";
import isFormValid from "@/utils/isFormValid";

export default {
  mounted() {
    // Восстановление значений полей из localStorage
    const savedData = JSON.parse(localStorage.getItem('registrationFormData'));
    if (savedData) {
      this.firstName = savedData.firstName
      this.lastName = savedData.lastName
      this.birthday = savedData.birthday
      this.gender = savedData.gender
      this.phone = savedData.phone
      this.email = savedData.email
      this.password1 = savedData.password1
      this.password2 = savedData.password2
      this.showPassword1 = savedData.showPassword1
      this.showPassword2 = savedData.showPassword2
      this.isAgeAccepted = savedData.isAgeAccepted
      this.isAgreementChecked = savedData.isAgreementChecked
    }
    // Добавление обработчика события beforeunload
    window.addEventListener('beforeunload', this.saveFormData);
  },

  beforeUnmount() {
    // Удаление обработчика события beforeunload
    window.removeEventListener('beforeunload', this.saveFormData);
  },
  data() {
    return {
      selectedDate: null,
      birthday: '',
      firstName: '',
      lastName: '',
      gendersList: [{title: this.$t('gender-male'),value:'MALE'}, {title:this.$t('gender-female'),value:'FEMALE'}],
      gender: null,
      phone: null,
      email: '',
      password1: '',
      password2: '',
      showPassword1: false,
      showPassword2: false,
      rules: {
        ...validators,
      },
      isAgeAccepted: false,
      isAgreementChecked: false,
    };
  },
  methods: {
    openDatePicker() {
      this.$refs.datePicker.showPicker();
    },
    saveFormData() {
      // Сохранение значений полей в localStorage
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        birthday: this.birthday,
        gender: this.gender,
        phone: this.phone,
        email: this.email,
        password1: this.password1,
        password2: this.password2,
        showPassword1: this.showPassword1,
        showPassword2: this.showPassword2,
        isAgeAccepted: this.isAgeAccepted,
        isAgreementChecked: this.isAgreementChecked,

      };
      localStorage.setItem('registrationFormData', JSON.stringify(formData));
    },
    closeSnackbar() {
      this.$store.commit('hideSnackbar');
    },
    onPassword1Change() {
      if (this.$refs.password2.modelValue) this.$refs.password2.validate()
    },
    async registerUser() {
      if (await isFormValid(this.$refs.form)) {
        try {
          let response = await api.registerUser({
            fullname: this.lastName + ' ' + this.firstName,
            birthday: this.birthday.split('.').reverse().join('-'),
            gender: this.gender,
            email: this.email,
            phone: this.phone,
            password: this.password1
          });
          this.$store.commit('showSnackbar', {text: this.$t(response.data, {email: this.email}), color: 'success'});
          localStorage.setItem('email', this.email)
          localStorage.setItem('password', this.password1)
          localStorage.setItem('registrationFormData', JSON.stringify({}));
          this.$router.push('/login')
        } catch (error) {
          if (error.response && error.response.status === 409) {
            this.$store.commit('showSnackbar', {
              text: `User with email ${this.email} is already exists`,
              color: 'error'
            });
          } else {
            this.$store.commit('showSnackbar', {text: this.$t('registration-error'), color: 'error'});
          }
        }
      }
    },
    onPhoneInput() {
      this.phone = phoneEditor(this.phone);
    },
    formatDate() {
      let date = this.birthday.replace(/\./g, ''); // Удаляем все точки из введенной даты
      let formattedDate = '';

      if (date.length > 2) {
        formattedDate += date.substr(0, 2) + '.';
        date = date.substr(2);
      }

      if (date.length > 2) {
        formattedDate += date.substr(0, 2) + '.';
        date = date.substr(2);
      }

      this.birthday = formattedDate + date;
    }
    },

  watch:{
    selectedDate(v){
       this.birthday = v;
    }
  },
  computed: {
    snackbar() {
      return this.$store.state.snackbar
    },
    is18YearsOld() {
      if (this.birthday) {
        const birthday = new Date(this.birthday.split('.').reverse().join('-'))
        const now = new Date()
        const ageInMs = now.getTime() - birthday.getTime()
        const ageInYears = ageInMs / 1000 / 60 / 60 / 24 / 365
        return ageInYears >= 18
      } else {
        return false
      }
    },
  }
}
</script>
<style>

</style>