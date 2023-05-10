import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            snackbar: {
                visible: false,
                text: '',
                color: 'success',
            },
            user: {
                email: '',
                firstName: '',
                lastName: '',
                token: '',
            },
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        showSnackbar(state, { text, color }) {
            state.snackbar.text = text;
            state.snackbar.color = color;
            state.snackbar.visible = true;
        },
        hideSnackbar(state) {
            state.snackbar.visible = false;
        },
    },
});

export default store;
