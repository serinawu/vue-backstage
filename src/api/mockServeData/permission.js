import Mock from "mockjs";
export default {
    getMenu: config => {
        return new Promise((resolve, reject) => {
            const { username, password } = JSON.parse(config.body);
            // 先判斷用戶是否存在
            // 判斷帳號和密碼是否對應
            if (username === 'admin' && password === 'admin'){
                resolve ({
                    data: {
                        menu: [
                            {
                                path: '/home',
                                name: 'home',
                                label: '首頁',
                                icon: 'HomeFilled',
                                url: 'home/index'
                            },
                            {
                                path: '/mall',
                                name: 'mall',
                                label: '商品管理',
                                icon: 'video-play',
                                url: 'mall/index'
                            },
                            {
                                path: '/user',
                                name: 'user',
                                label: '用戶管理',
                                icon: 'user',
                                url: 'user/index'
                            },
                            {
                                path: '/other',
                                label: '其他',
                                icon: 'location',
                                children: [
                                    {
                                        path: '/page1',
                                        name: 'page1',
                                        label: '頁面1',
                                        icon: 'Setting',
                                        url: 'other/pageOne'
                                    },
                                    {
                                        path: '/page2',
                                        name: 'page2',
                                        label: '頁面2',
                                        icon: 'Setting',
                                        url: 'other/pageTwo'
                                    }
                                ]
                            }
                        ],
                        token: Mock.Random.guid(),
                        message: '獲取成功'
                    }
                });
            } else if (username === 'test' && password === "Test123") {
                resolve ({
                    data: {
                        menu: [
                            {
                                path: 'home', //配置動態Router：用戶網址欄輸入的路徑
                                name: 'home', //路由名稱，用於<router-link :to"{name: home}"></router-link>
                                label: '首頁', //menu項顯示的文字
                                icon: 'HomeFilled', //顯示相對element-ul名稱的icon
                                url: 'home/index' // menu項相對應的組件路徑，用於動態導入=>addMenu
                            },
                            {
                                path: 'mall',
                                name: 'mall',
                                label: '商品管理',
                                icon: 'video-play',
                                url: 'mall/index'
                            }
                        ],
                        token: Mock.Random.guid(),
                        message: '獲取成功'
                    }
                });
            } else {
                reject ({message: '用戶或密碼錯誤'});
            }
        });
    }
}