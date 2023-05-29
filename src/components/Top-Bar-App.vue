<template>
    <v-app-bar :elevation="0" flat class="bar" :height="50">
        <v-divider class="split-divider"></v-divider>
        <v-container class="text-center text-gray">
            <v-row>
                <v-col cols="4">
                    <v-icon icon="pet:settings" :color="(active == 'settings') ? 'blue' : ''"></v-icon>
                    <div :class="{'text-blue': active == 'settings'}">{{ $t('settings') }}</div>
                </v-col>
                <v-col cols="4" @click="$router.push('/task-manager')">
                    <v-icon icon="pet:server" :color="(active == 'tasks') ? 'blue' : ''"></v-icon>
                    <div :class="{'text-blue': active == 'tasks'}">{{ $t('tasks') }}</div>
                </v-col>
                <v-col cols="4" @click="$router.push('/profile/settings')" >
                    <v-icon icon="pet:user" :color="(active == 'profile') ? 'blue' : ''"></v-icon>
                    <div :class="{'text-blue': active == 'profile'}">{{ $t('profile') }}</div>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
export default {
    props: {
        active: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
    .split-divider {
        position: absolute;
        bottom: 1px;
        width: 100%;
    }

    .bar {
        height: 50px;
        font-size: 10px;
        line-height: 12px;
        --v-high-emphasis-opacity: 1;
    }

    .bar i {
        font-size: 25px;
    }
</style>