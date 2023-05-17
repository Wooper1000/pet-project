<template>

        <v-container class="container">
            <TopBarApp></TopBarApp>
            <v-divider class="over-driver mb-5"></v-divider>
            <v-list>
                <v-list-item class="avatar-item bg-gray-light mb-4" :title="user.fullname" :subtitle="user.email"
                    @click="$router.push('/profile/information')">
                    <template v-slot:prepend>
                        <v-avatar
                            image="https://sun9-36.userapi.com/impg/9EGAXV98mSehy5617zZTg5Xw176v7I0Yd4xpXw/Hhtf-62aVL8.jpg?size=2560x1701&quality=95&sign=e9084093657bd7ec3c472da12da7ca23&type=album"
                            size="60">
                        </v-avatar>
                    </template>
                    <template v-slot:append>
                        <v-btn variant="text" icon="pet:chevron-right" color="grey-lighten-1"></v-btn>
                    </template>
                </v-list-item>
                <v-list-item :title="$t('language')" @click="$router.push('/settings/language')">
                    <template v-slot:prepend>
                        <v-icon icon="pet:globe" class="settings-icon" color="blue"></v-icon>
                    </template>

                    <template v-slot:append>
                        <v-btn color="grey-lighten-1" icon="pet:chevron-right" variant="text"></v-btn>
                    </template>
                </v-list-item>
                <v-list-item :title="$t('geo')" @click="$router.push('/settings/geo')">
                    <template v-slot:prepend>
                        <v-icon icon="pet:compass" class="settings-icon" color="blue"></v-icon>
                    </template>

                    <template v-slot:append>
                        <v-btn color="grey-lighten-1" icon="pet:chevron-right" variant="text"></v-btn>
                    </template>
                </v-list-item>
                <v-list-item :title="$t('about-app')" @click="$router.push('/settings/info')">
                    <template v-slot:prepend>
                        <v-icon icon="pet:alert-circle" class="settings-icon" color="blue"> </v-icon>
                    </template>

                    <template v-slot:append>
                        <v-btn color="grey-lighten-1" icon="pet:chevron-right" variant="text"></v-btn>
                    </template>
                </v-list-item>
                <v-list-item title="Выйти">
                    <template v-slot:prepend>
                        <v-icon icon="pet:log-out" class="settings-icon" color="blue"></v-icon>
                    </template>

                    <template v-slot:append>
                        <v-btn color="grey-lighten-1" icon="pet:chevron-right" variant="text"></v-btn>
                    </template>
                </v-list-item>
            </v-list>
        </v-container>
</template>

<script>
import api from '../api';
import TopBarApp from '@/components/Top-Bar-App.vue';

export default {
    data() {
        return {
            user: {
                birthday: "",
                email: "",
                fullname: "",
                gender: "",
                phone: "",
                userId: 0
            },
        };
    },
    created() {
        this.updateUser();    
    },
    methods: {
        async updateUser(){
            let userData = await this.getUser();

            for(let field in userData){
                this.user[field] = userData[field];
            }
        },
        async getUser(){
            let user = await api.getUser();

            return user;
        }
    },
    components: {
        TopBarApp
    }
};
</script>

<style scoped>
.v-container {
    padding: 16px 8px;
}

.v-list-item {
    padding: 0px !important;
}

.v-list-item.avatar-item {
    padding: 12px !important;
    border-radius: 12px;
    border: 1px;
}

.settings-icon {
    margin-right: 14px !important;
    --v-medium-emphasis-opacity: 1;
}

.top-nav {
    top: 0px;
    width: 100%;
    height: 56px;
    color: gray;
}

.v-bottom-navigation i {
    font-size: 25px;
}

.over-driver {
    width: 150%;
    margin-left: -20%;
    border-top-width: 0.5px;
    border-top-color: rgba(60,60,67,0.36);
    --v-border-opacity: 1;
}</style>