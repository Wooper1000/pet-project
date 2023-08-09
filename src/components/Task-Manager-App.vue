<template>
  <v-layout>
    <TopBarApp></TopBarApp>
    <v-main scrollable class="main-content">
      <div v-if="loadTaksInProgress" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div class="text-center d-flex flex-column h-100" v-if="!tasks.length && !loadTaksInProgress">
        <v-sheet class="mt-4">
          <v-img :src="require('@/assets/imgs/no-tasks.png')"></v-img>
        </v-sheet>
        <v-sheet>
          <p class="text-h5">{{ $t('add-task') }}</p>
          {{ $t('add-task-description') }}
        </v-sheet>
        <v-sheet class="text-right mt-auto">
          <v-btn icon="pet:plus" class="mb-2" size="large" color="primary" rounded="pill"
            @click="addTaskDialogShow = true"></v-btn>
        </v-sheet>
      </div>

      <div v-if="tasks.length">
        <span class="text-h5 text-primary font-weight-bold ml-4"> {{ $t('tasks-list') }} </span>
        <div v-for="_task in tasks" :key="_task.title">
          <v-card class="rounded-xl mb-2 mt-2">
            <v-card-text>
              <v-container class="pa-0" style="user-select: none;">
                <v-row>
                  <v-col cols="1" class="py-0">
                    <v-checkbox-btn v-model="_task.selected" @click.stop></v-checkbox-btn>
                  </v-col>
                  <v-col cols="6" class="py-0 ">
                    <v-banner v-longpress="onLongPress.bind(null, _task)" @click="handleClick(_task.taskId)" class="py-0"
                      lines="two" :text="_task.title" :stacked="false" border="0"></v-banner>
                  </v-col>
                  <v-col cols="3" class="py-0">
                    <div v-if="!_task.info">
                      {{ _task.subtasksFrom }} - {{ _task.subtasksTo }} {{ $t('kv') }}
                      <v-divider></v-divider>
                      {{ _task.floorsFrom }} - {{ _task.floorsTo }} {{ $t('floor') }}
                    </div>
                  </v-col>
                  <v-col cols="1" class="py-0">
                    <v-checkbox-btn v-model="_task.selected" @click.stop></v-checkbox-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
          <v-expand-transition>
            <v-sheet class="bg-gray-light task-info" v-if="_task.info" rounded="xl">
              <table class="task-info-table">
                <tr>
                  <td>
                    <v-icon icon="pet:flag-01" color="red" />
                  </td>
                  <td> {{ _task.subtasksFrom }} - {{ _task.subtasksTo }} {{ $t('kv') }}</td>
                  <td> {{ _task.info.floorsFrom }}-{{ _task.info.floorsTo }} {{ $t('floor') }}</td>
                  <td> {{ _task.info.loungesFrom }}-{{ _task.info.loungesTo }} {{ $t('lounge-short') }}</td>
                </tr>
              </table>
              <v-list class="bg-gray-light">
                <v-list-item :title="_task.info.creator.fullname || '-'">
                  <template v-slot:prepend>
                    <v-icon icon="pet:users" class="mr-2" />
                  </template>
                </v-list-item>
                <v-list-item :title="_task.info.creator.phone || '-'">
                  <template v-slot:prepend>
                    <v-icon icon="pet:phone" class="mr-2" />
                  </template>
                </v-list-item>
                <v-list-item :title="_task.info.description || '-'">
                  <template v-slot:prepend>
                    <v-icon icon="pet:message-square" class="mr-2" />
                  </template>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-chip style="color:white !important;" class="bg-blue-aqua mr-2" v-for="_mark in _task.marks"
                      :key="_mark.id">@{{ _mark.context }}</v-chip>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-expand-transition>
        </div>
      </div>
    </v-main>
    <BottomBarApp @item-clicked="onMenuClicked" active="home"></BottomBarApp>
  </v-layout>

  <V-dialog v-model="addTaskDialogShow">
    <v-card class="rounded-xl">
      <v-card-title class="text-center">
        <span class="text-h5">{{ $t('new-task-create-title') }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              {{ $t('enter-address') }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field :label="$t('address')"
                v-model="newTask.title"></v-text-field>
            </v-col>
          </v-row>
          <!-- <v-row class="mt-0">
            <v-col class="py-0">

              <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" class="guess-map">
                <div class="guess-list">
                  test
                </div> 
                <ol-view ref="view" :center="map.center" :rotation="map.rotation" :zoom="map.zoom"
                  :projection="map.projection">
                </ol-view>
                <ol-tile-layer>
                  <ol-source-osm :attributions="false" />
                </ol-tile-layer>
                <ol-vector-layer>
                  <ol-source-vector>
                    <ol-feature>
                      <ol-geom-point :coordinates="map.guessPoint.coordinate"></ol-geom-point>
                      <ol-style>
                        <ol-style-circle :radius="map.guessPoint.radius">
                          <ol-style-fill :color="map.guessPoint.fillColor"></ol-style-fill>
                          <ol-style-stroke :color="map.guessPoint.strokeColor" :width="map.guessPoint.strokeWidth"></ol-style-stroke>
                        </ol-style-circle>
                      </ol-style>
                    </ol-feature>
                  </ol-source-vector>
                </ol-vector-layer>

                <ol-overlay :position="map.guessOverlay.coordinate" :positioning="map.guessOverlay.positioning" :offset="map.guessOverlay.offset"> 
                  <template v-slot>
                    <v-sheet :elevation="12" class="pa-4 rounded-xl">
                      {{ map.guessOverlay.text }}
                    </v-sheet>
                  </template> 
                </ol-overlay>
              </ol-map>
            </v-col>
          </v-row> -->
          <v-row>
            <v-col>
              {{ $t('enter-apartment') }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field :label="$t('from')" v-model="newTask.from"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field :label="$t('to')" v-model="newTask.to"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="primary" :loading="generateTaskInProgress" block size="x-large" @click="addTask(newTask)">{{ $t('create') }}</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </V-dialog>
  <v-dialog v-model="showSelectMenu" scrollable width="100%" transition="dialog-bottom-transition">
    <v-card rounded="xl">
      <v-card-title class="text-center text-h6">{{ $t('select') }}</v-card-title>
      <v-card-text style="max-height: 350px; padding-top: 0;">
        <v-list>
          <template v-for="(_menuItem, _idx) in menuList" :key="_idx">
            <v-list-item density="compact">
              <template v-slot:prepend v-if="_menuItem.icon">
                <v-icon :icon="_menuItem.icon.i" :color="_menuItem.icon.color" />
              </template>
              <v-list-item-title @click="_menuItem.click()">
                {{ _menuItem.title }}
              </v-list-item-title>
              <v-divider v-if="_idx < menuList.length - 1" :key="`${_idx}-divider`"></v-divider>
            </v-list-item>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
    <v-btn variant="outlined" color="primary" class="bg-white mt-2" size="large" @click="showSelectMenu = false">
      {{ $t('cancel') }}
    </v-btn>
  </v-dialog>
</template>

<script>
import TopBarApp from '@/components/Top-Bar-App.vue';
import BottomBarApp from '@/components/Bottom-Bar-App.vue';
import api from '@/api';

export default {
  created() {
    this.loadTasks();
  },
  mounted() {
    this.menuList = [...this.selectItems]
  },
  data() {
    return {
      generateTaskInProgress: false,
      showSelectMenu: false,
      menuList: [],
      addTaskDialogShow: false,
      tasks: [],
      loadTaksInProgress: true,
      selectItems: [
        {
          title: this.$t('delete'), click: () => {
            this.deleteTasks()
          }
        }
      ],
      typeTimer: null,
      map: {
        center: [30.4547467, 59.9267774],
        projection: "EPSG:4326",
        zoom: 10.75,
        rotation: 0,
        guessPoint: {
          coordinate: [30.4547467, 59.9267774],
          radius: 10,
          fillColor: "white",
          strokeColor: "red",
          strokeWidth: "2"
        },
        guessOverlay: {
          coordinate: [30.4547467, 59.9267774],
          offset: [0,-15],
          positioning: 'bottom-center',
          text: this.$t('guess-help')
        }
      },
      longPressTriggered: false,
      newTask: {
        title: '',
        from: '',
        to: ''
      }
    }
  },
  methods: {
    addressType(address) {
      if (this.typeTimer) {
        clearTimeout(this.typeTimer);
      }

      this.typeTimer = setTimeout(async () => {
        let variants = await api.guessAddress(address, 0, 5);
        let firstVar = variants.houses[0];
        
        this.map.guessPoint.coordinate[0] = firstVar.lon;
        this.map.guessPoint.coordinate[1] = firstVar.lat;

        this.map.guessOverlay.coordinate[0] = firstVar.lon;
        this.map.guessOverlay.coordinate[1] = firstVar.lat;

        this.map.center[0] = firstVar.lon;
        this.map.center[1] = firstVar.lat;
        this.map.zoom = 17;

        this.map.guessOverlay.text = firstVar.address;

        console.log(variants);
      }, 300);
    },
    async deleteTasks() {
      const deletePromises = this.tasks
        .filter(task => task.selected)
        .map(task => api.deleteTask(task.taskId));
      await Promise.all(deletePromises);
      this.showSelectMenu = false
      await this.loadTasks();
    },
    handleClick(taskId) {
      if (!this.longPressTriggered) {
        // Handle the click event only if the long press event was not triggered
        this.$router.push('/task-manager/tasks/' + taskId);
      }
      this.longPressTriggered = false; // Reset the long press flag
    },
    async onLongPress(task) {
      if (task.info) {
        task.info = null
        return
      }
      let id = task.taskId;
      let taskData = await api.getTaskInfo(id);
      task.info = taskData;
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }
      this.longPressTriggered = true; // Set the long press flag
    },
    onMenuClicked(item) {
      if (item === 'create') {
        this.addTaskDialogShow = true;
      }
      if (item === 'select') {
        this.showSelectMenu = true
      }
    },
    async addTask(task) {
      this.generateTaskInProgress = true;
      let taksCreated = await api.addTask(task);
      let floorsGenerated = await this.tryGenerateFloors(task,taksCreated.taskId);

      if(floorsGenerated.status == "fail"){
        let subIds = floorsGenerated.fullTask.subtasks.map(_sT => _sT.subtaskId);
        let joinParams = {};

        joinParams.loungeNumber = 1;
        joinParams.floorNumber = 1;
        joinParams.subtaskIds = subIds;

        await api.replaceSubTasks(taksCreated.taskId,joinParams);
      }
      this.addTaskDialogShow = false;
      // await this.loadTasks();
      this.generateTaskInProgress = false;
      this.$router.push("/task-manager/tasks/" + taksCreated.taskId);
    },
    async tryGenerateFloors(task, id){
      let structResp = null;
      let start = task.from;
      let end = task.to;
      let addr = task.title;
      let fullTask = await api.getFullTask(id);

      structResp = await api.getStructureOnAddress(addr, start, end);

      if(structResp.status !== "ok" || !structResp.lounges.length){
          return {status: "fail", fullTask};
      }

      for (let _lIdx = 0; _lIdx < structResp.lounges.length; _lIdx++){
          let _l = structResp.lounges[_lIdx]
          let joinParams = {}

          joinParams.loungeNumber  = _l.number;
          for(let _fIdx = 0; _fIdx < _l.floors.length; _fIdx++){
              let _f = _l.floors[_fIdx];
              let subIds = [];

              _f.apparts.map(_apNum => {
                  let subExsist = fullTask.subtasks.find(_sT => _sT.number == _apNum);

                  if(subExsist){
                      subIds.push(subExsist.subtaskId);
                  }
              });

              if(subIds.length){
                joinParams.floorNumber = _f.number;
                joinParams.subtaskIds = subIds;

                await api.replaceSubTasks(id,joinParams);
              }
          }
      }

      return {status: "ok"};
    },
    async loadTasks() {
      this.loadTaksInProgress = true;
      let tasksInfo = await api.getUserTasks();
      this.tasks = tasksInfo.tasks;
      this.loadTaksInProgress = false;
    }
  },

  components: {
    TopBarApp,
    BottomBarApp
  }
}
</script>

<style scoped>
.task-info {
  width: 94%;
  margin: auto;
  margin-top: -8px;
  padding: 10px;
  transition: all 0.5s ease-out;
}

.task-info-table {
  width: 100%;
  background: white;
  border: 1px solid black;
  border-radius: 8px;
  text-align: center;
}

.task-info-table td:not(:nth-child(4)) {
  border-right: 1px solid black;
}

.guess-map {
  height: 250px;
  position: relative;
  margin: auto;
}

.guess-map .guess-list {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 200px;
  width: 200px;
  padding: 10px;
}
</style>