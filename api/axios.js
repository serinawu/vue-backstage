import axios from 'axios';
import config from '../config';

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getInsideConfig () {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }

        return config;
    }

    interceptors (instance) {
        //添加請求攔截器
        axios.interceptors.request.use(function(config) {
            //在發送請求前要做什麼
            return config;
        }, function (error) {
            //對請求錯誤做些什麼
            return Promise.reject(error);
        });

        //添加響應攔截器
        axios.interceptors.response.use(function(response) {
            //對響應數據做點什麼
            return response;
        }, function (error) {
            //對響應錯誤做點什麼
            return Promise.reject(error);
        });
    }
}

export default new HttpRequest(baseUrl)