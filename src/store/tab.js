import Cookie from 'js-cookie';
export default {
    state: {
        isCollapsed: false,
        tabsList: [
            {
                path: '/home',
                name: 'home',
                label: '首頁',
                icon: 'HomeFilled'
            }
        ],
        currentMenu: null,
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapsed = !state.isCollapsed;
        },
        selectMenu(state, val) {
            state.currentMenu = val;
            const result = state.tabsList.findIndex(item => item.name === val.name);
            if (result === -1) {
                state.tabsList.push(val);
            } else {
                state.currentMenu = null
            }
        },
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name );
            state.tabsList.splice(result, 1);
        },
        setMenu(state, menu) {
            state.menu = menu;
            Cookie.set('menu', JSON.stringify(menu));
        },
        clearMenu(state) {
            state.menu = [];
            Cookie.remove('menu');
        },
        addMenu(state, router) {
            if(!Cookie.get('menu')) {
                return;
            }
            const menu = JSON.parse(Cookie.get('menu'));
            state.menu = menu;
            const menuArray = [];
            menu.forEach(item => {
                if(item.children) {
                    item.children = item.children.map(child => {
                        return {
                            ...child,
                            path: child.path.startsWith('/')?child.path : `/${child.path}`,
                            component: () => import(`@/views/${child.url}`)
                        };
                    });
                    menuArray.push(...item.children);
                } else {
                    menuArray.push({
                        ...item,
                        path: item.path.startsWith('/')?item.path : `/${item.path}`,
                        component: () => import(`@/views/${item.url}`)
                        
                    });
                }
            });
            //路由的動態添加
            menuArray.forEach(item => {
                router.addRoute('Main', {
                    path: item.path,
                    name: item.name,
                    component: item.component
                });
            });
        }
    }
}