<template>
    <v-main class="d-flex align-center mb-6">
      <v-container  class="text-center">
        <video class='logo' v-if="!isSafari" :src="require('@/assets/imgs/logo.webm')" autoplay muted/>
        <v-img class='safari-logo' :src="require('@/assets/imgs/logo.png')" v-if="isSafari"/>
        <h1 class="text-primary">{{ $t('greeting') }}</h1>
        <h4 class="mt-7">
         {{ $t('app-description') }}
        </h4>
      </v-container>
    </v-main>
    <v-footer app>
      <v-container>
            <v-btn class="my-3 font-weight-bold" block size="x-large" variant="elevated" color="primary" @click="$router.push('/registration')">{{ $t('signup') }}</v-btn>
            <v-btn class="my-3 font-weight-bold" block size="x-large" variant="outlined" color="primary" @click="$router.push('/login')">{{ $t('btn-sign-in') }}</v-btn>
      </v-container>
    </v-footer>
</template>
<script>
export default {
  name: "WelcomeScreenApp",
  created() {
    this.isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
  },
  data(){
    return {
      isSafari:false
    }
  }
};
</script>

<style>
.logo{
  width: 90%;
}

.safari-logo {
  width: 60%;
  margin: auto;
  margin-bottom: 40px;
}
</style>