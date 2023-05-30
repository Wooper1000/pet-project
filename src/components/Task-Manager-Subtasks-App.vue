<template>
    <v-layout>
        <TopBarApp></TopBarApp>
        <v-main scrollable>
            <v-skeleton-loader
                v-if="!fullTask"
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
                      <tr v-for="(_subtask,_subIdx) in fullTask.subtasks" :key="_subtask">
                        <td :rowspan="fullTask.subtasks.length" v-if="_subIdx === 0" class="lounge-cell bg-blue-aqua">
                          {{ _subtask.lounge }} {{ $t('lounge-title') }}
                        </td>
                        <td class="check-cell">
                          <v-checkbox-btn></v-checkbox-btn>
                        </td>
                        <td>
                          {{ $t('subtask-title') }} {{ _subtask.number}}
                        </td>
                        <td class="check-cell">
                          <v-checkbox-btn></v-checkbox-btn>
                        </td>
                        <td :rowspan="fullTask.subtasks.length" v-if="_subIdx === 0" class="floor-cell bg-blue-sky">
                          {{ _subtask.floor }} {{ $t('floor-title') }}
                        </td>
                      </tr>
                    </table>
                  </v-col>
                </v-row>
            </v-container>
        </v-main>
        <BottomBarApp @item-clicked="onMenuClicked"></BottomBarApp>
        <v-dialog v-model="showSelectMenu" scrollable width="auto" transition="dialog-bottom-transition">
            <v-card rounded="xl">
                <v-card-title class="text-center">{{ $t('select') }}</v-card-title>
                <v-card-text style="height: 350px;">
                    <v-list>
<!--                         <v-list-item>-->
<!--                            <v-list-item-title @click="tryGenerateFloors()">-->
<!--                                {{ $t('generate-floors') }}-->
<!--                            </v-list-item-title>-->
<!--                        </v-list-item>-->
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-title @click="showJoinDialog = true">
                                {{ $t('join-floors-lounge') }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>
                                {{ $t('add-mark') }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>
                                {{ $t('change-priority') }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>
                                {{ $t('show-on-map') }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>
                                {{ $t('set-signal') }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>
                                {{ $t('paste') }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>
                                {{ $t('copy') }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>
                                {{ $t('edit') }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>
                                {{ $t('setup') }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
            <v-btn variant="outlined" color="primary" class="bg-white mt-2" size="large" @click="showSelectMenu = false;">
                {{ $t('cancel') }}
            </v-btn>
        </v-dialog>
    </v-layout>
    <V-dialog v-model="showFloorGenerateDialog">
        <v-card class="rounded-xl">
            <v-card-title class="text-center">
                <span class="text-h5">{{ $t('generate-title') }}</span>
            </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col>
                        <v-list>
                            <v-list-item v-for="_m in generate.messages" :key="_m">
                                <template v-slot:prepend>
                                    <v-progress-circular
                                    indeterminate
                                    color="primary"
                                    :size="16"
                                    v-if="_m.inProgress"
                                    ></v-progress-circular>
                                    <v-icon icon="mdi-check" color="success" v-if="_m.success"/>
                                    <v-icon icon="mdi-close" color="danger" v-if="_m.fail"/>
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
                        <v-btn color="primary" block size="x-large" @click="joinFloorsLounges(join)">{{ $t('create') }}</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
      </v-card>
    </V-dialog>
</template>

<script>
import TopBarApp from '@/components/Top-Bar-App.vue';
import BottomBarApp from '@/components/Bottom-Bar-App.vue';
import api from '@/api';

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
            showSelectMenu: false,
            showJoinDialog: false,
            showFloorGenerateDialog: false,
            join: {
                floor: null,
                lounge: null
            },
            selectedSubTasks: []
        }
    },
    methods: {
        selectFloor(evt, floor){
            let selected = evt.target.checked;

            floor.subtasks.forEach(_task => {
                let _inSelection = this.selectedSubTasks.find(_sT => _sT.subtaskId == _task.subtaskId);

                if(selected && !_inSelection){
                    this.selectedSubTasks.push(_task);
                    _task.selected = true;
                }

                if(!selected && _inSelection){
                    this.selectedSubTasks.splice(this.selectedSubTasks.indexOf(_inSelection),1);
                    _task.selected = false;
                }
            });
        },
        async changeSubTaskSelection(subtask){
            let subExist = this.selectedSubTasks.find(_sT => _sT.subtaskId == subtask.subtaskId);

            if(subtask.selected && !subExist){
                this.selectedSubTasks.push(subtask);
            }else{
                this.selectedSubTasks.splice(this.selectedSubTasks.indexOf(subExist),1);
            }
        },
        async tryGenerateFloors(){
            let structResp = null;
            let tasks = await api.getUserTasks();
            let targetTask = tasks.find(_t => _t.taskId == this.fullTask.taskId);
            let start = targetTask.subtasksFrom;
            let end = targetTask.subtasksTo;

            this.generate.messages = [];
            this.showFloorGenerateDialog = true;
            this.generate.messages.push({text: 'Ищем информацию по зданию', inProgress: true});
            structResp = await api.getStructureOnAddress(this.fullTask.title, start, end);
            console.log(structResp);
            this.generate.messages[0].inProgress = false;
            if(structResp.status === "ok" && structResp.lounges.length){
                this.generate.messages[0].success = true;
                this.generate.messages[0].info = `Информация получена: для задач ${start} - ${end} надено ${structResp.lounges.length} подъездов`;
            }else{
                this.generate.messages[0].fail = true;
                this.generate.messages[0].info = `К сожалению неудалось найти информация по думаю, нажмите в любое место вне окна что бы выйти.`;
                return;
            }

            for (let _lIdx = 0; _lIdx < structResp.lounges.length; _lIdx++){
                let _l = structResp[_lIdx]
                let joinParams = {taskId: this.fullTask.taskId}
                let msg = {text: '', inProgress: true};
                let floors = _l.floors.length;

                msg.text = `Группируем этажи по подъезду ${_l.number} [1/${floors.length}]`;
                joinParams.loungeNumber  = _l.number;
                for(let _fIdx = 0; _fIdx < _l.floors.length; _fIdx++){
                  let _f = _l.floors[_fIdx];
                  let _arr = _l.floors;
                    joinParams.floorNumber = _f.number;
                    joinParams.subtaskNumFrom = _f.apparts[0];
                    joinParams.subtaskNumTo  = _f.apparts[_f.apparts.length-1];

                    msg.text = `Группируем этажи по подъезду ${_l.number} [${_fIdx+1}/${_l.floors.length}]`;
                    await api.replaceSubTasks(joinParams);
                    if(_fIdx === _arr.length){
                      msg.text = `Группируем этажи по подъезду ${_l.number} [${_fIdx+1}/${_l.floors.length}][Готово]`;
                      msg.inProgress = false;
                      msg.success = true;
                    }
                }

                this.generate.messages.push(msg);
            }

            console.log(structResp);
        },
        onMenuClicked(item){
            if(item == 'select'){
                this.showSelectMenu = true;
            }
        },
        async joinFloorsLounges({floor, lounge}){
            let subTasks = this.selectedSubTasks;
            let from = subTasks[0].number;
            let to = subTasks.slice(-1)[0].number;
            let joinParams = {taskId : this.fullTask.taskId, loungeNumber: lounge, floorNumber: floor};

            joinParams.subtaskNumFrom = from;
            joinParams.subtaskNumTo = to;


            await api.replaceSubTasks(joinParams);
            await this.loadTaskInfo();
        },  
        async loadTaskInfo() {
          let promise = await api.getFullTask(this.$route.params.id);
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
  padding-top: 50%;
}

table {
  width: 100%;
}

.check-cell {
  width: 40px;
}
</style>