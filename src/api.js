import axios from 'axios';
import router from '@/router';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

const host = process.env.VUE_APP_HOST || 'api.electronos.ru';
const baseURL = `//${host}/api/v1`;

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
    logout(){
        localStorage.removeItem('token');
        apiClient.defaults.headers.common['Authorization'] = null
    },

    registerUser(user) {
        return apiClient.post('/auth/register', user);
    },
    async loginUser(user) {
        localStorage.removeItem('token')
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
    async deleteTask(id){
        try {
            const response = await apiClient.delete(`/tasks/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
            return {};
        }
    },
    async getSubtask(id){
        try {
            const response = await apiClient.get(`/tasks/subtasks/`+id,);
            return response.data;
        } catch (error) {
            return {};
        }
    },
    async saveSubtask(id,subtask){
        console.log(subtask)
        try {
            const response = await apiClient.patch(`/tasks/subtasks/`+id,subtask);
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
        const gisHost = process.env.VUE_APP_GISURL || '//gis.electronos.ru/getAddrInfo';
        const params = `?addr=${addr}&start=${start}&end=${end}`;
        
        try {
            const response = await axios.get(gisHost + params);
            return response.data;
        } catch (error) {
            return {};
        }
    },
    async replaceSubTasks(taskId,params) {
        try {
            const response = await apiClient.patch(`/tasks/${taskId}/subtasks/replace`, params);
            return response.data;
        } catch (error) {
            return {};
        }
    },
    async getUserMarks() {
        try {
            const response = await apiClient.get(`/marks`);
            return response.data;
        } catch (error) {
            return {};
        }
    },
    async createNewMark(context) {
        try {
            const response = await apiClient.post(`/marks`, {context});
            return response.data;
        } catch (error) {
            return {};
        }
    },
};