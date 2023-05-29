import axios from 'axios';

let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};
let config = {
    baseURL: 'http://188.143.130.20:9090/api/v1',
    headers,
};
let token = localStorage.getItem('token');

if(token){
    config.headers['Authorization'] = `Bearer ${token}`;
}

let apiClient = axios.create(config);

export default {
    registerUser(user) {
        this.resetToken();
        return apiClient.post('/auth/register', user);
    },
    resetToken(){
        delete config.headers['Authorization'];
        apiClient = axios.create(config);
    },
    async loginUser(user) {
        let response = null;

        this.resetToken();
        response = await apiClient.post('/auth', user)

        try{
            let token = response.data.token;

            localStorage.setItem('token',token);
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
    },
    async getUserTasks(){
        let tasks = [];
        let response = await apiClient.get('/tasks/user');

        if(response.status !== 200){
            return tasks;
        }else{
            return response.data;
        }
    },
    async getFullTask(id){
        let task = {};
        let response = await apiClient.get('/tasks/' + id);

        if(response.status !== 200){
            return task;
        }else{
            return response.data;
        }
    },
    async joinFloorsLounges(){

    },
    async addTask(task){
        let result = {};
        let response = await apiClient.post('/tasks', task);

        if(response.status !== 200){
            return result;
        }else{
            return response.data;
        }
    },
    async getStructureOnAddress(addr, start, end){
        let url = "http://188.143.130.20:3000/";
        let params = `?address=${addr}&start=${start}&end=${end}`;
        let resp = await axios.get(url + params);

        return resp.data;
    },
    async replaceSubTasks(params){
        let response = apiClient.patch(`/tasks/${params.taskid}/subtasks/replace`, params, {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    }
    // другие методы для работы с API
};