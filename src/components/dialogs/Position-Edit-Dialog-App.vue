<template>
    <StepedDialogApp :steps="steps" ref="dialog">
        <!-- Step1 -->
        <template v-slot:step-1-title>{{ $t('your-position') }}</template>
        <template v-slot:step-1-content>
            <v-row>
                <v-text-field :label="$t('position')" v-model="position"></v-text-field>
            </v-row>
        </template>
        <template v-slot:step-1-btn-text>{{ $t('save') }}</template>
        <!-- Step1 end -->

        <!-- Step2 -->
        <template v-slot:step-2-content>
            <v-row>
                <h2 class="text-center mb-2">{{ $t('your-position-changed') }}</h2>
            </v-row>
        </template>
        <template v-slot:step-2-btn-text>{{ $t('continue') }}</template>
        <!-- Step2 end -->
    </StepedDialogApp>
</template>

<script>
import StepedDialogApp from './Stepped-Dialog-App'

export default {
    data: () => ({
        steps: 2,
        position: ''
    }),
    methods: {
        openDialog(){
            this.$refs.dialog.openDialog();
        }
    },
    components: {
        StepedDialogApp
    }
}
</script>