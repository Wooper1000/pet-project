<template>
    <StepedDialogApp :steps="steps" ref="dialog">
        <!-- Step1 -->
        <template v-slot:step-1-title>{{ $t('your-password') }}</template>
        <template v-slot:step-1-content>
            <v-row>
                <p class="mb-2">{{ $t('enter-your-password') }}</p>
            </v-row>
            <v-row>
                <v-text-field :label="$t('password')" v-model="oldPassword"></v-text-field>
            </v-row>
        </template>
        <template v-slot:step-1-btn-text>{{ $t('continue') }}</template>
        <!-- Step1 end -->

        <!-- Step2 -->
        <template v-slot:step-2-title>{{ $t('your-password') }}</template>
        <template v-slot:step-2-content>
            <v-row>
                <p class="mb-2">{{ $t('enter-new-password') }}</p>
            </v-row>
            <v-row>
                <v-text-field :label="$t('password')" v-model="password1"></v-text-field>
            </v-row>
            <v-row>
                <v-text-field :label="$t('password-again')" v-model="password2"></v-text-field>
            </v-row>
        </template>
        <template v-slot:step-2-btn-text>{{ $t('continue') }}</template>
        <!-- Step2 end -->

        <!-- Step3 -->
        <template v-slot:step-3-content>
            <v-row>
                <h2 class="text-center mb-2">{{ $t('your-password-changed') }}</h2>
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
        oldPassword: '',
        password1: '',
        password2: ''
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