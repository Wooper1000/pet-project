import axios from 'axios';
import router from '@/router';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

const baseURL = 'http://91.122.48.173:9090/api/v1';

const apiClient = axios.create({
    baseURL,
    headers,
});

apiClient.interceptors.request.use(
    (config) => {
            let token = localStorage.getItem('token');
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 403) {
            delete apiClient.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            router.push('/login');
        }
        return Promise.reject(error);
    }
)

export default {
    registerUser(user) {
        return apiClient.post('/auth/register', user);
    },
    async loginUser(user) {
        const response = await apiClient.post('/auth', user)

        try {
            const token = response.data.token;
            localStorage.setItem('token', token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            return {}
        }
        return response;
    },
    async getUser() {
        try {
            const response = await apiClient.get('/users');
            return response.data;
        } catch (error) {
            return {};
        }
    },

    async getUserTasks() {
        try {
            const response = await apiClient.get('/tasks/user');
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async getTaskInfo(id){
        try {
            const response = await apiClient.get(`/tasks/${id}`);
            return response.data;
        } catch (error) {
            return {};
        }
    },

    async getFullTask(id) {
        try {
            const response = await apiClient.get(`/tasks/${id}/subtasks`);
            return response.data;
        } catch (error) {
            return {};
        }
    },

    async addTask(task) {
        try {
            const response = await apiClient.post('/tasks', task);
            return response.data;
        } catch (error) {
            return {};
        }
    },

    async getStructureOnAddress(addr, start, end) {
        const url = 'http://188.143.130.20:3000/';
        const params = `?address=${addr}&start=${start}&end=${end}`;

        try {
            const response = await axios.get(url + params);
            return response.data;
        } catch (error) {
            return {};
        }
    },

    async replaceSubTasks(taskId,params) {
        try {
            console.log(params);
            const response = await apiClient.patch(`/tasks/${taskId}/subtasks/replace`, params);
            return response.data;
        } catch (error) {
            return {};
        }
    }
};