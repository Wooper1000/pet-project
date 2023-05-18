<template>
    <StepedDialogApp :steps="steps" ref="dialog">
        <!-- Step1 -->
        <template v-slot:step-1-title>{{ $t('your-phone') }}</template>
        <template v-slot:step-1-content>
            <v-row>
                <p class="mb-2">{{ $t('enter-your-phone') }}</p>
            </v-row>
            <v-row>
                <v-text-field :label="$t('phone')" v-model="phone"></v-text-field>
            </v-row>
        </template>
        <template v-slot:step-1-btn-text>{{ $t('save') }}</template>
        <!-- Step1 end -->

        <!-- Step2 -->
        <template v-slot:step-2-title>{{ $t('your-phone') }}</template>
        <template v-slot:step-2-content>
            <v-row>
                <p class="mb-2">{{ $t('enter-code-sended-to') }} {{ phone }}</p>
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
                <h2 class="text-center mb-2">{{ $t('your-phone-changed') }}</h2>
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
        phone: '',
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