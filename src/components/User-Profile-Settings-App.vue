<template>
    <v-app class="px-2">
        <v-container class="container settings-page">
            <v-bottom-navigation grow :elevation="0">
                <v-btn value="recent">
                    <v-icon>mdi-cog-outline</v-icon>
                    Настройки
                </v-btn>

                <v-btn value="favorites">
                    <v-icon>mdi-view-agenda-outline</v-icon>
                    Задачи
                </v-btn>

                <v-btn value="nearby" @click="$router.push('/profile/information')">
                    <v-icon>mdi-account-outline</v-icon>
                    Профиль
                </v-btn>
            </v-bottom-navigation>
            <v-divider class="over-driver"></v-divider>
            <v-list>
                <v-list-item class="avatar-item" title="Иннокентий Пупырчатый" subtitle="ivanov@mail.ru" variant="tonal">
                    <template v-slot:prepend>
                        <v-avatar
                            image="https://sun9-36.userapi.com/impg/9EGAXV98mSehy5617zZTg5Xw176v7I0Yd4xpXw/Hhtf-62aVL8.jpg?size=2560x1701&quality=95&sign=e9084093657bd7ec3c472da12da7ca23&type=album"
                            size="60">
                        </v-avatar>
                    </template>
                    <template v-slot:append>
                        <v-btn variant="text" icon="mdi-chevron-right" color="grey-lighten-1"></v-btn>
                    </template>
                </v-list-item>
                <v-list-item :title="$t('language')" @click="$router.push('/settings/language')">
                    <template v-slot:prepend>
                        <v-icon color="primary" class="settings-icon">mdi-web</v-icon>
                    </template>

                    <template v-slot:append>
                        <v-btn color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
                    </template>
                </v-list-item>
                <v-list-item :title="$t('geo')" @click="$router.push('/settings/geo')">
                    <template v-slot:prepend>
                        <v-icon color="primary">mdi-compass-outline</v-icon>
                    </template>

                    <template v-slot:append>
                        <v-btn color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
                    </template>
                </v-list-item>
                <v-list-item :title="$t('about-app')" @click="$router.push('/settings/info')">
                    <template v-slot:prepend>
                        <v-icon color="primary">mdi-information-outline</v-icon>
                    </template>

                    <template v-slot:append>
                        <v-btn color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
                    </template>
                </v-list-item>
                <v-list-item title="Выйти">
                    <template v-slot:prepend>
                        <v-icon color="primary">mdi-logout</v-icon>
                    </template>

                    <template v-slot:append>
                        <v-btn color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
                    </template>
                </v-list-item>
            </v-list>
        </v-container>
    </v-app>
</template>

<script>

export default {
    data() {
        return {
            test: '',
        };
    },
    mounted() {
    },
    methods: {
    }
};
</script>

<style scoped>
.v-list-item.avatar-item {
    padding: 12px;
    border-radius: 12px;
    border: 1px;
}

.settings-icon {
    width: 25px;
}

.v-bottom-navigation {
    top: 0px;
    color: gray;
}

.v-bottom-navigation i {
    font-size: 40px;
}

.settings-page {
    margin-top: 56px;
}

.over-driver {
    width: 150%;
    margin-left: -20%;
}
</style>