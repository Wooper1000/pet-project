<template>
    <v-layout>
        <TopBarApp active="tasks"></TopBarApp>
        <v-main>
            <v-container class="app-container">
                <v-row class="top-row">
                    <v-col cols="2">
                        <v-icon icon="pet:chevron-left" @click="$router.go(-1)" />
                    </v-col>
                    <v-col cols="10">
                        <p class="h3">{{ fullTask.title }}</p>
                    </v-col>
                </v-row>
                <v-row v-for="_lounge in fullTask.lounges" :key="_lounge.number">
                    <v-col cols="2" class="title-col bg-blue-aqua">
                        <p class="lounge-title">{{ _lounge.number }} {{ $t('lounge-title') }}</p>
                    </v-col>
                    <v-col cols="10">
                        <v-container class="sub-cotainer">
                            <v-row v-for="_floor in _lounge.floors" :key="_floor.number" v-once>
                                <v-col cols="10" class="pa-0 mb-2">
                                    <v-list>
                                        <tamplate v-for="_subtask in _floor.subtasks" :key="_subtask.number">
                                        <v-list-item class="pa-0">
                                            <v-list-item-title> {{ $t('subtask-title') }} {{ _subtask.number
                                            }}</v-list-item-title>
                                            <template #prepend>
                                                <v-list-item-action start @change="changeSubTaskSelection(_subtask)">
                                                    <v-checkbox-btn v-model="_subtask.selected"></v-checkbox-btn>
                                                </v-list-item-action>
                                            </template>
                                            <template #append>
                                                <v-list-item-action end @change="changeSubTaskSelection(_subtask)">
                                                    <v-checkbox-btn v-model="_subtask.selected"></v-checkbox-btn>
                                                </v-list-item-action>
                                            </template>
                                            
                                        </v-list-item>
                                        <v-divider :thickness="2"></v-divider>
                                    </tamplate>
                                    </v-list>
                                </v-col>
                                <v-col cols="2" class="title-col bg-blue-sky mb-2">
                                    <p class="floor-title">{{ _floor.number }} {{ $t('floor-title') }}</p>
                                </v-col>
                            </v-row>
                        </v-container>
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
                        <!-- <v-list-item>
                            <v-list-item-title @click="tryGenerateFloors()">
                                {{ $t('generate-floors') }}
                            </v-list-item-title>
                        </v-list-item> -->
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
                                {{ $t('jshow-on-map') }}
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
        async changeSubTaskSelection(subtask){
            let subExist = this.selectedSubTasks.find(_sT => _sT.subtaskId == subtask.subtaskId);

            if(subtask.selected && !subExist){
                this.selectedSubTasks.push(subtask);
            }else{
                this.selectedSubTasks.splice(this.selectedSubTasks.indexOf(subExist));
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
            if(structResp.status == "ok" && structResp.lounges.length){
                this.generate.messages[0].success = true;
                this.generate.messages[0].info = `Информация получена: для задач ${start} - ${end} надено ${structResp.lounges.length} подъездов`;
            }else{
                this.generate.messages[0].fail = true;
                this.generate.messages[0].info = `К сожалению неудалось найти информация по думаю, нажмите в любое место вне окна что бы выйти.`;
                return;
            }

            structResp.lounges.forEach(_l => {
                let joinParams = {taskid: this.fullTask.taskId}
                let msg = {text: '', inProgress: true};
                let done = 0;
                let floors = _l.floors.length;

                msg.text = `Группируем этажи по подъезду ${_l.number} [${++done}/${floors}]`;
                joinParams.loungeNumber  = _l.number;
                _l.floors.forEach(_f => {
                    joinParams.floorNumber = _f.number;
                    joinParams.subtaskNumFrom = _f.apparts[0];
                    joinParams.subtaskNumTo  = _f.apparts[_f.apparts.length-1];

                    api.replaceSubTasks(joinParams).then(() => {
                        if(++done < floors){
                            msg.text = `Группируем этажи по подъезду ${_l.number} [${++done}/${_l.floors.length}]`;
                        }else{
                            msg.success = true;
                        }
                    });
                });

                this.generate.messages.push(msg);
            });

            console.log(structResp);
        },
        onMenuClicked(item){
            if(item == 'select'){
                this.showSelectMenu = true;
            }
        },
        async joinFloorsLounges({floor, lounge}){
            let subTasks = this.selectedSubTasks;
            let from = 0;
            let to = 0;
            let joinParams = {taskId : this.fullTask.taskId, loungeNumber: lounge, floorNumber: floor};
            let request = [];

            subTasks.sort((a,b) => a.number - b.number).forEach((_subTask,_idx,_arr) => {
                if(_idx == 0){
                    from = _subTask.number;
                }else if(_subTask.number == _arr[_idx-1].number - 1){
                    to = _subTask.number;
                }else if(from != to && _arr.length != _idx + 1){
                    joinParams.subtaskNumFrom = from;
                    joinParams.subtaskNumTo  = to;
                    request.push( api.replaceSubTasks(joinParams) );
                    from = _subTask.number;
                    to = _subTask.number;
                }
            });

            await Promise.all(request);
            this.loadTaskInfo();
        },  
        async loadTaskInfo() {
            this.fullTask = await api.getFullTask(this.$route.params.id);
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
    top: -16px;
    z-index: 99;
    background: white;
}

.app-container {
    height: calc(100vh - 128px);
    overflow: auto;
}

.sub-cotainer {
    padding: 0px;
}

.lounge-title,
.floor-title {
    writing-mode: tb-rl;
    transform: rotate(-180deg);
    position: sticky;
    top: 40%;
}
</style>