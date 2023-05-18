<template>
    <v-layout>
        <TopBarApp active="tasks"></TopBarApp>
        <v-main>
            <div class="text-center d-flex flex-column h-100" v-if="!tasks.length">
                <v-sheet class="mt-4">
                    <v-img :src="require('@/assets/imgs/no-tasks.png')"></v-img>
                </v-sheet>
                <v-sheet>
                    <p class="text-h5">{{ $t('add-task') }}</p>
                    {{ $t('add-task-description') }}
                </v-sheet>
                <v-sheet class="text-right mt-auto">
                    <v-btn icon="pet:plus" class="mb-2" size="large" color="primary" rounded="pill"></v-btn>
                </v-sheet>
            </div>
        </v-main>
        <BottomBarApp></BottomBarApp>
    </v-layout>
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
            tasks: []
        }
    },
    methods: {
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