<template>
    <v-layout>
        <TopBarApp active="tasks"></TopBarApp>
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

            <div v-if="tasks.length" class="pa-4">
                <span class="text-h4"> {{ $t('today') }} </span>
                <v-list lines="two">
                    <v-list-item
                        v-for="_task in tasks"
                        :key="_task.title"
                        class="rounded-xl bg-gray-light mb-4"
                        @click.stop="$router.push('/task-manager/tasks/' + _task.taskId)"
                    >
                        <template #title>
                            <v-container>
                                <v-row>
                                    <v-col cols="7" class="text-truncate">
                                        {{ _task.title }}
                                    </v-col>
                                    <v-col cols="5">
                                        {{ _task.subtasksFrom }} - {{ _task.subtasksTo }} {{ $t('kv') }} 
                                        <v-divider></v-divider>
                                        {{ _task.floorsFrom }} - {{ _task.floorsTo }} {{ $t('floor') }} 
                                    </v-col>
                                </v-row>
                            </v-container>
                        </template>
                        <template #prepend >
                            <v-list-item-action start>
                                <v-checkbox-btn v-model="_task.selected" @click.stop></v-checkbox-btn>
                            </v-list-item-action>
                        </template>
                        <template #append >
                            <v-list-item-action end>
                                <v-checkbox-btn v-model="_task.selected" @click.stop></v-checkbox-btn>
                            </v-list-item-action>
                        </template>
                    </v-list-item>
                </v-list>
            </div>
        </v-main>
        <BottomBarApp @item-clicked="onMenuClicked"></BottomBarApp>
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
            newTask: {
                title: '',
                from: '',
                to: ''
            }
        }
    },
    methods: {
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