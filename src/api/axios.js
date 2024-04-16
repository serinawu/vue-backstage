import axios from 'axios';
import config from '@/config/index.js';

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;

class HttpRequest {
    constructor() {
        this.instance = axios.create({
            baseURL: baseUrl,
            headers: {}
        });
        console.log('Axios instance:', this.instance);
        this.interceptors();
    }

    interceptors () {
        //添加請求攔截器
        this.instance.interceptors.request.use(
            function(config) {
                console.log('Request intercept:', config);
            //在發送請求前要做什麼
            return config;
        }, function (error) {
                console.error('Request Error intercept:', error);
            //對請求錯誤做些什麼
            return Promise.reject(error);
        });

        //添加響應攔截器
        this.instance.interceptors.response.use(
            function(response) {
            console.log('Response Interceptor:', 'response');
            //對響應數據做點什麼
            return response;
        }, function (error) {
            console.log('Response Error Interceptor:', 'error');
            //對響應錯誤做點什麼
            return Promise.reject(error);
        });
    }
    request(options) {
        return this.instance(options);
    }
}

export default new HttpRequest();