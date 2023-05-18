<template>
    <StepedDialogApp :steps="steps" ref="dialog">
        <!-- Step1 -->
        <template v-slot:step-1-title>{{ $t('your-email') }}</template>
        <template v-slot:step-1-content>
            <v-row>
                <p class="mb-2">{{ $t('enter-email-for-code') }}</p>
            </v-row>
            <v-row>
                <v-text-field label="Email" v-model="email"></v-text-field>
            </v-row>
        </template>
        <template v-slot:step-1-btn-text>{{ $t('save') }}</template>
        <!-- Step1 end -->

        <!-- Step2 -->
        <template v-slot:step-2-title>{{ $t('your-email') }}</template>
        <template v-slot:step-2-content>
            <v-row>
                <p class="mb-2">{{ $t('enter-code-sended-to') }} {{ email }}</p>
            </v-row>
            <v-row>
                <v-text-field :label="$t('code')" v-model="code"></v-text-field>
            </v-row>
        </template>
        <template v-slot:step-2-btn-text>{{ $t('continue') }}</template>
        <!-- Step2 end -->

        <!-- Step3 -->
        <template v-slot:step-3-content>
            <v-row>
                <h2 class="text-center mb-2">{{ $t('your-email-changed') }}</h2>
            </v-row>
        </template>
        <template v-slot:step-3-btn-text>{{ $t('continue') }}</template>
        <!-- Step3 end -->
    </StepedDialogApp>
</template>

<script>
import StepedDialogApp from './Stepped-Dialog-App'

export default {
    data: () => ({
        steps: 3,
        email: '',
        code: ''
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