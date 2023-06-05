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
                v-model="subtask.contact"
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
                v-model="subtask.phone"
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
                :items="floorRange"
                v-model="subtask.floor"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>{{$t('lounge-title')}}</span>
            <v-combobox
                hide-details
                :placeholder="$t('lounge-placeholder')"
                :items="loungesRange"
                v-model="subtask.lounge"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>{{$t('priority-title')}}</span>
            <v-combobox
                hide-details
                :placeholder="$t('priority-placeholder')"
                :return-object="false"
                v-model="subtask.priority"
                :items="statusValues"
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
                v-model="subtask.description"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" block size="x-large" @click="saveSubtask(subtask)">{{ $t('save') }}</v-btn>
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
import api from "@/api";


export default {
  async created() {
    let id = this.$route.params.subtaskId;
    let promise = await api.getSubtask(id); 
    let userTasks = await api.getUserTasks();
    let mainTask = userTasks.find(_t => _t.taskId == this.$route.params.id);
    let floors = [];
    let lounges = [];

    for(let _i = mainTask.loungesFrom; _i <= mainTask.loungesTo; _i++){
      lounges.push(_i);
    }

    for(let _i = mainTask.floorsFrom; _i <= mainTask.floorsTo; _i++){
      floors.push(_i);
    }

    this.loungesRange = lounges;
    this.floorRange = floors;
    this.subtask = promise;

  },
  mounted() {
    this.subtaskId = this.$route.params.subtaskId;
  },
  data() {
    return {
      subtask:{},
      statusValues: [
        {value:'NEW',title: this.$t('status-new')},
        {value:'IN_WORK', title: this.$t('status-in-work')},
        {value:'DONE', title: this.$t('status-done')},
        {value:'CANCELED', title: this.$t('status-canceled')},
      ]
    }
  },

  methods: {
    async saveSubtask(subtask){
      let fields = {
        contact: subtask.contact,
        phone: subtask.phone,
        status: subtask.status,
        description: subtask.description,
        lounge: subtask.lounge,
        floor: subtask.floor
      }
      await api.saveSubtask(subtask.id, fields);
    },
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