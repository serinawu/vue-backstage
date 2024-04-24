import Mock from 'mockjs';
import homeApi from './mockServeData/home.js';
import userApi from './mockServeData/user.js';

// 檢查環境變量
if (process.env.USE_MOCK_API === 'true') {
    //模擬 GET 請求
    Mock.mock('/home/getData', homeApi.getStatisticalData);
    Mock.mock(/user\/getUser/, 'get', userApi.getUserList);

    // 模擬POST 請求
    Mock.mock(/user\/del/, 'post', userApi.deleteUser);
    Mock.mock(/user\/add/, 'post', userApi.createUser);
    Mock.mock(/user\/edit/, 'post', userApi.updateUser);
    Mock.mock(/permission\/getMenu/, 'post');
  }