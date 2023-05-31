<template>
    <v-main class="d-flex align-center mb-6">
      <v-container  class="text-center">
        <video class='logo' v-if="!isSafari" :src="require('@/assets/imgs/logo.webm')" autoplay muted/>
        <v-img class='safari-logo' ref="logo" :src="require('@/assets/imgs/logo.gif')" v-if="isSafari"/>
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
  },
  methods:{
    limitGifPlayback() {
      const logo = this.$refs.logo;

      // Получаем количество кадров в анимации
      const frameCount = logo.contentDocument.getElementsByTagName('image').length;

      // Устанавливаем свойство loop у анимации в значение 1
      logo.contentDocument.documentElement.setAttribute('loop', '1');

      // Задаем продолжительность анимации в миллисекундах
      const animationDuration = frameCount * 100; // 100 миллисекунд на кадр

      // Ожидаем указанную продолжительность анимации, а затем останавливаем ее
      setTimeout(function() {
        logo.contentDocument.defaultView.stop();
      }, animationDuration);
    }
  }
};
</script>

<style>
.logo{
  width: 90%;
  max-width: 800px;
}

.safari-logo {
  width: 60%;
  margin: auto;
  margin-bottom: 40px;
}
</style>