/**
 * Created by chenchen on 2018/12/2.
 */

import axios from 'axios';



// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    response => {
        return Promise.resolve(response.data);
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

let proxy = {};

proxy.get = async (url,data={},config={}) =>{
    let baseConfig = {};
    let result = await axios.get(url,baseConfig);
    return result;
};

proxy.post = async (url,data={},config={})=>{
    let baseConfig = {};
    let result = await axios.post(url,data,baseConfig);
    return result;
};

export default proxy;