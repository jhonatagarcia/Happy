import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.2:3333',
            //192.168.0.2:19000
});

export default api;