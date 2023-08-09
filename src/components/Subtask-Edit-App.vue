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
            <span>{{$t('state-title')}}</span>
            <v-combobox
                hide-details
                :placeholder="$t('state-placeholder')"
                :items="stateList"
                :return-object="false"
                v-model="subtask.status"
            >
            <template #prepend-inner>
              <v-icon :icon="subtask.status == 'NEW' ? 'pet:flag-01' : 'pet:flag-full'" :color="flagColors[subtask.status]"/>
            </template>
            <template v-slot:item="data">
              <v-list-item
                :key="JSON.stringify(data.item)"
                v-bind="data.props"
                :model-value="data.selected"
                :disabled="data.disabled"
                @click:close="data.parent.selectItem(data.item)"
              >
                <template v-slot:prepend>
                  <v-icon :icon="data.props.value == 'NEW' ? 'pet:flag-01' : 'pet:flag-full'" :color="flagColors[data.props.value]" />
                </template>
              </v-list-item>
            </template>
          </v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>{{$t('mark-title')}}</span>
            <v-combobox
                hide-details
                :placeholder="$t('mark-placeholder')"
                item-title="context"
                chips
                multiple
                :items="userMarks"
                :return-object="true"
                v-model="subtask.marks"
                @update:model-value="onMarksChanged"
            >
              <template v-slot:chip="data">
                <v-chip>@{{ data.item.title }}</v-chip>
              </template>
            </v-combobox>
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

  <v-snackbar
      v-model="apiMessage.visible"
      color="success"
      :timeout="apiMessage.timeout"
  >
    {{ apiMessage.text }}

  </v-snackbar>

</template>

<script>
import TopBarApp from '@/components/Top-Bar-App.vue';
import BottomBarApp from '@/components/Bottom-Bar-App.vue';
import api from "@/api";
import subtaskRemodeler from "@/utils/subtaskRemodeler";


export default {
  async created() {
    let id = this.$route.params.subtaskId;
    let promise = await api.getSubtask(id); 
    let userTasks = await api.getUserTasks();
    let mainTask = userTasks.tasks.find(_t => _t.taskId === +this.$route.params.id);
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
    this.userMarks = await api.getUserMarks();
    this.userMarks = this.userMarks.map(_m => { return {id: _m.id, context: _m.context} });
  },
  mounted() {
    this.subtaskId = this.$route.params.subtaskId;
  },
  data() {
    return {
      subtask:{},
      loungesRange: [],
      floorRange: [],
      userMarks: [],
      apiMessage: {
        visible: false,
        timeout: 1500,
        text: ''
      },
      flagColors: {
          'CANCELED': 'red',
          'DONE': 'green',
          'DEFAULT': 'primary',
          'IN_WORK': 'yellow',
          'NEW': 'gray'
      },
      stateList: [
        {value:"CANCELED", title: `${this.$t('status-canceled')}`},
        {value:"IN_WORK", title: `${this.$t('status-in-work')}`},
        {value:"DONE", title: `${this.$t('status-done')}`},
        {value:"DEFAULT", title: `${this.$t('status-new')}`},
        {value:"NEW", title: `${this.$t('state-placeholder')}`},
      ],
      statusValues: [
        {num: 0, value:'URGENT_HARD', title: this.$t('priority-urgent-hard')},
        {num: 1, value:'URGENT_EASY',title: this.$t('priority-urgent-easy')},
        {num: 2, value:'NON_URGENT_HARD', title: this.$t('priority-non-urgent-hard')},
        {num: 3, value:'NON_URGENT_EASY', title: this.$t('priority-non-urgent-easy')},
      ]
    }
  },

  methods: {
    async onMarksChanged(marks){
      let text = marks.find(_m => typeof _m == 'string');

      if(text){
        let newMark = await api.createNewMark(text);
        let oldVIdx = marks.indexOf(text);

        marks[oldVIdx] = newMark;
        this.userMarks.push(newMark);
      }
    },
    async saveSubtask(subtask){
      await api.saveSubtask(subtask.id, subtaskRemodeler(subtask));
      this.apiMessage.text = this.$t('subtask-saved-success');
      this.apiMessage.visible = true;
      setTimeout(()=> this.$router.go(-1),this.apiMessage.timeout);
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