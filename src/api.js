import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://185.46.9.110:9090/api/v1',
    withCredentials: true,
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