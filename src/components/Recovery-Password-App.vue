<template>
    <v-container class="container" >
      <v-row class="d-flex justify-start mb-2">
        <v-icon @click="$router.go(-1)" icon="mdi-chevron-left"/>
      </v-row>
      <v-row class="d-flex justify-start mb-2">
        <h3>{{ $t('password-recovery') }}</h3>
      </v-row>
      <v-row class="d-flex justify-start mb-2 ">
        <div class="mb-4">
          <span class="text-subtitle-1">{{ $t('enter-registration-email') }}</span>
        </div>
      </v-row>

      <v-form @submit.prevent="getCode" ref="form">
        <v-row class="d-flex justify-start">
          <v-text-field
              autofocus
              clearable
              clear-icon="mdi-close"
              variant="solo"
              validate-on="submit"
              v-model.lazy="email"
              :rules="rules.email"
              label="E-mail"
              required
              type="email"
              @keydown.enter="getCode"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-btn
              class="my-3 font-weight-bold"
              block
              size="x-large"
              variant="elevated"
              color="primary"
              @click="getCode"
          >
          {{ $t('get-code') }}
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