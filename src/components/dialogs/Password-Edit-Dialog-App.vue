<template>
    <StepedDialogApp :steps="steps" ref="dialog">
        <!-- Step1 -->
        <template v-slot:step-1-title>Ваш пароль</template>
        <template v-slot:step-1-content>
            <v-row>
                <p class="mb-2">Чтобы продолжить введите Ваш актуальный пароль</p>
            </v-row>
            <v-row>
                <v-text-field label="Пароль" v-model="oldPassword"></v-text-field>
            </v-row>
        </template>
        <template v-slot:step-1-btn-text>Продолжить</template>
        <!-- Step1 end -->

        <!-- Step2 -->
        <template v-slot:step-2-title>Ваш пароль</template>
        <template v-slot:step-2-content>
            <v-row>
                <p class="mb-2">Введите новый пароль</p>
            </v-row>
            <v-row>
                <v-text-field label="Пароль" v-model="password1"></v-text-field>
            </v-row>
            <v-row>
                <v-text-field label="Пароль еще раз" v-model="password2"></v-text-field>
            </v-row>
        </template>
        <template v-slot:step-2-btn-text>Продолжить</template>
        <!-- Step2 end -->

        <!-- Step3 -->
        <template v-slot:step-3-content>
            <v-row>
                <h2 class="text-center mb-2">Ваш пароль изменен</h2>
            </v-row>
        </template>
        <template v-slot:step-3-btn-text>Продолжить</template>
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