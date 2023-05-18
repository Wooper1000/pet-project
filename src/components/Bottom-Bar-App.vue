<template>
    <v-app-bar :elevation="1" flat location="bottom">
        <v-divider class="split-divider"></v-divider>
        <v-container class="text-center">
            <v-row class="main-row">
                <v-col cols="4">
                    <v-icon icon="pet:search" :color="(active == 'search') ? 'blue' : ''"></v-icon>
                    <div class="text-body-2" :class="{'text-blue': active == 'search'}">{{ $t('search') }}</div>
                </v-col>
                <v-col cols="4">
                    <v-icon icon="pet:plus" :color="(active == 'create') ? 'blue' : ''"></v-icon>
                    <div class="text-body-2" :class="{'text-blue': active == 'create'}">{{ $t('create') }}</div>
                </v-col>
                <v-col cols="4">
                    <v-icon icon="pet:more-horizontal" :color="(active == 'select') ? 'blue' : ''"></v-icon>
                    <div class="text-body-2" :class="{'text-blue': active == 'select'}">{{ $t('select') }}</div>
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
            default: 'settings'
        }
    }
}
</script>

<style scoped>
    .split-divider {
        position: absolute;
        top: 0;
        width: 100%;
    }
</style>