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
                            <v-row v-for="_floor in _lounge.floors" :key="_floor.number">
                                <v-col cols="10" class="pa-0">
                                    <v-list>
                                        <tamplate v-for="_subtask in _floor.subtasks" :key="_subtask.number">
                                        <v-list-item class="pa-0">
                                            <v-list-item-title> {{ $t('subtask-title') }} {{ _subtask.number
                                            }}</v-list-item-title>
                                            <template #prepend>
                                                <v-list-item-action start>
                                                    <v-checkbox-btn v-model="_subtask.selected"></v-checkbox-btn>
                                                </v-list-item-action>
                                            </template>
                                            <template #append>
                                                <v-list-item-action end>
                                                    <v-checkbox-btn v-model="_subtask.selected"></v-checkbox-btn>
                                                </v-list-item-action>
                                            </template>
                                            
                                        </v-list-item>
                                        <v-divider :thickness="2"></v-divider>
                                    </tamplate>
                                    </v-list>
                                </v-col>
                                <v-col cols="2" class="title-col bg-blue-sky">
                                    <p class="floor-title">{{ _floor.number }} {{ $t('floor-title') }}</p>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <BottomBarApp @item-clicked="onMenuClicked"></BottomBarApp>
        <v-sheet class="select-menu" border rounded-xl :height="250" :class="{'show': showSelectMenu}">
            <v-container>
                <v-row>
                    <v-col col="2"></v-col>
                    <v-col col="8">
                        <p class="text-h5 text-center"> {{ $t('select') }} </p>
                    </v-col>
                    <v-col cols="2">
                        <v-icon @click="showSelectMenu=false" icon="pet:x" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title @click="showJoinDialog = true">
                                    {{ $t('join-floors-lounge') }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </v-layout>
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
                    <v-text-field
                            :label="$t('lounge-title')"
                            v-model="join.lounge"
                            type="number"
                    ></v-text-field>
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
            showSelectMenu: false,
            showJoinDialog: false,
            join: {
                floor: null,
                lounge: null
            }
        }
    },
    methods: {
        onMenuClicked(item){
            if(item == 'select'){
                this.showSelectMenu = true;
            }
        },
        async joinFloorsLounges({floor, lounge}){
            let selected = [];

            this.fullTask.lounges.forEach(_lounge => {
                _lounge.floors.forEach(_floor => {
                    _floor.subtasks.forEach(_subtask => {
                        if(_subtask.selected){
                            selected.push(_subtask);
                        }
                    })
                });
            });

            await api.joinFloorsLounges({selected,floor,lounge});
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

.select-menu {
    position: absolute;
    bottom: -250px;
    width: 100%;
    border: 1px solid gray;
    border-radius: 16px;
    z-index: 999;
}

.select-menu.show {
    bottom: 0px;
}
</style>