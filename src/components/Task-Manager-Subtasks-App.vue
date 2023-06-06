<template>
    <v-layout>
        <TopBarApp></TopBarApp>
        <v-main scrollable>
            <v-skeleton-loader
                v-if="!fullTask.subtasks"
                type="heading,list-item-three-line@20"
            ></v-skeleton-loader>
            <v-container v-else>
                <v-row class="top-row">
                    <v-col cols="2">
                        <v-icon icon="pet:chevron-left" @click="$router.go(-1)" />
                    </v-col>
                    <v-col cols="10">
                        <p class="h3">{{ fullTask.title }}</p>
                    </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <table>
                      <tr v-for="(_subtask,_subIdx) in fullTask.subtasks" :key="_subtask" height="40px">
                        <td :rowspan="_loungesCount" v-if="_loungesCount = detectNewLevel(_subIdx,fullTask.subtasks,'lounge')" class="lounge-cell bg-blue-aqua">
                          {{ _subtask.lounge }} {{ $t('lounge-title') }}
                        </td>
                        <td class="check-cell">
                          <v-checkbox-btn v-model="_subtask.selected"></v-checkbox-btn>
                        </td>
                        <td @click="$router.push(`/task-manager/tasks/${taskId}/${_subtask.subtaskId}/edit`)">
                          {{ $t('subtask-title') }} {{ _subtask.number}}
                        </td>
                        <td >
                          <v-icon :class="getFlagColor(_subtask.priority) ? 'text-' + getFlagColor(_subtask.priority) : 'd-none'">mdi-flag-variant</v-icon>
                        </td>
                        <td class="check-cell">
                          <v-checkbox-btn v-model="_subtask.selected"></v-checkbox-btn>
                        </td>
                        <td :rowspan="_floorsCount" v-if="_floorsCount = detectNewLevel(_subIdx,fullTask.subtasks,'floor')" class="floor-cell bg-blue-sky">
                          <v-checkbox :label="_subtask.floor + ' ' + $t('floor-title')" @click="selectFloor($event,_subtask)"></v-checkbox>
                        </td>
                      </tr>
                    </table>
                  </v-col>
                </v-row>
            </v-container>
        </v-main>
        <BottomBarApp @item-clicked="onMenuClicked"></BottomBarApp>
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
            <v-btn variant="outlined" color="primary" class="bg-white mt-2" size="large" @click="closeSelectMenu()">
                {{ $t('cancel') }}
            </v-btn>
        </v-dialog>
    </v-layout>
    <V-dialog v-model="showFloorGenerateDialog">
        <v-card class="rounded-xl">
            <v-card-title class="text-center">
                <span class="text-h5">{{ $t('generate-title') }}</span>
            </v-card-title>
            <v-card-text class="pa-0">
                <v-container class="pa-1">
                    <v-row>
                        <v-col>
                            <v-list>
                                <v-list-item v-for="_m in generate.messages" :key="_m" :subtitle="_m.info">
                                    <template v-slot:prepend>
                                        <v-progress-circular
                                        indeterminate
                                        color="primary"
                                        :size="16"
                                        v-if="_m.inProgress"
                                        ></v-progress-circular>
                                        <v-icon icon="mdi-check mr-2" color="success" v-if="_m.success"/>
                                        <v-icon icon="mdi-close mr-2" color="danger" v-if="_m.fail"/>
                                    </template>
                                    <template v-slot:title>
                                        {{ _m.text }}
                                    </template>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
      </v-card>
    </V-dialog>
    <V-dialog v-model="showJoinDialog">
        <v-card class="rounded-xl">
            <v-card-title class="text-center">
                <span class="text-h5">{{ $t('join') }}</span>
            </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col>
                        {{ $t('enter-floor') }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            :label="$t('floor-title')"
                            v-model="join.floor"
                            type="number"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        {{ $t('enter-lounge') }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                                :label="$t('lounge-title')"
                                v-model="join.lounge"
                                type="number"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn color="primary" :loading="join.inProgress" block size="x-large" @click="joinFloorsLounges(join)">{{ $t('create') }}</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
      </v-card>
    </V-dialog>
    <v-dialog v-model="showMarkDialog">
        <v-card class="rounded-xl">
            <v-card-title class="text-center pb-0">
                <span class="text-h6">{{ $t('add-mark') }}</span>
            </v-card-title>
            <v-card-text class="pt-0">
                <v-container>
                <v-row>
                    <v-col>
                        {{ $t('enter-mark') }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            :label="$t('mark-title')"
                            v-model="addMark.newMark"
                            type="text"
                            hide-details
                            @keypress.enter="addMark.all.push({text: addMark.newMark}); addMark.newMark = ''"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        v-for="(_mark, i) in addMark.all"
                        :key="_mark.text"
                        cols="auto"
                        class="py-1 pe-0 text-white"
                        >
                        <v-chip
                            class="bg-blue-dark"
                            style="color:white"
                            @click:close="addMark.all.splice(i, 1)"
                        >
                            @{{ _mark.text }}
                        </v-chip>
                        </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn color="primary" :loading="addMark.inProgress" block size="x-large" @click="addMarksToSelected(addMark)">{{ $t('add') }}</v-btn>
                    </v-col>
                </v-row>
            </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import TopBarApp from '@/components/Top-Bar-App.vue';
import BottomBarApp from '@/components/Bottom-Bar-App.vue';
import api from '@/api';
import subtaskRemodeler from "@/utils/subtaskRemodeler";


export default {
    created() {
        this.loadTaskInfo();
    },

    data() {
        return {
            fullTask: {},
            generate: {
                messages: []
            },
            addMark: {all: []},
            showSelectMenu: false,
            showJoinDialog: false,
            showFloorGenerateDialog: false,
            join: {
                floor: null,
                lounge: null,
                inProgress: false
            },
            showMarkDialog: false,
            menuList: [],
            priorityMenuItems: [
                {icon: {i:'pet:flag-01',color:'red'},value:"URGENT_HARD", title: `${this.$t('priority-urgent-hard')}`, click: ()=> { this.setPriority("URGENT_HARD"); }},
                {icon: {i:'pet:flag-01',color:'orange'},value:"URGENT_EASY", title: `${this.$t('priority-urgent-easy')}`, click: ()=> { this.setPriority("URGENT_EASY"); }},
                {icon: {i:'pet:flag-01',color:'green'},value:"NON_URGENT_HARD", title: `${this.$t('priority-non-urgent-hard')}`, click: ()=> { this.setPriority("NON_URGENT_HARD"); }},
                {icon: {i:'pet:flag-01',color:'black'},value:"NON_URGENT_EASY", title: `${this.$t('priority-non-urgent-easy')}`, click: ()=> { this.setPriority("NON_URGENT_EASY"); }},
            ],
            selectItems: [
                {title: this.$t('generate-floors'), click: () => { this.tryGenerateFloors() }},
                {title: this.$t('join-floors-lounge'), click: () => { this.showJoinDialog = true; }},
                {title: this.$t('add-mark'), click: () => { this.showMarkDialog = true; }},
                {title: this.$t('change-priority'), click: () => { this.menuList = this.priorityMenuItems; }},
                {title: this.$t('show-on-map'), click: () => {}},
                {title: this.$t('set-signal'), click: () => {}},
                {title: this.$t('paste'), click: () => {}},
                {title: this.$t('copy'), click: () => {}},
                {title: this.$t('edit'), click: () => {}},
                {title: this.$t('setup'), click: () => {}},
            ]
        }
    },
    mounted(){
        this.menuList = [...this.selectItems];
        // Получение параметра 'id' из объекта $route
        this.taskId = this.$route.params.id;
          },
    methods: {
      getFlagColor(priority){
        if(priority) {
          return this.priorityMenuItems.find(item => item.value === priority)?.icon.color;
        }
        else return null
      },
        closeSelectMenu(){
          this.showSelectMenu = false;
          this.menuList = this.selectItems;
        },
      setPriority(priority) {
        const selectedTasks = this.getSelectedSubs();
        const savePromises = selectedTasks.map(item => {
          return new Promise(resolve => {
            const updatedItem = { ...item, priority: priority };
            this.fullTask.subtasks = null
            api.saveSubtask(item.subtaskId, subtaskRemodeler(updatedItem))
                .then(response => {
                  resolve(response);
                })
                .catch(error => {
                  console.log(error)
                  resolve(null); // Resolve with null in case of an error
                });
          });
        });
        Promise.all(savePromises).then(result=>{
         if(result) {
           this.closeSelectMenu();
           this.loadTaskInfo();
         }
        })
      },
        addMarksToSelected(markData){
            console.log(markData);
            this.showMarkDialog = false;
        },
        detectNewLevel(_subIdx,allTasks,level){
            let prevSub = allTasks[_subIdx - 1];
            let curSub = allTasks[_subIdx];

            //if new level
            if(!prevSub || prevSub[level] !== curSub[level]){
                let levelCount = allTasks.filter(_sT => {
                    if(level === 'lounge'){
                        return _sT.lounge === curSub.lounge;
                    }else{
                        return _sT.lounge === curSub.lounge && _sT.floor === curSub.floor;
                    }
                }).length;

                return levelCount;
            }else{
                return 0;
            }
        },
        selectFloor(evt, subtask){
            let selected = evt.target.checked;
            let floor = this.fullTask.subtasks.filter(_t =>_t.floor === subtask.floor && _t.lounge === subtask.lounge)
            floor.forEach(_task => {
                _task.selected = selected;
            });
        },
        async tryGenerateFloors(){
          this.showSelectMenu = false;
          let structResp = null;
            let tasks = await api.getUserTasks();
            let targetTask = tasks.find(_t => _t.taskId === this.fullTask.taskId);
            let start = targetTask.subtasksFrom;
            let end = targetTask.subtasksTo;

            this.generate.messages = [];
            this.showFloorGenerateDialog = true;
            this.generate.messages.push({text: 'Ищем информацию по зданию', inProgress: true});
            structResp = await api.getStructureOnAddress(this.fullTask.title, start, end);
            this.generate.messages[0].inProgress = false;
            if(structResp.status === "ok" && structResp.lounges.length){
                this.generate.messages[0].success = true;
                this.generate.messages[0].info = `[${start} - ${end}] | ${structResp.lounges.length} подъездов`;
            }else{
                this.generate.messages[0].fail = true;
                this.generate.messages[0].info = `Не удалось найти информацию.`;
                return;
            }

            for (let _lIdx = 0; _lIdx < structResp.lounges.length; _lIdx++){
                let _l = structResp.lounges[_lIdx]
                let joinParams = {}
                let msg = {text: '', inProgress: true};

                msg.text = `Подъезд ${_l.number}`;
                joinParams.loungeNumber  = _l.number;
                this.generate.messages.push(msg);
                for(let _fIdx = 0; _fIdx < _l.floors.length; _fIdx++){
                    let _f = _l.floors[_fIdx];
                    let _arr = _l.floors;
                    let subIds = _f.apparts.map(_ap => this.fullTask.subtasks.find(_sT => _sT.number == _ap).subtaskId);
                    let _msgObj = this.generate.messages[_lIdx+1];

                    joinParams.floorNumber = _f.number;
                    joinParams.subtaskIds = subIds;

                    _msgObj.info = `Этажи [${_fIdx+1}/${_l.floors.length}] `;
                    await api.replaceSubTasks(this.fullTask.taskId,joinParams);
                    if(_fIdx === _arr.length-1){
                        _msgObj.info = `Этажи [${_fIdx+1}/${_l.floors.length}][Готово]`;
                        _msgObj.inProgress = false;
                        _msgObj.success = true;
                    }else{
                        await this.sleep(100);
                    }
                }
            }
          this.fullTask.subtasks = null
          this.showFloorGenerateDialog = false;
            await this.loadTaskInfo();

        },
        async sleep(time){
            return new Promise(resolve => setTimeout(()=> {resolve()},time));
        },
        onMenuClicked(item){
            if(item === 'select'){
                this.showSelectMenu = true;
            }
        },
        getSelectedSubs(){
            return this.fullTask.subtasks.filter(_sub => _sub.selected);
        },
        async joinFloorsLounges({floor, lounge}){
            let subTasks = this.getSelectedSubs();
            let joinParams = {loungeNumber: lounge, floorNumber: floor};

            joinParams.subtaskIds = subTasks.map(_t => _t.subtaskId);

            this.join.inProgress = true;
            await api.replaceSubTasks(this.fullTask.taskId,joinParams);
            this.join.inProgress = false;
            await this.loadTaskInfo();
            this.showSelectMenu = false;
            this.showJoinDialog = false;
        },
        async loadTaskInfo() {
          let promise = await api.getFullTask(this.$route.params.id);
          promise.subtasks = promise.subtasks.sort((a,b) => a.lounge - b.lounge || a.floor - b.floor);
          this.fullTask = promise
        }
    },
    components: {
        TopBarApp,
        BottomBarApp
    }
}
</script>

<style scoped>
.top-row {
    position: sticky;
    top: -1px;
    z-index: 99;
    background: white;
}
.sub-cotainer {
    padding: 0px;
}

.lounge-container {
  width: 100%;
  display: block;
  height: fit-content;
}

.lounge-title {
    writing-mode: vertical-lr;
    text-orientation: mixed;
    transform: rotate(180deg);
    text-align: center;
    position: sticky;
    top: calc(50% - 40px);
    margin: 15px 0px;
}

.floot-title-check {
    display: inline-block;
    transform: rotate(90deg);
    margin-top: -15px;
}
.floor-title-label {
    margin-left: 9px;
    display: inline-block;
    writing-mode: vertical-lr;
    text-orientation: mixed;
    transform: rotate(180deg);
    text-align: center;
}
.container {
  display: flex;
}

.column1 {
  width: 44px;
  padding-left: 10px;
}

.column2 {
  flex-grow: 1;
}

.column1-f {
  flex-grow: 1;

}

.column2-f {
  width: 44px;
  padding-left: 2px;
}

.block {
  margin-bottom: 10px;
}

.lounge-cell,
.floor-cell {
  width: 44px;
  writing-mode: vertical-lr;
  padding: 15px 0px;
}

table {
  width: 100%;
}

.check-cell {
  width: 40px;
}
</style>