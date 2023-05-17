<template>
    <div class="top-nav text-center mb-1">
        <v-row>
            <v-col cols="4">
                <v-icon icon="pet:settings"></v-icon>
                <div class="text-body-2">{{ $t('settings') }}</div>
            </v-col>
            <v-col cols="4">
                <v-icon icon="pet:server"></v-icon>
                <div class="text-body-2">{{ $t('tasks') }}</div>
            </v-col>
            <v-col cols="4">
                <v-icon icon="pet:user" color="blue"></v-icon>
                <div class="text-body-2 text-blue">{{ $t('profile') }}</div>
            </v-col>
        </v-row>
    </div>
</template>