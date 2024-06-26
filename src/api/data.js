import axios from './axios.js';

export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData',
        method: 'get',
    })
}

export const getUser = (params) => {
    return axios.request({
        url: 'user/getUser',
        method: 'get',
        params
    })
}

//mockAPI
export const getMockUser = (params) => {
    const url = 'https://662883b054afcabd0735ffcc.mockapi.io/api/user/user';
    return axios.request({
        url: url,
        method: 'get',
        params
    });
}