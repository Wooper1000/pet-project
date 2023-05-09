import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://188.143.130.20:9090/api/v1',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default {
    registerUser(user) {
        return apiClient.post('/auth/register', user);
    },
    loginUser(user) {
        return apiClient.post('/auth', user);
    },
    // другие методы для работы с API
};