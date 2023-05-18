import axios from 'axios';

let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};
let config = {
    baseURL: 'http://188.143.130.20:9090/api/v1',
    headers,
};
let apiClient = axios.create(config);


export default {
    registerUser(user) {
        return apiClient.post('/auth/register', user);
    },
    async loginUser(user) {
        let response = await apiClient.post('/auth', user);

        try{
            let token = response.data.token;

            config.headers['Authorization'] = `Bearer ${token}`;
            apiClient = axios.create(config);
        }catch(e){
            console.log('test');
        }

        return new Promise((res)=> res(response));
    },
    async getUser(){
        let user = {};
        let response = await apiClient.get('/users');

        if(response.status !== 200){
            this.$store.commit('showSnackbar', { text: response.data.message, color: 'error' });
            return user;
        }else{
            return response.data;
        }
    }
    // другие методы для работы с API
};