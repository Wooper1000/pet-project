<template>
  <v-layout>
    <TopBarApp></TopBarApp>
    <v-main scrollable class="main-content">
      <div class="text-center d-flex flex-column h-100" v-if="!tasks.length">
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
          <v-card
              class="rounded-xl mb-2 mt-2"
          >
            <v-card-text>
              <v-container class="pa-0" style="user-select: none;">
                <v-row>
                  <v-col cols="1" class="py-0">
                    <v-checkbox-btn v-model="_task.selected" @click.stop></v-checkbox-btn>
                  </v-col>
                  <v-col cols="6" class="py-0 ">
                    <v-banner v-longpress="onLongPress.bind(null, _task)" @click="handleClick(_task.taskId)"
                              class="py-0"
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
                    <v-icon icon="pet:flag-01" color="red"/>
                  </td>
                  <td> 1-2344 кв</td>
                  <td> 1-122 эт</td>
                  <td> 1-34 под</td>
                </tr>
              </table>
              <v-list class="bg-gray-light">
                <v-list-item title="Иванов Иван">
                  <template v-slot:prepend>
                    <v-icon icon="pet:users" class="mr-2"/>
                  </template>
                </v-list-item>
                <v-list-item title="+74562342233">
                  <template v-slot:prepend>
                    <v-icon icon="pet:phone" class="mr-2"/>
                  </template>
                </v-list-item>
                <v-list-item title="позвонить за час до прихода">
                  <template v-slot:prepend>
                    <v-icon icon="pet:message-square" class="mr-2"/>
                  </template>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-chip style="color:white !important;" class="bg-blue-aqua mr-2">@ремонт</v-chip>
                    <v-chip style="color:white !important;" class="bg-blue-aqua">@собака</v-chip>
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
              <v-text-field
                  :label="$t('address')"
                  v-model="newTask.title"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              {{ $t('enter-apartment') }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                  :label="$t('from')"
                  v-model="newTask.from"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  :label="$t('to')"
                  v-model="newTask.to"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="primary" block size="x-large" @click="addTask(newTask)">{{ $t('create') }}</v-btn>
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
          <template v-for="(_menuItem,_idx) in menuList" :key="_idx">
            <v-list-item density="compact">
              <template v-slot:prepend v-if="_menuItem.icon">
                <v-icon :icon="_menuItem.icon.i" :color="_menuItem.icon.color"/>
              </template>
              <v-list-item-title @click="_menuItem.click()">
                {{ _menuItem.title }}
              </v-list-item-title>
              <v-divider
                  v-if="_idx < menuList.length - 1"
                  :key="`${_idx}-divider`"
              ></v-divider>
            </v-list-item>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
    <v-btn variant="outlined" color="primary" class="bg-white mt-2" size="large" @click="showSelectMenu=false">
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
      showSelectMenu: false,
      menuList: [],
      addTaskDialogShow: false,
      tasks: [],
      selectItems: [
        {
          title: this.$t('delete'), click: () => {
            this.deleteTasks()
          }
        }
      ],
      longPressTriggered: false,
      newTask: {
        title: '',
        from: '',
        to: ''
      }
    }
  },
  methods: {
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
      await api.addTask(task);
      this.addTaskDialogShow = false;
      await this.loadTasks();
    },
    async loadTasks() {
      let tasks = await api.getUserTasks();
      this.tasks = tasks;
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
</style>