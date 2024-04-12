import Mock from 'mockjs';
import homeApi from './mockServeData/home.js';
import userApi from './mockServeData/user.js';

// 檢查環境變量 只有在開發環境使用模擬數據
if (process.env.NODE_ENV === 'development') {
    //模擬 GET 請求
    Mock.mock('/api/home/getData', homeApi.getStatisticalData);
    Mock.mock(/user\/getUser/, 'get', userApi.getUserList);

    // 模擬POST 請求
    Mock.mock(/user\/del/, 'post', userApi.deleteUser);
    Mock.mock(/user\/add/, 'post', userApi.createUser);
    Mock.mock(/user\/edit/, 'post', userApi.updateUser);
    Mock.mock(/permission\/getMenu/, 'post');
  }