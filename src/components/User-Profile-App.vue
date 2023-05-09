<template>
  <v-app class="px-4">
    <v-container>
      <v-row class="d-flex justify-start mb-1">
        <v-icon @click="$router.go(-1)" icon="mdi-chevron-left" />
      </v-row>
      <v-card border="false" flat >
        <v-row class="d-flex align-center">
          <v-col cols="8">
            <v-card-text class="text-h5 font-weight-bold pl-0 " :style="{ lineHeight: '28.8px' }">
              Иннокентий Пупырчатый
            </v-card-text>
            <v-card-text class="text-subtitle-1 pl-0 py-0">Пользователь</v-card-text>
            <v-card-text class="text-subtitle-1 pl-0 py-0">ID: 123456789</v-card-text>
          </v-col>
          <v-col cols="4" class="align-self-center">
            <v-avatar
                image="https://sun9-36.userapi.com/impg/9EGAXV98mSehy5617zZTg5Xw176v7I0Yd4xpXw/Hhtf-62aVL8.jpg?size=2560x1701&quality=95&sign=e9084093657bd7ec3c472da12da7ca23&type=album" size="80">
            </v-avatar>
          </v-col>
        </v-row>
      </v-card>
      <v-divider/>
      <v-row class="align-self-center mt-6">
        <v-chip variant="text" class="text-subtitle-1 text-decoration-underline">Персональные данные

        </v-chip>

        <v-badge color="red" :content="21" floating>
          <v-icon icon="mdi-bell-outline"></v-icon>
        </v-badge>
      </v-row>
      <v-row class="d-flex justify-center">

        <v-sheet width="100%"
                 rounded
                 class="mt-4"
                 color="#EEEEEE"
                 style="border-radius: 28px">

        <v-card-text class="px-3 pt-7 pb-2">
          <v-row class="ma-0 pa-0">
            <v-col cols="12 pa-0" >
              <div class="text-subtitle-2 font-weight-regular">
                Должность
              </div>
            </v-col>
          </v-row>
          <v-row align="center" class="ma-0 pa-0">
            <v-col cols="9 pa-0" >
              <div class="text-subtitle-1">
                Мастер
              </div>
            </v-col>
            <v-col cols="3" class="text-end pa-0">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider/>
          <v-card-text class="px-3 pt-2 pb-2">
            <v-row class="ma-0 pa-0">
              <v-col cols="12 pa-0" >
                <div class="text-subtitle-2 font-weight-regular">
                  Телефон
                </div>
              </v-col>
            </v-row>
            <v-row align="center" class="ma-0 pa-0">
              <v-col cols="9 pa-0" >
                <div class="text-subtitle-1">
                  +7-911-014-42-66
                </div>
              </v-col>
              <v-col cols="3" class="text-end pa-0">
                <v-icon>mdi-pencil-outline</v-icon>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider/>
          <v-card-text class="px-3 pt-2 pb-2">
            <v-row class="ma-0 pa-0">
              <v-col cols="12 pa-0" >
                <div class="text-subtitle-2 font-weight-regular">
                  Почта
                </div>
              </v-col>
            </v-row>
            <v-row align="center" class="ma-0 pa-0">
              <v-col cols="9 pa-0" >
                <div class="text-subtitle-1">
                  woper1000@gmail.com
                </div>
              </v-col>
              <v-col cols="3" class="text-end pa-0">
                <v-icon>mdi-pencil-outline</v-icon>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider/>
          <v-card-text class="px-3 pt-2 pb-2">
            <v-row class="ma-0 pa-0">
              <v-col cols="12 pa-0" >
                <div class="text-subtitle-2 font-weight-regular">
                  Пароль
                </div>
              </v-col>
            </v-row>
            <v-row align="center" class="ma-0 pa-0">
              <v-col cols="9 pa-0" >
                <div class="text-subtitle-1">
                  ● ● ● ● ● ● ● ●
                </div>
              </v-col>
              <v-col cols="3" class="text-end pa-0">
                <v-icon>mdi-pencil-outline</v-icon>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider/>
          <v-card-text class="px-3 pt-2 pb-2">
            <v-row class="ma-0 pa-0">
              <v-col cols="12 pa-0" >
                <div class="text-subtitle-2 font-weight-regular">
                  Компания
                </div>
              </v-col>
            </v-row>
            <v-row align="center" class="ma-0 pa-0">
              <v-col cols="9 pa-0" >
                <div class="text-subtitle-1">
                  ооо "Обит"
                </div>
              </v-col>
            </v-row>
          </v-card-text>
                </v-sheet>
        </v-row>
      <v-bottom-navigation grow :elevation="16" class="mb-2">
        <v-btn rounded  style="width: calc(100% / 3); background-color: rgba(190, 222, 245, 0.5)">
          <v-icon>mdi-magnify</v-icon>
          Поиск
        </v-btn>

        <v-btn rounded style="width: calc(100% / 3); background-color: rgba(43, 116, 185,0.5)">
          <v-icon>mdi-plus</v-icon>
          Создать задачу
        </v-btn>

        <v-btn rounded style="width: calc(100% / 3); background-color: rgba(190, 222, 245, 0.5)">
          <v-icon>mdi-dots-horizontal</v-icon>
          Настройки
        </v-btn>
      </v-bottom-navigation>


<!--      <section class="chart">-->
<!--        <div class="triangle" style="transform:rotate(0deg)">-->
<!--          <div class="circle" style="background:rgba(190, 222, 245, 1)">-->
<!--            <v-icon>mdi-magnify</v-icon>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="triangle" style="transform:rotate(-60deg)">-->
<!--          <div class="circle" style="background:rgba(43, 116, 185, 1)">-->
<!--            <v-icon>mdi-plus</v-icon>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="triangle" style="transform:rotate(-120deg)">-->
<!--          <div class="circle" style="background:rgba(190, 222, 245, 1)">-->
<!--            <v-icon>mdi-dots-horizontal</v-icon>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->
    </v-container>
  </v-app>

</template>

<script>
export default {
  data() {
    return {
      editingField:false,
      notificationsCount: 100, // здесь можно задать начальное значение количества оповещений
    };
  },
};
</script>

<style>
section {
  width: 12em;
  margin: auto;
}

.chart {
  position: relative;
  overflow: hidden; /* .triangle выходят за пределы */
}
section.chart {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.chart:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.triangle {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 50%;
  transform-origin: center bottom;
  overflow: hidden;
}

.circle {
  height: 100%;
  width: 100%;
  background: silver;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  transform-origin: center bottom;
  transform: rotate(120deg);
}
</style>