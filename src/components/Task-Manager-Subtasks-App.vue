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
                                                    <v-checkbox-btn></v-checkbox-btn>
                                                </v-list-item-action>
                                            </template>
                                            <template #append>
                                                <v-list-item-action end>
                                                    <v-checkbox-btn></v-checkbox-btn>
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
        <BottomBarApp></BottomBarApp>
    </v-layout>
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
            fullTask: {}
        }
    },
    methods: {
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