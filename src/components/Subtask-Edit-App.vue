<template>
  <v-layout>
    <TopBarApp></TopBarApp>
    <v-main scrollable>
      <v-container>
        <v-row class="top-row mb-5">
            <v-icon icon="pet:chevron-left" @click="$router.go(-1)" />
        </v-row>
          <v-row>
            <p class="text-h5 font-weight-bold text-lowercase"> {{ subtask.number}} {{ $t('subtask-title') }}</p>
          </v-row>
        <v-row>
          <v-col class="py-2">
            <span>{{$t('contact-face-title')}}</span>
            <v-text-field
                class="py-0"
                hide-details
                :placeholder="$t('fio-placeholder')"
                type="text"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-2">
            <span>{{$t('phone-title')}}</span>
            <v-text-field
                class="py-0"
                hide-details
                :placeholder="$t('phone-placeholder')"
                type="text"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>{{$t('floor-title')}}</span>
            <v-combobox
                hide-details
                :placeholder="$t('floor-placeholder')"
                :items="[1,2,3,4,5]"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>{{$t('lounge-title')}}</span>
            <v-combobox
                hide-details
                :placeholder="$t('lounge-placeholder')"
                :items="[1,2,3,4,5]"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>{{$t('status-title')}}</span>
            <v-combobox
                hide-details
                :placeholder="$t('status-placeholder')"
                :items="['Новая','В работе','Окончена']"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>{{$t('executor-title')}}</span>
            <v-spacer></v-spacer>
            <span class="text-primary"><v-icon icon="pet:plus"/> {{$t('add-executor')}}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>{{$t('mark-title')}}</span>
            <v-combobox
                hide-details
                :placeholder="$t('mark-placeholder')"
                :items="[1,2,3,4,5]"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>{{$t('comment-title')}}</span>
            <v-textarea
                :placeholder="$t('comment-placeholder')"
                :counter="3000"
                :maxlength="3000"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <BottomBarApp @item-clicked="onMenuClicked"></BottomBarApp>
  </v-layout>

</template>

<script>
import TopBarApp from '@/components/Top-Bar-App.vue';
import BottomBarApp from '@/components/Bottom-Bar-App.vue';
// import api from "@/api";


export default {
  // async created() {
  //   let promise = await api.getSubtask(this.subtaskId);                После реализации бэком эндпоинта получения subtask по id
  //   this.subtask = promise
  // },
  mounted() {
    this.subtaskId = this.$route.params.subtaskId;
    console.log(this.subtaskId)
  },
  data() {
    return {
      comment: '',
    subtask:{
      "number": 1,
      "subtaskId": 41,
      "priority": null,
      "status": "NEW",
      "floor": 1,
      "lounge": 1
    },

    }
  },

  methods: {


    onMenuClicked(item){
      if(item === 'select'){
        this.showSelectMenu = true;
      }
    },

  },
  components: {
    TopBarApp,
    BottomBarApp
  }
}
</script>

<style scoped>

</style>