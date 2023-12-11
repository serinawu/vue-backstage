import Mock from 'mockjs';
import homeApi from './mockServeData/home.js';

// Mock.mock('/home/getData', homeApi.getStatisticalData);
if (process.env.NODE_ENV === 'development') {
    Mock.mock('/home/getData', homeApi.getStatisticalData);
  }