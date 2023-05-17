<template>
    <v-main class="d-flex align-center mb-6">
      <v-container  class="text-center" >
        <h1 class="text-primary">Добро пожаловать в [название]</h1>
        <h4 class="mt-7">
         Приложение для [Описание на 2-3 сточки]
        </h4>
      </v-container>
    </v-main>
    <v-footer app>
      <v-container>
            <v-btn class="my-3 font-weight-bold" block size="x-large" variant="elevated" color="primary" @click="$router.push('/registration')">Зарегистрироваться</v-btn>
            <v-btn class="my-3 font-weight-bold" block size="x-large" variant="outlined" color="primary" @click="$router.push('/login')">Вход</v-btn>
      </v-container>
    </v-footer>
</template>
<script>
export default {
  name: "WelcomeScreenApp"
};
</script>

<style>

</style>