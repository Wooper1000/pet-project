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
                  <v-col class="pa-0">
                    <div class="subs-container" v-scroll.self="onScrollSubs">
                        <table>
                            <tr v-for="(_subtask,_subIdx) in fullTask.subtasks" :key="_subtask" height="40px">
                                <td :rowspan="_loungesCount" v-if="_loungesCount = detectNewLevel(_subIdx,fullTask.subtasks,'lounge')" class="lounge-cell bg-blue-aqua">
                                    <div class="title-scroll-container">
                                        <div class="sticky-lounge">
                                            <div class="vertical-title"> {{ _subtask.lounge }} {{ $t('lounge-title') }}</div>
                                            <v-checkbox @click="selectLounge($event,_subtask)" density="compact" class="floor-check"></v-checkbox>
                                        </div>
                                    </div>
                                </td>
                                <td class="check-cell">
                                <v-checkbox-btn v-model="_subtask.selected"></v-checkbox-btn>
                                </td>
                                <td @click="$router.push(`/task-manager/tasks/${taskId}/${_subtask.subtaskId}/edit`)">
                                {{ _subtask.number}}
                                </td>
                                <td>
                                    <v-icon v-if="_subtask.status == 'NEW'" :color="flagColors[_subtask.status]">pet:flag-01</v-icon>
                                    <v-icon v-else :color="flagColors[_subtask.status]">pet:flag-full</v-icon>
                                </td>
                                <td >
                                    <v-icon icon="pet:message-square" :color="_subtask.isDescribed ? 'primary' : 'gray'"/>
                                </td>
                                <td>
                                    <span :class="'text-' + priorityShorts[_subtask.priority].color">{{ priorityShorts[_subtask.priority].text }}</span>
                                </td>
                                <td>
                                    <v-icon icon="pet:hash"  :color="_subtask.isMarked ? 'primary' : 'gray'"/>
                                </td>
                                <td class="check-cell">
                                    <v-checkbox-btn v-model="_subtask.selected"></v-checkbox-btn>
                                </td>
                                <td :rowspan="_floorsCount" v-if="_floorsCount = detectNewLevel(_subIdx,fullTask.subtasks,'floor')" class="floor-cell bg-blue-sky">
                                    <div class="title-scroll-container">
                                        <div class="sticky-floor">
                                            <div class="vertical-title">{{ _subtask.floor + ' ' + $t('floor-title') }}</div>
                                            <v-checkbox @click="selectFloor($event,_subtask)" density="compact" class="floor-check"></v-checkbox>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="loadMoreInProgress">
                                <td colspan="7" class="text-center">
                                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                </td>
                            </tr>
                        </table>
                    </div>
                  </v-col>
                </v-row>
            </v-container>
        </v-main>
        <BottomBarApp @item-clicked="onMenuClicked"></BottomBarApp>
        <v-dialog v-model="showSelectMenu" scrollable width="100%" transition="dialog-bottom-transition">
            <v-card rounded="xl">
                <v-card-title class="text-center text-h6">{{ $t('select') }}</v-card-title>
                <v-card-text style="max-height: 350px; padding-top: 0;">
                    <v-radio-group v-if="menuList.type == 'radio'" class="text-black" @update:model-value="menuList.onValueUpdate">
                        <v-radio :label="_menuItem.title" :value="_menuItem.value" v-for="(_menuItem,_idx) in menuList.items" :key="_idx"></v-radio>
                    </v-radio-group>
                    <v-list v-if="menuList.type == 'list'">
                        <template v-for="(_menuItem,_idx) in menuList.items" :key="_idx">
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
                    <v-col class="py-0">
                        <v-text-field
                            :label="$t('mark-title')"
                            v-model="addMark.new"
                            hide-details
                            @keydown.enter="addNewMark(addMark.new)"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="pt-0 pb-1">
                        <v-list :items="userMarks" item-title="context" item-value="id" select-strategy="classic" v-model:selected="addMark.all" height="250">
                            <template v-slot:prepend="{ isSelected }">
                                <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
                                </v-list-item-action>
                            </template>
                            <template v-slot:append="{item}">
                                <v-list-item-action end>
                                    <v-icon color="red" icon="pet:x" @click.stop="removeMark(item)"/>
                                </v-list-item-action>
                            </template>
                        </v-list>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn color="primary" :loading="addMark.inProgress" block size="x-large" @click="addMarksToSelected(addMark.all)">{{ $t('add') }}</v-btn>
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


export default {
    created() {
        this.loadTaskInfo();
        this.loadUserInfo();
    },

    data() {
        const flagColors = {
                'CANCELED': 'red',
                'DONE': 'green',
                'DEFAULT': 'primary',
                'IN_WORK': 'yellow',
                'NEW': 'gray'
            }

        return {
            fullTask: {},
            generate: {
                messages: []
            },
            flagColors,
            priorityShorts: {
                "null": {},
                "URGENT_HARD": {text:this.$t("priority-urgent-hard-short"),color: 'red'},
                "URGENT_EASY": {text:this.$t("priority-urgent-easy-short"),color: 'orange'},
                "NON_URGENT_HARD": {text:this.$t("priority-non-urgent-hard-short"),color: 'blue'},
                "NON_URGENT_EASY": {text:this.$t("priority-non-urgent-easy-short"),color: 'green'}
            },
            addMark: {all: [],new: ''},
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
            userMarks: [],
            loadMoreInProgress: false,
            subsPerPage: 20,
            priorityMenuItems: {
                items: [
                    {value:"URGENT_HARD", title: `${this.$t('priority-urgent-hard')}`},
                    {value:"URGENT_EASY", title: `${this.$t('priority-urgent-easy')}`},
                    {value:"NON_URGENT_HARD", title: `${this.$t('priority-non-urgent-hard')}`},
                    {value:"NON_URGENT_EASY", title: `${this.$t('priority-non-urgent-easy')}`},
                    {value: null, title: `${this.$t('priority-none')}`},
                ],
                type: 'radio',
                onValueUpdate: this.setPriority
            },
            statusItems: {
                items: [
                    {icon: {i:'pet:flag-full',color:flagColors.CANCELED},value:"CANCELED", title: `${this.$t('status-canceled')}`, click: ()=> { this.setStatus("CANCELED"); }},
                    {icon: {i:'pet:flag-full',color:flagColors.IN_WORK},value:"IN_WORK", title: `${this.$t('status-in-work')}`, click: ()=> { this.setStatus("IN_WORK"); }},
                    {icon: {i:'pet:flag-full',color:flagColors.DONE},value:"DONE", title: `${this.$t('status-done')}`, click: ()=> { this.setStatus("DONE"); }},
                    {icon: {i:'pet:flag-full',color:flagColors.DEFAULT},value:"DEFAULT", title: `${this.$t('status-new')}`, click: ()=> { this.setStatus("DEFAULT"); }},
                    {icon: {i:'pet:flag-01',color:flagColors.NEW},value:"NEW", title: `${this.$t('status-none')}`, click: ()=> { this.setStatus("NEW"); }},
                ],
                type: 'list'
            },
            selectItems: {
                items: [
                    {title: this.$t('generate-floors'), click: () => { this.tryGenerateFloors() }},
                    {title: this.$t('join-floors-lounge'), click: () => { this.showJoinDialog = true; }},
                    {title: this.$t('add-mark'), click: () => { this.showMarkDialog = true; }},
                    {title: this.$t('change-status'), click: () => { this.menuList = this.statusItems; }},
                    {title: this.$t('change-priority'), click: () => { this.menuList = this.priorityMenuItems; }},
                    {title: this.$t('show-on-map'), click: () => {}},
                    {title: this.$t('set-signal'), click: () => {}},
                    {title: this.$t('paste'), click: () => {}},
                    {title: this.$t('copy'), click: () => {}},
                    {title: this.$t('edit'), click: () => {}},
                    {title: this.$t('setup'), click: () => {}},
                ],
                type: 'list'
            }
        }
    },
    mounted(){
        this.menuList = this.selectItems;
        // Получение параметра 'id' из объекта $route
        this.taskId = this.$route.params.id;
          },
    methods: {
        async loadMoreSubsIfNeed(){
            if(this.loadMoreInProgress){ return; }
            this.loadMoreInProgress = true;

            let from = this.fullTask.subtasks.length;
            let promise = await api.getFullTask(this.$route.params.id, from, this.subsPerPage);
            
            this.fullTask.subtasks = this.fullTask.subtasks.concat(promise.subtasks);
            this.loadMoreInProgress = false;
        },
        onScrollSubs(e){
            return e;
            // let container = e.target;

            // if (container.offsetHeight + container.scrollTop >= container.scrollHeight - 150) {
            //     this.loadMoreSubsIfNeed();
            // }
        },
        closeSelectMenu(){
          this.showSelectMenu = false;
          this.menuList = this.selectItems;
        },
      setPriority(priority) {
        const selectedTasks = this.getSelectedSubs();
        let updateData = {subtaskIds: [],priority};

        this.closeSelectMenu();
        selectedTasks.forEach(async _subTask => {
            _subTask.priority = priority;
            updateData.subtaskIds.push(_subTask.subtaskId);
        });

        api.upadteSubtasks(updateData);
      },
      setStatus(status){
        const selectedTasks = this.getSelectedSubs();
        let updateData = {subtaskIds: [],status};

        this.closeSelectMenu();
        selectedTasks.forEach(async _subTask => {
            _subTask.status = status;
            updateData.subtaskIds.push(_subTask.subtaskId);
        });

        api.upadteSubtasks(updateData);
      },
        async addNewMark(text){
            let mark = await api.createNewMark(text);

            this.addMark.all.push(mark.id);
            this.addMark.new = '';
            this.userMarks.push(mark);
        },
        async removeMark(mark){
            let idx = this.userMarks.findIndex(_m => _m.id == mark.id);
            
            await api.removeMark([mark.id]);
            this.userMarks.splice(idx,1);
        },
        async updateLocalSubsData(){
            let task = await api.getFullTask(this.fullTask.taskId);

            this.fullTask = task;
        },
        async addMarksToSelected(markIds){
            let subtasks = this.getSelectedSubs();
            let subtaskIds = subtasks.map(_s => _s.subtaskId);

            this.showMarkDialog = false;
            this.closeSelectMenu();
            await api.upadteSubtasks({subtaskIds, markIds});
            this.updateLocalSubsData();
        },
        detectNewLevel(_subIdx,allTasks,level){
            let prevSub = allTasks[_subIdx - 1];
            let curSub = allTasks[_subIdx];
            let newLevel = false;
            let isLounge = level === 'lounge';

            if(!prevSub){ newLevel = true; }
            else {
                if(isLounge){
                    if(prevSub[level] !== curSub[level]){ newLevel = true; }
                }else{
                    if(prevSub[level] !== curSub[level] || prevSub.lounge != curSub.lounge){ newLevel = true; }
                }
            }
        
            //if new level
            if(newLevel){
                let levelCount = allTasks.filter(_sT => {
                    if(isLounge){
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
        selectLounge(evt, subtask){
            let selected = evt.target.checked;
            let floor = this.fullTask.subtasks.filter(_t =>_t.lounge === subtask.lounge)
            floor.forEach(_task => {
                _task.selected = selected;
            });
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
            let targetTask = tasks.tasks.find(_t => _t.taskId === this.fullTask.taskId);
            let start = targetTask.subtasksFrom;
            let end = targetTask.subtasksTo;
            let allAparts = [];

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
                    let subIds = [];
                    let _msgObj = this.generate.messages[_lIdx+1];

                    _f.apparts.map(_apNum => {
                        let subExsist = this.fullTask.subtasks.find(_sT => _sT.number == _apNum);

                        if(subExsist){
                            subIds.push(subExsist.subtaskId);
                        }
                        allAparts.push(_apNum);
                    });

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
            let replaceToZero = [];
            let joinParams = {};

            this.fullTask.subtasks.forEach(_sub => {
                if(!~allAparts.indexOf(_sub.number)){
                    replaceToZero.push(_sub.subtaskId);
                }
            });
            if(replaceToZero.length){
                joinParams.floorNumber = 0;
                joinParams.loungeNumber = 0;
                joinParams.subtaskIds = replaceToZero;
                await api.replaceSubTasks(this.fullTask.taskId,joinParams);
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
          promise.subtasks = promise.subtasks.filter(_sub => _sub.floor != 0 && _sub.lounge != 0).sort((a,b) => a.lounge - b.lounge || a.floor - b.floor);
          this.fullTask = promise
        },
        async loadUserInfo(){
            this.userMarks = await api.getUserMarks();
            this.userMarks = this.userMarks.map(_m => { return {id: _m.id, context: _m.context} });
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

.lounge-cell,
.floor-cell {
  padding: 15px 0px;
  width: 36px;
  height: 1px;
}

.title-scroll-container {
    width: 36px;
    height: 100%;
    padding-bottom: 50px;
    padding-top: 15px;
}

.sticky-lounge {
    position: sticky;
    top: 38vh;
}

.sticky-floor {
    position: sticky;
    top: 38vh;
}

.vertical-title {
    transform: rotate(-90deg);
    white-space:nowrap;
}

.floor-check {
    margin-left: 4px;
    margin-top: 15px;
}

table {
  width: 100%;
}

.check-cell {
  width: 40px;
}

.subs-container {
    height: calc(100vh - 180px);
    overflow: auto;
}

.s {
    height: 100px;
}
</style>