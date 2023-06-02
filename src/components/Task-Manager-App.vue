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
                    <v-btn icon="pet:plus" class="mb-2" size="large" color="primary" rounded="pill" @click="addTaskDialogShow = true"></v-btn>
                </v-sheet>
            </div>

            <div v-if="tasks.length">
                <span class="text-h5 text-primary font-weight-bold ml-4"> {{ $t('tasks-list') }} </span>
                <div v-for="_task in tasks" :key="_task.title">
                    <v-card 
                            class="rounded-xl mb-2 mt-2"
                            v-on:pointerdown="onTaskPointerDown"
                            v-on:pointerup="onTaskPointerUp(_task)"
                        >
                        <v-card-text>
                            <v-container class="pa-0">
                                    <v-row>
                                        <v-col cols="1" class="py-0">
                                            <v-checkbox-btn v-model="_task.selected" @click.stop></v-checkbox-btn>
                                        </v-col>
                                        <v-col cols="6" class="py-0">
                                            <v-banner class="py-0" lines="two" :text="_task.title" :stacked="false" border="0"></v-banner>
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
                    <v-sheet class="bg-gray-light task-info" v-if="_task.info" rounded="xl">
                        <table class="task-info-table">
                            <tr>
                                <td><v-icon icon="pet:flag-01" color="red"/></td>
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
</template>

<script>
import TopBarApp from '@/components/Top-Bar-App.vue';
import BottomBarApp from '@/components/Bottom-Bar-App.vue';
import api from '@/api';

export default {
    created(){
        this.laodTasks();
    },
    data() {
        return {
            addTaskDialogShow: false,
            tasks: [],
            holdTimer: null,
            holdPause: 1500,
            holded: 0,
            newTask: {
                title: '',
                from: '',
                to: ''
            }
        }
    },
    methods: {
        onTaskPointerDown(){
            this.holdTimer = setInterval(()=>{ this.holded += 100 },100);
        },
        async onTaskPointerUp(task){
            let id = task.taskId;

            clearInterval(this.holdTimer);
            if(this.holded >= this.holdPause){
                let taskData = await api.getTaskInfo(id);

                task.info = taskData;
            }else{
                this.$router.push('/task-manager/tasks/' + id);
            }
            this.holded = 0;
        },
        onMenuClicked(item){
            if(item == 'create'){
                this.addTaskDialogShow = true;
            }
        },
        async addTask(task){
            await api.addTask(task);
            this.addTaskDialogShow = false;
            this.laodTasks();
        },
        async laodTasks(){
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