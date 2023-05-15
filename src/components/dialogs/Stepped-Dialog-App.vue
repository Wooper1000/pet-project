<template>
    <v-dialog
      v-model="open"
    >
    <v-card class="rounded-xl" v-for="step in steps" :key="step" v-show="step == currentStep">
        <v-card-title class="text-center">
            <b> <slot :name="'step-'+step+'-title'"></slot> </b>
        </v-card-title>
        <v-card-text>
            <v-container>
                <slot :name="'step-'+step+'-content'"></slot>
                <v-row>
                    <v-btn color="primary" block size="x-large"
                        @click="nextStep()">
                        <slot :name="'step-'+step+'-btn-text'"></slot>
                    </v-btn>
                </v-row>
            </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        currentStep: 1,
        open: false,
    }),
    props: {
        steps: {
            type: Number,
            defualt: 1
        }
    },
    methods: {
        openDialog(){
            this.open = true;
        },
        nextStep(){
            if(++this.currentStep > this.steps){
                this.open = false;
                setTimeout(() => {
                    this.currentStep = 1;
                }, 500);
            }
        }
    }
}
</script>

<style scoped>
.v-card-text {
    padding-top: 0px !important;
}
</style>